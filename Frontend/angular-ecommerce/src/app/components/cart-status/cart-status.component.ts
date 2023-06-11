import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit{
  totalPrice: number;
  totalQuantity: number;

  constructor(private cartService: CartService) {
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus(){
    this.cartService.totalPrice.subscribe(data =>{this.totalPrice = data});
    this.cartService.totalQuantity.subscribe(data => {this.totalQuantity = data});
  }
}
