import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product } from 'src/app/contract/product/list-product';
import { UpdateDialogComponent } from 'src/app/dialogs/update-dialog/update-dialog.component';
import { AlertifyService, AlertType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageEvent } from '@angular/material/paginator';
import { CustomerService } from 'src/app/services/common/models/customer.service';
import { Customer_List } from 'src/app/contract/customer/Customer_List';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Order_Detail } from 'src/app/contract/order/OrderDetail';
import { Order_List } from 'src/app/contract/order/Order_List';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class CustomersComponent implements OnInit {
  expandedElement: any | null;
    orders: Order_List[] = [];
    orderDetail:Order_Detail[] = [];
    orderDetailMap: { [orderId: string]: Order_Detail[] } = {};

  
  // Tanımlı kolonlar
  displayedColumns: string[] = [
    'position',
    'name',
    'expandedDetail1',
  ];
  pageSize = 5;
 currentPage = 0;
  dataSource: MatTableDataSource<Customer_List> = new MatTableDataSource<Customer_List>();
    

  constructor(
    private customerService: CustomerService, private orderService: OrderService
  ) { }
  
  get pagedData(): any[] {
    const start = this.currentPage * this.pageSize;
    return this.dataSource.data.slice(start, start + this.pageSize);
  }
  
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
  async getCustomer() {
    const rawCustomerList: any[] = await this.customerService.getCustomer();
  
    const mappedList: Customer_List[] = rawCustomerList.map(item => ({
      Id: item.id || '',
      Name: item.name || '',
      Orders: item.orders?.map((order: any) => ({
        id: order.id || ''
      })) || []
    }));
  
    this.dataSource.data = mappedList;
  }
  
  async getOrderDetail(orderId: string): Promise<void> {
    const orderDetails = await this.orderService.getOrderDetail(orderId);
    this.orderDetailMap[orderId] = orderDetails.map<Order_Detail>(od => ({
      orderDate: od.orderDate,
      name: od.name,
      price: od.price,
      quantity: od.quantity,
      description: od.description,
      address: od.address,
      isSended: od.isSended,
      orderNumber: od.orderNumber,
      totalPrice: od.totalPrice
    }));
  }
  


  async ngOnInit() {
    await this.getCustomer();
  }

  // openUpdateDialog(product: List_Product) {
  //   const dialogRef = this.dialog.open(UpdateDialogComponent, {
  //     width: '400px',
  //     data: product,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.getCustomer();
  //     }
  //   });
  // }

  toggleDescription(element: any) {
    element.isExpanded = !element.isExpanded;
  }


}
