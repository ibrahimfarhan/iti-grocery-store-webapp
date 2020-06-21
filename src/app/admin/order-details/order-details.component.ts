import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { Order } from './../../models/order';
import { FormGroup, FormControlName, FormBuilder } from '@angular/forms';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  order:Order;
  id:number;
  title:string ="Order";
  subscription: Subscription;
  orderDetailsForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router) {    
    }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.initForm();
      }
    );
  }

  private initForm(){
    this.orderService.getOrderById(this.id).subscribe({
      next: order => {
        this.order = order;
        this.title = `Order: #${this.id}`;

        //lama 3mlt new formGroup brdo gab nafs error wtf!

        // this.addOREditCategoryForm = new FormGroup({
        //   name:new FormControl(this.category.name)
        // });
        this.orderDetailsForm = this.fb.group({
          userId: [{value:this.order.userId, disabled: true}],
          totalPrice: [{value:this.order.totalPrice, disabled:true}],
          address: [{value:this.order.address,disabled:true}],
          status: [{value:this.order.status,disabled:true}],
        });
      }
    });
  }
  onBack(){
    this.router.navigate(['/admin/orders']);
  }
}
