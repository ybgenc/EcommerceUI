import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Order_List } from 'src/app/contract/order/Order_List';
import { Order_Detail } from 'src/app/contract/order/OrderDetail';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order_List[] = [];
  orderDetail:Order_Detail[] = [];

  constructor(private orderService: OrderService) {}

  async ngOnInit() {

    const orderList : Order_List[] = await this.orderService.getOrder();
    this.orders = orderList;
    console.log("orderlist",orderList)

    this.orders = this.orders.map<Order_List>(o => {
      const orders : Order_List = {
        
        orderId: o.orderId,
        orderDate: o.orderDate,
        totalPrice: o.totalPrice,
        isOpen: false
      }

      return orders
    });

     this.orders.sort((a, b) => {
      const dateA = new Date(a.orderDate[0]?.orderDate).getTime();
      const dateB = new Date(b.orderDate[0]?.orderDate).getTime();
      return dateA - dateB; 
    });
  }

  toggleOpen(order: any): void {
    order.isOpen = !order.isOpen; 
  }


  async getOrderDetail(id :string){

    const orderDetail : Order_Detail[] = await this.orderService.getOrderDetail(id);
    this.orderDetail = orderDetail
    this.orderDetail = this.orderDetail.map<Order_Detail>(od => {
      const detail : Order_Detail = {
        orderDate: od.orderDate,
        name: od.name,
        price: od.price,
        quantity: od.quantity,
        description: od.description,
        address: od.address
      }
      return detail
    })
  }
}

