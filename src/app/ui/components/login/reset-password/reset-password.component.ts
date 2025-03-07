import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userId : string;
resetToken : string;

  constructor(private activeRoute :  ActivatedRoute, private userService : UserService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '',
      this.resetToken = params.get('resetToken') || '';
    })

  }
  async updatePassword(Password: string, UserId: string = this.userId, ResetToken: string = this.resetToken) {
    console.log('UserId:', UserId);
    console.log('ResetToken:', ResetToken);
  
    await this.userService.updatePassword(Password, UserId, ResetToken);
  }
  

}

