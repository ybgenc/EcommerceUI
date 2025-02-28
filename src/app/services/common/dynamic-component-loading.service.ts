import {  Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoadingService {

  constructor() { }

  async loadComponent(componentName: ComponentName, viewContainerRef: ViewContainerRef) {
  
    let _component: any = null;
  
    switch (componentName) {
      case ComponentName.BasketsComponent:
        const basketModule = await import("../../ui/components/baskets/baskets.component");
        _component = basketModule.BasketsComponent;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
  }
  
}

export enum ComponentName {
  BasketsComponent,
}
