import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/shared/validators/generic-validator-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.scss']
})
export class AddOrEditProductComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  title:string ="Add Product";
  product:Product;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;  // data structutre to store validation error messages
  addOREditProductForm : FormGroup
  constructor(
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private productService : ProductService,
              private router:Router
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
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        //get the product by id from the service
        this.getProduct(id);
      }
    )

   }

   getProduct(id:number):void{
     this.productService.getProductById(id).subscribe({
       next:product=>this.onProductRetrieved(product),
     });
   }

   onProductRetrieved(product: Product): void {
    this.product = product;

    console.log('retrived product function');
    if (!this.product) {
      this.title = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.title = 'Add Product';
      } else {
        this.title = `Edit Product: ${this.product.name}`;
      }
    }

  }
  ngOnInit(): void {
    this.addOREditProductForm = this.fb.group({
      name: ['',[Validators.required , Validators.minLength(3)]],
      price:['',[Validators.required]],
      description:[''],
      categoryName:['']
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
    merge(this.addOREditProductForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.addOREditProductForm
        );
      });
  }

  saveProduct():void{
    if(true === true){
      if(this.product.id === 0){
        this.productService.addProduct(this.product).subscribe({
          next:()=> this.router.navigate(['/products'])
        });
      }else{
        this.productService.updateProduct(this.product).subscribe({
          next:()=>this.router.navigate(['/products'])
        });
      }
    }
  }

}
