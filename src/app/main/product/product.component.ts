import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../core/service/utility.service';
import {DataService} from '../../core/service/data.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _utilityService: UtilityService,private _dataService:DataService) { }

  ngOnInit() {
    this._dataService.get("/api/Product").subscribe();
  }

}
