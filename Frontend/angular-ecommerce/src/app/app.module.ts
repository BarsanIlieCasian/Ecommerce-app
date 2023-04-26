import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule, HttpResponse} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  //The order matters
  //It compares the source path with each of the following paths in the following order, so, if "**" is first it will always use this route.
  {path:"products/:id", component: ProductDetailsComponent},
  {path: "search/:keyword",component: ProductListComponent},
  {path: "category/:id", component: ProductListComponent},
  {path: "category", component: ProductListComponent},
  {path: "products", component: ProductListComponent},
  {path: "", redirectTo: "/products", pathMatch: "full"},
  {path: "**", redirectTo: "/products", pathMatch: "full"}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
