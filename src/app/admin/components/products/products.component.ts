import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Create_Product } from 'src/app/contract/product/create-product';
import { ComponentName, DynamicComponentLoadingService } from 'src/app/services/common/dynamic-component-loading.service';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private httpClientService: HttpClientService , private dynamicLoadComponentService : DynamicComponentLoadingService) {}
  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent;



  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }
  
} 
