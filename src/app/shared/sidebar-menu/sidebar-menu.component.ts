import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service'
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  public functions: any[];
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.get('/api/Function/getlisthierarchy').subscribe((response: any[]) => {
      if (response != null) {
        this.functions = response.sort((n1, n2) => {
          if (n1.DisplayOrder > n2.DisplayOrder)
            return 1;
          else if (n1.DisplayOrder < n2.DisplayOrder)
            return -1;
          return 0;
        });
      }
    
      
    })
  }


}
