import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../core/service/authen.service';
import {LoggedInUser} from '../../core/domain/loginin.user';
import {SystemConstant} from '../../core/common/system.constant';
import {UtilityService} from '../../core/service/utility.service';
import {UrlConstant} from '../../core/common/url.constant';

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.css']
})
export class TopbarMenuComponent implements OnInit {
  public user: LoggedInUser;
  public baseFolder: string = SystemConstant.BASE_API;
  public canSendMessage: Boolean;
  public announcements: any[];

  constructor(private _autenServie:AuthenService, private _utilityService :UtilityService) { }

  ngOnInit() {
    this.user=this._autenServie.getUserLogin();
  }
  
  logout() {
    localStorage.removeItem(SystemConstant.CURRENT_USER);
    this._utilityService.navigate(UrlConstant.lOGIN);
  }
 


}
