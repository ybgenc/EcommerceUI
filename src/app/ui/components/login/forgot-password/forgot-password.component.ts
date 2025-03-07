import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/common/models/auth-user.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authUserService : AuthUserService) { }

  ngOnInit(): void {
  }
  async sendPasswordResetMail(Email : string){
    await this.authUserService.sendPasswordResetMail(Email);
  }

}
