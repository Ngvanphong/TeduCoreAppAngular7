import { Component, OnInit,ViewChild } from '@angular/core';
import {UtilityService} from '../../core/service/utility.service';
import {DataService} from '../../core/service/data.service';
import {SystemConstant} from '../../core/common/system.constant';
import {NgForm} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  public baseFolder: string = SystemConstant.BASE_API;
  public entity: any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 7;
  public filterKeyword: string = '';
  public filterCategoryId: number = null;
  public filterHotPromotion: string = "";
  public products: any[];
  public productCategories: any[]
  public checkedItems: any[] = [];
  private flagInitTiny: boolean = true;
  /*Image Management*/
  @ViewChild('imageManageModal') private imageManageModal: ModalDirective;
  @ViewChild('imagePath') private imagePath;
  public imageEntity: any = {};
  public productImages: any[];
  public image: any = {};
  /*Quantity Management*/
  @ViewChild('quantityManageModal') private quantityManageModal: ModalDirective;
  public quantityEntity: any = {};
  public productQuantities: any[];
  public sizeId: number = null;
  public sizes: any[];

  constructor(private _utilityService: UtilityService,private _dataService:DataService) { }

  ngOnInit() {
    this.search()
  }

  pageChanged(event: any): void {
    this.pageIndex= event.page;
    this.search();
  }
  public search() {
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filterKeyword + '&categoryId='
      + this.filterCategoryId + '&filterHotPromotion=' + this.filterHotPromotion)
      .subscribe((response: any) =>{
        if (response!=null){
            this.products = response.Items;
            this.pageIndex = response.PageIndex;
            this.totalRow = response.TotalRows;
        }
      } 
      
     );
  }

}
