import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {pipe} from "rxjs";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  currentCategoryId: number = 0;
  previousCategoryId: number =0;

  thePageNumber: number = 1;
  thePageSize: number = 4;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() =>
    {
      this.listProducts()
    })
  }

  listProducts(){
    if(this.route.snapshot.paramMap.has("keyword")){
      this.listProductsBySearch(String( this.route.snapshot.paramMap.get("keyword")));
    }
    else{
      this.listProductsByCategory();
    }
  }

  listProductsByCategory(){
    const hasId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasId)
    {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get("id"));
    }
    else {
      this.currentCategoryId = 0;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductsPaginate(this.thePageNumber-1, this.thePageSize, this.currentCategoryId).subscribe(data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data. page.totalElements;
    })
  }

  listProductsBySearch(keyword: string){
    this.productService.searchProducts(this.thePageNumber-1, this.thePageSize, keyword).subscribe(data => {this.products = data._embedded.products;
                                                                                                                      this.thePageSize = data.page.size;
                                                                                                                      this.thePageNumber = data.page.number+1
                                                                                                                      this.theTotalElements = data.page.totalElements});
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
    console.log( product instanceof Product)
  }
}

