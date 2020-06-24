import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator, FormControlName } from '@angular/forms';
import { Observable, merge, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.scss']
})
export class AddOrEditProductComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  title = 'Add Product';
  product: Product;
  id: number;
  editMode: boolean = false;
  products: Product[];
  subscription: Subscription;
  categories: Category[];
  categoryNames: string[];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;  // data structutre to store validation error messages
  addOREditProductForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.validationMessages = {
      name: {
        required: 'Product name is required.',
        minlength: 'Product name can not be less than 3 characters.',
      },
      price: {
        required: 'Price is required'
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(c => {
      this.categories = c;
      this.categoryNames = this.categories.map(cat => cat.name);
    });

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
    // merge(this.addOREditProductForm.valueChanges, ...controlBlurs)
    //   .pipe(debounceTime(1000))
    //   .subscribe((value) => {
    //     this.displayMessage = this.genericValidator.processMessages(
    //       this.addOREditProductForm
    //     );
    //   });
  }

  private initForm() {

    if (this.editMode) {
      console.log(`form intialization`);
      this.productService.getProductsSubject().subscribe(ps => {
        this.products = ps;
        this.product = this.products.find(p => p.id === this.id);
      });

      this.title = `Edit Product: ${this.product.name}`;

      this.addOREditProductForm = this.fb.group({
        name: [this.product.name, [Validators.required, Validators.minLength(1)]],
        price: [this.product.price, [Validators.required]],
        description: [this.product.description],
        categoryId: [this.product.categoryId]


      });
    } else {
      // this.addOREditCategoryForm = new FormGroup({
      //   name:new FormControl()
      // });
      this.title = 'Add Product';
      this.addOREditProductForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        price: ['', [Validators.required]],
        description: [''],
        categoryId: ['']
      });
    }
  }
  saveProduct(): void {
    if (this.addOREditProductForm.valid) {
      if (this.addOREditProductForm.dirty) {
        const product = { ...this.product, ...this.addOREditProductForm.value }
        if (!this.editMode) {
          this.productService.addProduct(product).subscribe({
            next: () => {
              this.addOREditProductForm.reset();
              this.router.navigate(['admin/products']);
            }
          });
        } else {
          this.productService.updateProduct(product).subscribe({
            next: () => {
              this.addOREditProductForm.reset();
              this.router.navigate(['admin/products']);
            }
          });
        }
      }
    }
  }

  onCancel() {
    this.router.navigate(['admin/products']);
  }

}
