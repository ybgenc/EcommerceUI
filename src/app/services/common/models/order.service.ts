import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contract/order/Create_Order';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService : HttpClientService) { }



 async completeOrder(order : Create_Order){
    const createOrder : Observable<Create_Order> = await this.httpClientService.Post({
      controller:'order',
      action:'CreateOrder'
    },order)

    await firstValueFrom(createOrder)
  }
}
