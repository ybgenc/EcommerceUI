import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-product-image-upload-dialog',
  templateUrl: './product-image-upload-dialog.component.html',
  styleUrls: ['./product-image-upload-dialog.component.scss'],
})
export class ProductImageUploadDialogComponent extends BaseDialog<ProductImageUploadDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<ProductImageUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | ProductImageUploadState 
  ) {
    super(dialogRef);
    console.log('Received ID:', data);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "product",
    isAdminPage: true,
    queryString: `id=${this.data}`, 
  };
  
}

export enum ProductImageUploadState {
  Close,
}
