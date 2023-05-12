import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {Product_Category} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductsPaginate(thePage: number,thePageSize: number ,theCategoryId: number): Observable<GetResponseProducts> {
    let searchUrl;
    if (!theCategoryId) {
      searchUrl = this.baseUrl + '?page=' + thePage.toString() + '&size=' + thePageSize.toString();
    } else {
      searchUrl = this.baseUrl + '/search/findByCategoryId?page=' + thePage.toString() + '&size=' + thePageSize.toString() + '&id=' + theCategoryId.toString();
    }
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProducts(theCategoryId: number): Observable<Product[]> {
    let searchUrl;
    if (!theCategoryId) {
      searchUrl = this.baseUrl + '?page=0&size=100';
    } else {
      searchUrl = this.baseUrl + '/search/findByCategoryId?page=0&size=100&id=' + theCategoryId.toString();
    }
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProduct(productId: number){
    let searchUrl = this.baseUrl + '/' + productId.toString();
    this.httpClient.get<Product>(searchUrl).subscribe(data => {console.log(data)});
    return this.httpClient.get<Product>(searchUrl);
  }

  getProductCategories(): Observable<Product_Category[]> {
    let searchUrl = 'http://localhost:8080/api/product-category';
    return this.httpClient.get<GetResponseProductCategories>(searchUrl).pipe(map(response => response._embedded.productCategories))
  }

  searchProducts(thePage: number,thePageSize: number ,keyword: string): Observable<GetResponseProducts>{
    let searchUrl = 'http://localhost:8080/api/products/search/findByNameContaining?name=' + keyword + '&page=' + thePage.toString() + '&size=' + thePageSize.toString();
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

}
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }

  page:{
    size :number;
    totalElements :number;
    totalPages :number;
    number: number;
  }
}

interface GetResponseProductCategories{
  _embedded:{
    productCategories: Product_Category[];
  }
}
