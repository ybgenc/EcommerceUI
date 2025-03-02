import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Basket_Item_List } from 'src/app/contract/basket/basket-item-list';
import { Create_Order } from 'src/app/contract/order/Create_Order';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit { 
  constructor(private basketService : BasketService , private orderService : OrderService){}
  basketItem : Basket_Item_List[];

  async ngOnInit() {



    const basketItem : Basket_Item_List[] = await this.basketService.getBasketItems()
    this.basketItem = basketItem
    this.basketItem =  this.basketItem.map<Basket_Item_List>(b => {
      const basketItemList  : Basket_Item_List = {
        basketItemId: b.basketItemId,
        name: b.name,
        price: b.price,
        quantity: b.quantity,
        basketId: b.basketId
      }
        return basketItemList
    })


  }
  


  getTotal() {
    if (!this.basketItem || this.basketItem.length === 0) {
      return 0; 
    }
    return this.basketItem.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async  completePayment(Address : string, Description: string) {
    const order : Create_Order = new Create_Order()
    order.Address = Address
    order.Description = Description
    console.log(order)
    await this.orderService.completeOrder(order as Create_Order)
  }

}

