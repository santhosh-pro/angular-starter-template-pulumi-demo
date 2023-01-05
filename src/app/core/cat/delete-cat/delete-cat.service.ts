import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base-api.service';
import { AuthHelperService } from 'src/app/shared/auth-helper.service';
import { State } from 'src/app/shared/state';
import { DeleteCatResponse } from './delete-cat.response';

@Injectable({
  providedIn: 'root'
})
export class DeleteCatService extends BaseApiService {

  constructor(http: HttpClient, authService: AuthHelperService) {
    super(http, authService);
  }

  private readonly _deleteCat = new BehaviorSubject<State<DeleteCatResponse>>(new State<DeleteCatResponse>(null));
  readonly deleteCat$ = this._deleteCat.asObservable();

  execute(id:string) {
    const response = new State<DeleteCatResponse>(this._deleteCat);
    response.notifyLoading();
    super.delete('cats/'+id).subscribe((res:any) => {
      response.notifySuccess(res);
    }, err => {
      response.notifyError('Failed');
    });
  }

}