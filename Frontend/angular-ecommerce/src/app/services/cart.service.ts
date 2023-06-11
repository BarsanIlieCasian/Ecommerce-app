import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";
import {Product} from "../common/product";
import {WARN} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";
import {iterator} from "rxjs/internal/symbol/iterator";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theProduct: Product | CartItem){
    let theCartItem = this.cartItems.find((item) => item.id == theProduct.id)

    if(theCartItem != undefined){
      theCartItem.quantity++;
    }
    else{
      this.cartItems.push(new CartItem(theProduct));
    }

    this.computeCartTotal();
  }

  subtractFromCart(theProduct: Product | CartItem){
    let index = this.cartItems.findIndex((item) => item.id == theProduct.id);

    if(index >= 0) {
      if(this.cartItems[index].quantity > 1){
        this.cartItems[index].quantity--;
      }
      else {
        this.cartItems.splice(index,1);
      }
    }

    this.computeCartTotal();
  }

  deleteFromCart(theProduct: Product | CartItem) {
    let index = this.cartItems.findIndex((item) => item.id == theProduct.id);

    if(index >= 0){
      this.cartItems.splice(index, 1);
    }

    this.computeCartTotal();
  }

  computeCartTotal(){
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for(let tempCartItem of this.cartItems){
      totalPrice += tempCartItem.quantity*tempCartItem.unit_price;
      totalQuantity += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    //Debug
    console.log(totalPrice);
  }

}
