import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { ToasterAlertType, ToasterCustomService, ToasterPosition } from './services/ui/toaster-custom.service';
import { Router } from '@angular/router';
import { ComponentName, DynamicComponentLoadingService } from './services/common/dynamic-component-loading.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceUI';
  isNavbarOpen: boolean = false;

  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicComponentDirective: DynamicLoadComponentDirective

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  constructor(public authService: AuthService, 
              private toasterService: ToasterCustomService, 
              private router: Router, 
              private dynamicLoadComponentService: DynamicComponentLoadingService ) {
                
    authService.checkIdentity();
  }

  logOut() {
    localStorage.removeItem("accessToken");
    this.authService.checkIdentity();
    this.router.navigate([""])
    this.toasterService.message("Logged out.", "Session ended", {
      position: ToasterPosition.TopLeft,
      toasterAlertType: ToasterAlertType.Success
    })

  }
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentName.BasketsComponent, this.dynamicComponentDirective.viewContainerRef)
  }
}
