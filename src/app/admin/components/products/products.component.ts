import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Create_Product } from 'src/app/contract/create-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService : HttpClientService) { }

  @ViewChild(ListComponent) listComponents : ListComponent;

  ngOnInit(): void {

    // this.httpClientService.Get({
    //   controller: "Product"
    // }).subscribe(data => console.log(data));
    
      // this.httpClientService.Create({
      //   controller: "Product"
      // },{
      //   name : "Glass",
      //   stock : 10,
      //   price : 39.99
      // }).subscribe();

      //  this.httpClientService.Update({
      //   controller: "Product"
      // }, {
      //   id: "7b2094fb-0ece-49ba-b5a1-41c5037c2930", 
      //   name: "Cologne",
      //   stock: 15,
      //   price: 9.99
      // }).subscribe();

      // this.httpClientService.Delete({
      //   controller: "Product",
      // }, "e47e07b2-0c16-4df4-aba9-15ca9778710e").subscribe();
  } //-->ngOnInit
  createdProduct(createdProduct : Create_Product){
    this.listComponents.getProducts();
  }

}//-->OnInit
