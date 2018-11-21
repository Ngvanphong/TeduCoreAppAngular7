import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DataService} from '../../core/service/data.service';
import {UtilityService} from '../../core/service/utility.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @ViewChild(TreeComponent) private treeProductCategory: TreeComponent;
  @ViewChild('addEditModal') private addEditModal: ModalDirective;

  public filter: string = '';
  public functionId: string;
  public entity: any;
  public _productCategoryHierachy: any[];
  public _productCategories: any[];

  constructor(private _dataService:DataService,private _utilityService:UtilityService) { }

  ngOnInit() {
    this.search();
  }
   // loadData
   public search() {
    this._dataService.get('/api/productCategory/getall?filter=' + this.filter).subscribe((res: any[]) => {
      this._productCategoryHierachy = this._utilityService.Unflatten(res);
      this._productCategories = res;
    });
  }

  // show add
  public showAdd() {
    this.entity = { Status: true, HomeFlag: true };
    this.addEditModal.show();

  }

  public createAlias(name: any) {
    this.entity.Alias = this._utilityService.MakeSeoTitle(name);
  }

}
