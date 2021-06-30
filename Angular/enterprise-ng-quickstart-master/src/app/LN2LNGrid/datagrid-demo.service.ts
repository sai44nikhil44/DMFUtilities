
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';
import { AppService } from '../app.service';

@Injectable()
export class DataGridDemoService extends SohoDataGridService {
i=0;
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
    this.columns.push(
      {
        id: 'Table',
        name: 'Table',
        filterType: 'text',
        field: 'Table',
        textOverflow: 'ellipsis'
     });
    this.columns.push({
      id: 'Description',
      name: 'Description',
      filterType: 'text',
      field: 'Description',
       });
    this.columns.push({
      id: 'CountBefore',
      name: 'Count Before',
      field: 'CountBefore',
      filterType: 'text'
    });
    this.columns.push({
      id: 'CountAfter',
      name: 'Count After',
      filterType: 'text',
      field: 'CountAfter',
     });
    this.columns.push({
      id: 'Difference',
      filterType: 'text',
      name: 'Difference',
      field: 'Difference',
    });
    this.columns.push({
      id: 'LoadedRecords',
      filterType: 'text',
      name: 'Loaded Records',
      field: 'LoadedRecords',
    });
    this.columns.push({
      id: 'RejectedRecords',
      filterType: 'text',
      name: 'Rejected Records',
      field: 'RejectedRecords',
    });
    this.appService.getData().subscribe((response: any)=>{
      console.log(response);
      // console.log(response.output[0])
      // this.data.push({Table: response.output[0].Table})
      for (const a in response.output){
        console.log(a)
        this.data.push({Table: response.output[a].Table, Description: response.output[a].Description, CountBefore: response.output[a].CountBefore, CountAfter: response.output[a].CountAfter, Difference: response.output[a].Difference, LoadedRecords: response.output[a].RecordsLoaded, RejectedRecords: response.output[a].RecordsRejected});
      }
})

     }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}