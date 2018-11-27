import { Component, OnInit,ViewChild} from '@angular/core';
import {SystemConstant} from '../../core/common/system.constant';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  public baseFolder: string = SystemConstant.BASE_API;
  @ViewChild('imageinput') imageinput;
  public entity: any = {};
  public posts: any[];
  public postCategories: any[]
  private flagInitTiny: boolean = true;
  public flagShowImage: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
