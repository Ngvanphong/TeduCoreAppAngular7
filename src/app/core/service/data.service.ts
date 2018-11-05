import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NotificationService } from './notification.service';
import { MessageConstant } from '../common/message.constant';
import { SystemConstant } from '../common/system.constant'
import { AuthenService } from './authen.service'
import { tap, catchError } from 'rxjs/operators';
import {UtilityService} from './utility.service'
import { Observable } from 'rxjs';
const _headerOptionData = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const optionPostFile={
  headers: new HttpHeaders()
};
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient, private _notificationService: NotificationService, private _authenService: AuthenService
    , private _utilityService :UtilityService
    ) { }

  get(uri: string) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    return this._http.get(SystemConstant.BASE_API + uri, _headerOptionData).pipe(
      tap(),
      catchError(this._notificationService.handleError<any>("is empty"))
    )
  };

  getString(uri: string, key: string, id: string) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    return this._http.get(SystemConstant.BASE_API + uri + "/?" + key + "=" + id, _headerOptionData).pipe(
      tap(
      ),
      catchError(
        this._notificationService.handleError<any>("Not found")
      )
    )
  };

  post(uri: string, data?: any) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    return this._http.post(SystemConstant.BASE_API + uri, data, _headerOptionData).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  put(uri: string, data?: any) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    return this._http.put(SystemConstant.BASE_API + uri, data, _headerOptionData).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  delete(uri: string, key: string, id: string) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    return this._http.delete(SystemConstant.BASE_API + uri + "?" + key + "=" + id, _headerOptionData).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };
  deleteAllTagNotUse(uri: string) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    return this._http.delete(SystemConstant.BASE_API + uri, _headerOptionData).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  }
  deleteWithMultiParams(uri: string, params) {
    _headerOptionData.headers.delete("Authorization");
    _headerOptionData.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(SystemConstant.BASE_API + uri + "/?" + paramStr, _headerOptionData).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )


  }
  postFile(uri: string, data?: any) {
    optionPostFile.headers.delete("Authorization");
    optionPostFile.headers.append("Authorization", "Bearer " + this._authenService.getUserLogin().access_token)    
    return this._http.post(SystemConstant.BASE_API + uri, data,optionPostFile).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  }
  
  public handleErrorComponent(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstant.LOGIN_AGAIN_MEG);
      this._utilityService.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstant.FORBIDDEN);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }


  }


}
