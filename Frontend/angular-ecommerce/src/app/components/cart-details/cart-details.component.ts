import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.listCartDetails();
  }

  listCartDetails(){
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data =>{this.totalPrice = data} );
    this.cartService.totalQuantity.subscribe(data => {this.totalQuantity = data} );
  }

  addToCart(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  subtractFromCart(cartItem: CartItem){
    this.cartService.subtractFromCart(cartItem);
  }

  deleteFromCart(cartItem: CartItem){
    this.cartService.deleteFromCart(cartItem);
  }
}
