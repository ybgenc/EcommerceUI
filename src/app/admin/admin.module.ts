import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { DynamicLoadComponentDirective } from '../directives/common/dynamic-load-component.directive';





@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports:[
    LayoutModule,
    ComponentsModule,
    


  ]
})
export class AdminModule { }
