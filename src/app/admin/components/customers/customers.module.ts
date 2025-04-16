import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { UpdateDirective } from 'src/app/directives/admin/update.directive';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  declarations: [
    CustomersComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path : '', component: CustomersComponent}
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    FileUploadModule,
    FormsModule,
    DialogModule,
    DirectivesModule
  ],
  exports: [
    
  ]
})
export class CustomersModule { }
