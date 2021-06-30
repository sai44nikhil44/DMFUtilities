
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';
import { AppService } from '../app.service';

@Injectable()
export class DataGridDemoService extends SohoDataGridService {
i=0;
msg='';
k=0;
j=0;
y='';
public arr: Array<any> = Array<{Name: string, Msg: string}>();
// public arr2: Array<any> = Array<{TableName: string,LoadAccessStarted: string,LoadAccessFinished: string,}>();
  private columns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  public data: Array<any> = Array<any>();

  public addColumn(column: SohoDataGridColumn) {
    this.getColumns().unshift(column);
  }

  getColumns(): Array<SohoDataGridColumn> {
    if (this.columns.length === 0) {
      this.init();
    }
    return this.columns;
  }

  getData(_req: SohoDataGridSourceRequest): Observable<Array<any>> {
    return of(this.data).pipe(delay(500));
  }

  constructor(private appService: AppService) {
    super();
  }

  init() {
    this.columns.push({id: 'TableName',name: 'Table Name',filterType: 'text',field: 'TableName',textOverflow: 'ellipsis'});
    this.columns.push({id: 'LoadAccessStarted',name: 'Load Access Started',field: 'LoadAccessStarted',filterType: 'text'});
    this.columns.push({id: 'LoadAccessFinished',name: 'Load Access Finished',filterType: 'text',field: 'LoadAccessFinished'});
    this.columns.push({id: 'LoadedRecords',filterType: 'text',name: 'Loaded Records',field: 'LoadedRecords'});
    this.columns.push({id: 'RejectedRecords',filterType: 'text',name: 'Rejected Records',field: 'RejectedRecords'});
    this.columns.push({id: 'Message',name: 'Message',filterType: 'text',field: 'Message'});
       this.appService.get1Data().subscribe((response: any)=>{
         console.log(response)
  for(this.i=0;this.i<Object.keys(response.validation).length;this.i++)
  {
    this.y=response.validation[this.i].SourceTable;
    this.k=0;
    this.msg=response.validation[this.i].Message;
    for(this.j=this.i+1;this.j<Object.keys(response.validation).length;this.j++)
    {
    if(this.y==response.validation[this.j].SourceTable)
    {
      this.msg=this.msg+ ', ' +response.validation[this.j].Message;
       this.k++;
    }}
    this.arr.push({Name: response.validation[this.i].SourceTable, Msg: this.msg})
     this.i=this.i+this.k;
  }
  for(this.i=0; this.i<Object.keys(response.import).length;this.i++)
         {           
           this.y=response.import[this.i].TableName;
           this.msg='';
           for(this.j=0;this.j<Object.keys(this.arr).length;this.j++)
           {
             if(this.y==this.arr[this.j].Name)
             {
              this.msg=this.arr[this.j].Msg;
             }
           }
           this.data.push({TableName: this.y, LoadAccessStarted: response.import[this.i].Date, LoadAccessFinished: response.import[this.i].Date, LoadedRecords: response.import[this.i].RecordsLoaded, RejectedRecords: response.import[this.i].RecordsRejected, Message: this.msg})

         }
  })
     }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}