import { Component, OnInit } from '@angular/core';
import {Product_Category} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit{
  productCategories: Product_Category[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(){
    this.listProductCategories();
  }

  listProductCategories(){

    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }
}

