import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //checks if the user who loggedin is admin to display edit icon
  isAdmin(): boolean{
    //call auth service 
    return true;
  }

  //navigate to the admin panel to edit product
  goToAdminEditProduct(): void
  {
    this.router.navigate([`/admin/products/${this.product.id}`])
  }

  
  addTocart(): void{
    //call shopping cart service
  }
}
