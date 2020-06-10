import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/products/category.service';
import { Category } from './../../products/category';

@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit-category.component.html',
  styleUrls: ['./add-or-edit-category.component.scss']
})
export class AddOrEditCategoryComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  title:string ="Add Category";
  category:Category
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;  // data structutre to store validation error messages
  addOREditCategoryForm : FormGroup

  constructor(
              private fb: FormBuilder,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private categoryService: CategoryService
              ) {
    this.validationMessages = {
      name: {
        required: 'Product name is required.',
        minlength: 'Product name can not be less than 3 characters.',
      },
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        //get the product by id from the service
        this.getCategory(id);
      }
    )
  }
  getCategory(id:number):void{
    this.categoryService.getCategoryById(id).subscribe({
      next:product=>this.onCategoryRetrieved(product),
    });
  }

  onCategoryRetrieved(category: Category): void {
    this.category = category;

    console.log('retrived category function');
    if (!this.category) {
      this.title = 'No category found';
    } else {
      if (this.category.id === 0) {
        this.title = 'Add Category';
      } else {
        this.title = `Edit Category: ${this.category.name}`;
      }
    }

  }
  ngOnInit(): void {
    this.addOREditCategoryForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]]
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.addOREditCategoryForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.addOREditCategoryForm
        );
      });
  }

  saveCategory():void{
    if(true===true){
      if(this.category.id === 0){
        this.categoryService.addCategory(this.category).subscribe({
          next:()=>this.router.navigate(['/categories'])
        });
      }else{
        this.categoryService.updateCategory(this.category).subscribe({
          next:()=>this.router.navigate(['/categories'])
        })
      }
    }
  }

}
