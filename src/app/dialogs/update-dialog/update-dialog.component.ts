import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  columns: string[] = [];  
  rowData: any = {};  

  constructor(
    public dialogRef : MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any 
  ) { 
    this.rowData = { ...data };  
    this.columns = Object.keys(this.rowData);  
  }

  ngOnInit(): void {
    this.columns = Object.keys(this.rowData);  
  }

  close(): void {
    this.dialogRef.close();  
  }

  update(): void {
    this.dialogRef.close(this.rowData);  
  }
}

export enum UpdateState {
  Yes,
  No
}
