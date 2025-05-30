import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { UpdateDirective } from 'src/app/directives/admin/update.directive';
import { UpdateDialogComponent } from 'src/app/dialogs/update-dialog/update-dialog.component';
import { FormsModule } from '@angular/forms';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { CreateDialogComponent } from 'src/app/dialogs/create-dialog/create-dialog.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective,
  

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: ProductsComponent }
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FileUploadModule,
    FormsModule,
    DialogModule,
    DirectivesModule

],
  exports:[
    DeleteDirective,
  ]
})
export class ProductsModule { }
