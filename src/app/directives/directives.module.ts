import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDirective } from './admin/update.directive';
import { MatDialog } from '@angular/material/dialog';



@NgModule({
  declarations: [
    UpdateDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    UpdateDirective
  ]
})
export class DirectivesModule { }
