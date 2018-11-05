import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule,Routes} from '@angular/router';
import {AuthenService} from '../core/service/authen.service';
import {NotificationService} from '../core/service/notification.service';
import{UtilityService} from '../core/service/utility.service';
import {FormsModule} from '@angular/forms'
const loginRouter:Routes=[
{path:'',component:LoginComponent}
]
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(loginRouter)
  ],
  declarations: [LoginComponent],
  providers:[AuthenService,UtilityService]

})
export class LoginModule { }
