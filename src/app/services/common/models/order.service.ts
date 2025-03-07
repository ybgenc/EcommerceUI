import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Order_List } from 'src/app/contract/order/Order_List';
import { Create_Order } from 'src/app/contract/order/Create_Order';
import { Order_Detail } from 'src/app/contract/order/OrderDetail';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async getOrder(): Promise<Order_List[]> {
    const response: Observable<Order_List[]> = await this.httpClientService.Get({
      controller: 'order',
      action: 'GetAllOrder'
    });    
  
    return await firstValueFrom(response) 
  }
  

  async completeOrder(order : Create_Order){
    const createOrder : Observable<Create_Order> = this.httpClientService.Post({
      controller:'order',
      action:'CreateOrder'
    },order)

    await firstValueFrom(createOrder)
  }

  async getOrderDetail (OrderId : string){
    const orderDetail : Observable<Order_Detail[]> = await this.httpClientService.Get({
      controller : 'order',
      action:`GetOrderById/${OrderId}`,
   })

   return await firstValueFrom(orderDetail)
  }
}
