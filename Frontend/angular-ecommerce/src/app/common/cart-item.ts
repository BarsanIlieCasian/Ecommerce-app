import {Product} from "./product";

export class CartItem {
  id: number;
  name: string;
  unit_price: number;
  image_url: string;
  quantity: number;

  constructor(product: Product | CartItem) {
    this.id = product.id;
    this.name = product.name;
    this.image_url = product.image_url;
    this.unit_price = product.unit_price;
    this.quantity = 1;
  }
}
