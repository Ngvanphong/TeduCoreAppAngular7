import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/service/authen.service';
import { UtilityService } from '../core/service/utility.service';
import { MessageConstant } from '../core/common/message.constant';
import { NotificationService } from '../core/service/notification.service'
import { SystemConstant } from '../core/common/system.constant'
import { UrlConstant } from '../core/common/url.constant'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false
  public model: any = {};
  private returnUrl: string;

  constructor(private _authentication: AuthenService, private _Utility: UtilityService, private _notification: NotificationService) { }

  ngOnInit() {

  }
  login() {
    this.loading = true;
    this._authentication.login(this.model.username, this.model.password, this.model.rememberMe).subscribe(data => {     
      this.loading=false;
    });
  }

}
