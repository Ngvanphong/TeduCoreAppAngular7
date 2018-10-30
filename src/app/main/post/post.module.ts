import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import {Routes,RouterModule} from '@angular/router';
const postRouter:Routes=[
  {path:'',component:PostComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(postRouter),
  ],
  declarations: [PostComponent]
})
export class PostModule { }
