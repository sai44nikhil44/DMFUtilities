
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';
import { AppService } from '../app.service';

@Injectable()
export class DataGridDemoService extends SohoDataGridService {

  private columns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  public data: Array<any> = Array<any>();
  i=0;

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
        id: 'TableNumber',
        name: 'Table Number',
        filterType: 'text',
        field: 'TableNumber',
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
      field: 'CountAfter',
      filterType: 'text'
    });
    this.columns.push({
      id: 'Difference',
      name: 'Difference',
      field: 'Difference',
      filterType: 'text'
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
    });this.columns.push({
      id: 'da2Count',
      name: 'Da2 Count',
      filterType: 'text',
      field: 'da2Count',
     });
    this.appService.get1Data().subscribe((response: any)=>{
      console.log(response);
      for (const a in response.output){
        this.i++;
        this.data.push({TableNumber: response.output[a].Table, Description: response.output[a].Description, CountBefore: response.output[a].CountBefore,da2Count: response.output[a].da2_count, CountAfter: response.output[a].CountAfter, Difference: response.output[a].Difference, LoadedRecords: response.output[a].RecordsLoaded, RejectedRecords: response.output[a].RecordsRejected});
      }  console.log(this.i)
        })
      
     }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}