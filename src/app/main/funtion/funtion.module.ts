import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuntionComponent } from './funtion.component';
import {Routes,RouterModule} from '@angular/router';
const funtionRouter:Routes=[
  {path:'',component:FuntionComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(funtionRouter)
  ],
  declarations: [FuntionComponent]
})
export class FuntionModule { }
