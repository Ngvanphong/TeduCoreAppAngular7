import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service';
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
  public filterbillStatus: string = '';
  public filterEndDate: string = '';
  public orders: any[]=[];
  
   
  constructor(private _dataService:DataService) { 
    
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
    this.filterbillStatus = '';
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

}
