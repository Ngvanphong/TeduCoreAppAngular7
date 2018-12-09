import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {MessageConstant} from '../../core/common/message.constant';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filterCustomerName: string = '';
  public filterStartDate: string = '';
  public filterbillStatus: string = '5';
  public filterEndDate: string = '';
  public orders: any[]=[];
    
  constructor(private _dataService:DataService,private _notificationService:NotificationService) { 
    
  }

  ngOnInit() {
    this.search();
  }

  pageChanged(event: any): void {
    this.pageIndex= event.page;
    this.search();
  }

  public reset() {
    this.filterCustomerName = '';
    this.filterEndDate = '';
    this.filterStartDate = '';
    this.filterbillStatus = '5';
    this.search();
  }

  public search() {
    this._dataService.get('/api/order/getlistpaging?page=' + this.pageIndex
      + '&pageSize=' + this.pageSize + '&startDate=' + this.filterStartDate
      + '&endDate=' + this.filterEndDate + '&customerName=' + this.filterCustomerName
      + '&billStatus=' + this.filterbillStatus)
      .subscribe((response: any) => {
        this.orders = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRow=response.TotalRows;
      });
  }

  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/order/delete', 'id', id).subscribe((response: any) => {     
        this.search();
      });
    });
  }

}
