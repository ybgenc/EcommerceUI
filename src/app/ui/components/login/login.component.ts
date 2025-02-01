import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinner } from 'ngx-spinner';
import { firstValueFrom, Observable, observable } from 'rxjs';
import { Login_User } from 'src/app/contract/users/login-user';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { ToasterCustomService } from 'src/app/services/ui/toaster-custom.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup


  constructor(private formBuilder : FormBuilder,
    private httpClientService:HttpClientService,
    private toasterService : ToasterCustomService,
    private userService : UserService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      UsernameOrEmail : ["",Validators.required],
      password :["",Validators.required]
    });
  }
  async submitForm(data :Login_User){
      await this.userService.submitForm(data)
    
  }

}
