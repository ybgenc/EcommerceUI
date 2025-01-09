import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contract/create-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }

  Create(product : Create_Product, successCallback? : any){
    this.httpClientService.Create({
      controller : "Product"
    }, product).subscribe(result =>{
      successCallback();
    });
  }
}
