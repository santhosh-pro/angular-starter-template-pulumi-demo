import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthHelperService } from "src/app/shared/auth-helper.service";
import { BaseApiService } from "src/app/shared/base-api.service";
import { State } from "src/app/shared/state";
import { CatListRequest } from "./cat-list.request";
import { CatListResponse } from "./cat-list.response";

@Injectable({
    providedIn: 'root'
  })
  export class GetCatListService extends BaseApiService {
  
    constructor(http: HttpClient, authService: AuthHelperService) {
      super(http, authService);
    }
  
    private readonly _getCatList = new BehaviorSubject<State<CatListResponse>>(new State<CatListResponse>(null));
    readonly getCatList$ = this._getCatList.asObservable();
  
    execute(data:Partial<CatListRequest>) {
      const response = new State<CatListResponse>(this._getCatList);
      response.notifyLoading();
      super.get('cats',data,false).subscribe((res:any) => {
        response.notifySuccess(res);
      }, err => {
        response.notifyError('Failed');
      });
    }
  
  }