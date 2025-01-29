import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product } from 'src/app/contract/list-product';
import {
  AlertifyService,
  Position,
  AlertType,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from 'src/app/dialogs/update-dialog/update-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductImageUploadDialogComponent } from 'src/app/dialogs/product-image-upload-dialog/product-image-upload-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'edit',
    'uploadImage',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Product> =
    new MatTableDataSource<List_Product>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService : DialogService,
    private spinner: NgxSpinnerService,
    public datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async getProducts() {
    this.spinner.show();
  
    const ProductList: List_Product[] = await this.productService.Get(
      () => {
        this.spinner.hide();
      },
      (errorMessage) => {
        this.spinner.hide();
        this.alertifyService.message(errorMessage, {
          alertType: AlertType.Error,
          position: Position.TopRight,
          dismissOther: true,
        });
      }
    );
  
    if (ProductList) {
      this.dataSource.data = ProductList; // Doğrudan tabloya bağlama
    }
  }
  

  async ngOnInit() {
    await this.getProducts();
  }

  openUpdateDialog(product: List_Product) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }
  uploadProductImage(id: string) {
    this.dialogService.openDialog({
      componentType: ProductImageUploadDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    });
  }
}
