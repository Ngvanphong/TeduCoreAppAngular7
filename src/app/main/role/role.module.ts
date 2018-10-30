import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {Routes,RouterModule} from '@angular/router';
const roleRouter:Routes=[
  {path:'',component:RoleComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRouter)
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
