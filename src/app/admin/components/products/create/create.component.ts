import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from 'src/app/dialogs/create-dialog/create-dialog.component';
import { Create_Product } from 'src/app/contract/create-product';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { title } from 'process';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'Product',
    description: 'Drag or Drop files',
    isAdminPage: true,
    accept: '.png, .jpg, .jpeg, .json, .pdf',
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateDialog(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement,title:HTMLInputElement,description:HTMLInputElement) {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '400px',
      data: {
        name: name.value,
        stock: stock.value,
        price: price.value,
        title: title.value,
        description:description.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        console.log('Product created:', result);
      }
    });
  }
  
  // Create(
  //   name: HTMLInputElement,
  //   stock: HTMLInputElement,
  //   price: HTMLInputElement
  // ) {
 
  //   const create_product: Create_Product = new Create_Product();
  //   create_product.name = name.value;
  //   create_product.stock = parseInt(stock.value);
  //   create_product.price = parseFloat(price.value);

    
  //   this.productService.Create(create_product, () => {
  //     this.spinner.hide();
  //     this.alertify.message('Product created successfully', {
  //       alertType: AlertType.Success,
  //       dismissOther: true,
  //       position: Position.TopRight,
  //     });
  //     this.createdProduct.emit(create_product);
  //   },errorMessage => {
  //     this.spinner.hide();
  //     this.alertify.message(errorMessage,{
  //       alertType: AlertType.Error,
  //       dismissOther: true,
  //       position : Position.TopRight
  //     })
  //   });
  // }



  }

