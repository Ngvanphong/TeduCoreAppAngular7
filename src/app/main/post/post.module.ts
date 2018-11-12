import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import {Routes,RouterModule} from '@angular/router';
const postRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:PostComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(postRouter),
  ],
  declarations: [PostComponent]
})
export class PostModule { }
