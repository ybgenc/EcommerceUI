import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Order_List } from 'src/app/contract/order/Order_List';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  orders: Order_List[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
  }

  // async ngOnInit() {
  //   try {
  //     const response = await this.orderService.getOrder();
  //     if (!response || response.length === 0) {
  //       this.orders = [];
  //       return;
  //     }

  //     this.orders = response.map(o => ({
  //       orderId: o.orderId,
  //       products: o.products?.map(p => ({
  //         name: p.name,
  //         price: p.price,
  //         quantity: p.quantity,
  //         description: p.description,
  //         address: p.address,
  //         orderDate: new Date(p.orderDate),
  //       })) ?? [],
  //       isOpen: false 
  //     })) as Order_List[];

  //   } catch (error) {
  //   }
  // }

  // toggleOpen(order: any): void {
  //   order.isOpen = !order.isOpen; 
  // }

  // getTotal(order: Order_List) {
  //   if (!order.products || order.products.length === 0) {
  //     return 0;
  //   }

  //   return order.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  // }
}
