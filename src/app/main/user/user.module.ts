import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {Routes,RouterModule} from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

const userRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:UserComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRouter),
    PaginationModule.forRoot(),
  ],
  declarations: [UserComponent]
})
export class UserModule { }
