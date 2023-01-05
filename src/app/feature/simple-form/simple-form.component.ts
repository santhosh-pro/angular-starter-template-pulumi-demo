import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetCatListService } from 'src/app/core/cat/cat-list/cat-list.service';
import { CreateCatResponse } from 'src/app/core/cat/create-cat/create-cat.response';
import { CreateCatService } from 'src/app/core/cat/create-cat/create-cat.service';
import { DeleteCatResponse } from 'src/app/core/cat/delete-cat/delete-cat.response';
import { DeleteCatService } from 'src/app/core/cat/delete-cat/delete-cat.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { AlertMessageService } from 'src/app/shared/controls/alert-message/alert-message.service';
import { ConfirmDialog } from 'src/app/shared/controls/confirm-dialog/confirm-dialog';
import { ConfirmDialogService } from 'src/app/shared/controls/confirm-dialog/confirm-dialog.service';
import { TableColumn } from 'src/app/shared/controls/table/table-column';
import { State } from 'src/app/shared/state';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  public catColumns:TableColumn[] = [
    {
      name:'Name',
      dataKey:'name',
      isSortable:false
    },
    {
      name:'Age',
      dataKey:'age',
      isSortable:false
    },
    {
      name:'Breed',
      dataKey:'breed',
      isSortable:false
    }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private createCatService:CreateCatService,
    public getCatListService:GetCatListService,
    private deleteCatService:DeleteCatService,
    private alertMessageService:AlertMessageService,
    private confirmDialogService: ConfirmDialogService,

  ) {
    super();
  }
  ngOnInit(): void {
    this.listenAllSubscribers();

    this.getCatListService.execute({
      pageNumber:1,
      pageSize:10
    });
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      breed: [null, [Validators.required]],
    });
  }

  listenAllSubscribers() {
    super.autoUnSubscribe(
      this.createCatService.createcat$.subscribe(
        (res: State<CreateCatResponse>) => {
          if(res.isSuccess) {
            this.form.enable();
            this.form.markAsPristine();
            this.alertMessageService.success("Cat", "Cat has been created successfully");
            this.getCatListService.execute({
              pageNumber:1,
              pageSize:10
            })
          }

          if (res.isLoading) {
          }
          
          if (res.isError) {
            this.form.enable();
            console.log("error");
          }
        }
      ),
      
    )

    super.autoUnSubscribe(
      this.deleteCatService.deleteCat$.subscribe(
        (res: State<DeleteCatResponse>) => {
          if(res.isSuccess) {
            this.alertMessageService.success("Cat", "Cat has been deleted successfully")

            this.getCatListService.execute({
              pageNumber:1,
              pageSize:10
            })
          }

          if (res.isLoading) {
          }
          
          if (res.isError) {
            this.form.enable();
            console.log("error");
          }
        }
      ),
      
    )
  }

  submit() {
    if(this.form.valid) {
    this.createCatService.execute(this.form.value);
    }
  }

  page(event:any) {
    this.getCatListService.execute({
      pageNumber:event.pageNumber,
      pageSize:event.pageSize
    })
  }

  deleteAction(row: any) {
    const option: ConfirmDialog = {
      title: "Do you want to Delete?",
      cancelText: "Cancel",
      confirmText: "Confirm",
      message: "Do you want to Delete the Cat?",
    };
    this.confirmDialogService.open(option);
    this.confirmDialogService.confirmed().subscribe((res: Boolean) => {
      if (res) {
        console.log("deleted");
        this.deleteCatService.execute(row.id);
       
      }
    });
  }
}
