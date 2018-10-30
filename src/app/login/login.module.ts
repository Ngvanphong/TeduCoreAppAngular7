import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule,Routes} from '@angular/router'
const loginRouter:Routes=[
{path:'',component:LoginComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRouter)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
