import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {SystemConstant} from '../../core/common/system.constant';
import {DataService} from '../../core/service/data.service';
declare var  moment:any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit') addEditModal: ModalDirective;
  @ViewChild('avatar') avatar;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRow: number;
  public entity: any;
  public users: any;
  public allRoles:any[];
  public myRoles:any[];
  public roles:any[];
  public baseFolder:string=SystemConstant.BASE_API;

  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this.load();
  }

  public load() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.users = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      })
  }

}
