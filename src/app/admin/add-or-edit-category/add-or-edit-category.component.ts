import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit-category.component.html',
  styleUrls: ['./add-or-edit-category.component.scss']
})
export class AddOrEditCategoryComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  title = 'Add Category';
  id:number;
  category: Category;
  editMode: boolean = false;
  subscription: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;  // data structutre to store validation error messages
  addOREditCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    ) {
    this.validationMessages = {
      name: {
        required: 'Product name is required.',
        minlength: 'Product name can not be less than 3 characters.',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
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


  private initForm() {
    if (this.editMode) {
      console.log(`form intialization`);
      this.categoryService.getCategoryById(this.id).subscribe({
        next: category => {
          this.category = category;
          this.title = `Edit Category: ${this.category.name}`;

          //lama 3mlt new formGroup brdo gab nafs error wtf!

          // this.addOREditCategoryForm = new FormGroup({
          //   name:new FormControl(this.category.name)
          // });
          this.addOREditCategoryForm = this.fb.group({
            name: [this.category.name, [Validators.required, Validators.minLength(3)]]
          });
        }
      });
    }else{
      // this.addOREditCategoryForm = new FormGroup({
      //   name:new FormControl()
      // });
      this.title = 'Add Category';
      this.addOREditCategoryForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]]
      });
    }
  }
  saveCategory(): void {
      if (this.addOREditCategoryForm.valid) {
        if (this.addOREditCategoryForm.dirty) {
          const category = {...this.category, ...this.addOREditCategoryForm.value}
          if(!this.editMode){
            this.categoryService.addCategory(category).subscribe({
              next: () => {
                this.addOREditCategoryForm.reset();
                this.router.navigate(['/admin/categories']);
              }
            });
          } else {
          this.categoryService.updateCategory(category).subscribe({
            next: () => {
              this.addOREditCategoryForm.reset();
              this.router.navigate(['/admin/categories']);
            }
          });
        }
      }
    }
  }

  onCancel() {
    this.router.navigate(['/admin/categories']);
  }
}
