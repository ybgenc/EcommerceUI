import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-order-dialog',
  templateUrl: './submit-order-dialog.component.html',
  styleUrls: ['./submit-order-dialog.component.scss']
})
export class SubmitOrderDialogComponent extends BaseDialog<SubmitOrderDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SubmitOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: submitState
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {}

  confirm() {
    this.dialogRef.close(submitState.Yes);
  }

  cancel() {
    this.dialogRef.close(submitState.No);
  }
}
export enum submitState {
  Yes,
  No,
}
