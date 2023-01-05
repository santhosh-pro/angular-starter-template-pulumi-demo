import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base-api.service';
import { AuthHelperService } from 'src/app/shared/auth-helper.service';
import { State } from 'src/app/shared/state';
import { CreateCatRequest } from './create-cat.request';
import { CreateCatResponse } from './create-cat.response';

@Injectable({
  providedIn: 'root'
})
export class CreateCatService extends BaseApiService {

  constructor(http: HttpClient, authService: AuthHelperService) {
    super(http, authService);
  }

  private readonly _createCat = new BehaviorSubject<State<CreateCatResponse>>(new State<CreateCatResponse>(null));
  readonly createcat$ = this._createCat.asObservable();

  execute(data:Partial<CreateCatRequest>) {
    const response = new State<CreateCatResponse>(this._createCat);
    response.notifyLoading();
    super.post('cats',data).subscribe((res:any) => {
      response.notifySuccess(res);
    }, err => {
      response.notifyError('Failed');
    });
  }

}