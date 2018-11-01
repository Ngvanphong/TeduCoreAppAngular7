import {Routes} from '@angular/router';
import { MainComponent } from './main.component';
export const mainRouter:Routes=[
{path:'',component:MainComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadChildren:'./home/home.module#HomeModule'},
    {path:'funtion',loadChildren:'./funtion/funtion.module#FuntionModule'},
    {path:'post',loadChildren:'./post/post.module#PostModule'},
    {path:'role',loadChildren:'./role/role.module#RoleModule'},
    {path:'user',loadChildren:'./user/user.module#UserModule'},
    {path:'product',loadChildren:'./product/product.module#ProductModule'},    
]},

]