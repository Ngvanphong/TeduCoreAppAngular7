import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { SystemConstant } from '../../core/common/system.constant';
import { UploadService } from '../../core/service/upload.service'

@Component({
  selector: 'app-advertistment',
  templateUrl: './advertistment.component.html',
  styleUrls: ['./advertistment.component.css']
})
export class AdvertistmentComponent implements OnInit {

  @ViewChild('modalAddEdit') addEditModal: ModalDirective;
  @ViewChild('iamge') image;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRow: number;
  public entity: any;
  public advertistments: any;
  public baseFolder: string = SystemConstant.BASE_API;
  public pages:any[]=[];
  public positions:any[]=[];


  constructor(private _dataService: DataService, private _notifictionService: NotificationService,
    private _uploadService: UploadService) {}

  ngOnInit() {
    this.search()
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public search() {
    this._dataService.get('/api/advertistment/getallpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.advertistments = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      })
  }


  showAdd() {
   
    this.entity = { Status: true };
    this.addEditModal.show();

  }

  saveChange(form: NgForm) {
    if (form.valid) {
      let fi = this.image.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile("/api/upload/saveImage?type=advertistment", null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Image = imageUrl;
          }).then(() => {
            this.saveData(form);
          });
      }
      else {
        this.saveData(form);
      }
    }
  }

  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post("/api/advertistment/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        if (res != null) {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.image.nativeElement.value = '';
        }
      })
    }
    else {
      this._dataService.put("/api/advertistment/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        if (res != null) {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.image.nativeElement.value = '';
        }
      })
    }
  }




}
