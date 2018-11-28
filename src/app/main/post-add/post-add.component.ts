import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemConstant } from '../../core/common/system.constant';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute,Router } from '@angular/router'
import { Observable } from 'rxjs';
import {NotificationService} from '../../core/service/notification.service';


declare const tinymce: any;
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  public baseFolder: string = SystemConstant.BASE_API;
  @ViewChild('imageinput') imageinput;
  public entity: any = {Content:''};
  public posts: any[];
  public postCategories: any[]
  public flagShowImage: boolean = false;
  public blogId: Observable<string>

  constructor(private _dataService: DataService, private _activateRouter: ActivatedRoute,private _router:Router,
    private _notificationService:NotificationService) {
     this._activateRouter.params.subscribe(params => {
      this.blogId= params['id'];
    });
  }

  ngOnInit() {
    this.getDetail()
  }
  private getDetail() {
    this._dataService.get('/api/post/detail/' + this.blogId).subscribe((response: any) => {
      this.entity = response;
      if (this.entity.Content != undefined&&this.entity.Content!=null) {
        tinymce.activeEditor.setContent(this.entity.Content);
      }
      else {
        tinymce.on('init', () => {
          tinymce.editor = ""
        });
      }
    });

  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  goBack(){
    this._notificationService.printConfirmationDialog("Bạn đã lưu nội dung trước khi quay lại !",()=>{
      this._router.navigate(['/main/post/index']);
    }) 
  }

  public updateContent(){
    this._dataService.put("/api/post/update", JSON.stringify(this.entity)).subscribe((res: any) => {     
    })
  }

    
 

}
