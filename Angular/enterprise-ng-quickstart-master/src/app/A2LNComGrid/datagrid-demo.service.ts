
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';
import { AppService } from '../app.service';

@Injectable()
export class DataGridDemoService extends SohoDataGridService {
i=0;y='';
  private columns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  public data: Array<any> = Array<any>();
  private columnGroups: Array<SohoDataGridColumnGroup> = Array<SohoDataGridColumnGroup>();
  // @ViewChild(SohoDataGridColumnColSpanFunction, { static: true }) colspan?: SohoDataGridColumnColSpanFunction;
   updateColumns(columns1: SohoDataGridColumn[], columnGroups1: SohoDataGridColumnGroup[]){
     columns1=this.columns;
     columnGroups1=this.columnGroups;
     console.log("InGroups")
    }

  public addColumn(column: SohoDataGridColumn,columnGroups: SohoDataGridColumnGroup) {
    this.getColumns().unshift(column);
    this.getColumnGroups().unshift(columnGroups);

  }
  getColumnGroups(): Array<SohoDataGridColumnGroup> {
    if (this.columns.length === 0) {
      this.init();
    }
    return this.columnGroups;
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
    this.columnGroups.push({colspan: 3, id: 'firstGroup', name: 'Grouped Headers',align: 'center'},{colspan: 4, id: '', name: ''},{colspan: 6, id: 'secondGroup', name: 'Grouped Headers 2'});
    console.log("InGroups")
    // this.columnGroups.push({colspan: 4, id: '', name: ''});
    // this.columnGroups.push({colspan: 6, id: 'secondGroup', name: 'Grouped Headers 2'});
    this.columns.push({id: 'TableName',name: 'Table Name',filterType: 'text',field: 'TableName',textOverflow: 'ellipsis'});
    this.columns.push({id: 'Table',name: 'Table',filterType: 'text',field: 'Table', textOverflow: 'ellipsis'});
    this.columns.push({id: 'Description',name: 'Description',filterType: 'text', field: 'Description', });
    this.columns.push({id: 'LoadAccessStarted',name: 'Load Access Started',field: 'LoadAccessStarted',filterType: 'text'});
    this.columns.push({id: 'LoadAccessFinished',name: 'Load Access Finished',filterType: 'text',field: 'LoadAccessFinished'});
    this.columns.push({id: 'ALoadedRecords',filterType: 'text',name: 'Loaded Records',field: 'ALoadedRecords'});
    this.columns.push({id: 'ARejectedRecords',filterType: 'text',name: 'Rejected Records',field: 'ARejectedRecords'});
    this.columns.push({id: 'CountBefore',name: 'Count Before',field: 'CountBefore',filterType: 'text'});
    this.columns.push({id: 'LoadedRecords',filterType: 'text',name: 'Loaded Records',field: 'LoadedRecords'});
    this.columns.push({id: 'RejectedRecords',filterType: 'text',name: 'Rejected Records',field: 'RejectedRecords'});
    this.columns.push({id: 'da2Count', name: 'Da2 Count',filterType: 'text',field: 'da2Count',});
    this.columns.push({id: 'Difference',filterType: 'text',name: 'Difference',field: 'Difference',});
    this.columns.push({id: 'CountAfter',name: 'Count After',filterType: 'text',field: 'CountAfter',});
    this.appService.get1Data().subscribe((response: any)=>{
      console.log(response);
      for (const a in response.output){
        this.y=response.output[a].TableName
        for(const b in response.import)
        {
          if(this.y==response.import[b].TableName)
        this.data.push({TableName: response.import[b].TableName, 
                        Table: response.output[a].Table, 
                        Description: response.output[a].Description, 
                        CountBefore: response.output[a].CountBefore, 
                        CountAfter: response.output[a].CountAfter, 
                        Difference: response.output[a].Difference, 
                        LoadedRecords: response.output[a].RecordsLoaded, 
                        RejectedRecords: response.output[a].RecordsRejected, 
                        LoadAccessStarted: response.import[b].Date,
                        LoadAccessFinished: response.import[b].Date,
                        da2Count: response.output[a].da2_count,
                        ARejectedRecord: response.import[b].RecordsRejected,
                        ALoadedRecords: response.import[b].RecordsLoaded
                       });
      }
    }
})
this.updateColumns(this.columns,this.columnGroups)
     }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}