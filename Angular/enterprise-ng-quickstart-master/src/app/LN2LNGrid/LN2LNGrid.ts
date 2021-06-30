
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { SohoDataGridComponent, SohoDataGridService } from 'ids-enterprise-ng';
import { DataGridDemoService } from './datagrid-demo.service';
import { SohoToastService } from 'ids-enterprise-ng';
import { of, Observable,Subject } from 'rxjs';
import {AppService} from '../app.service';

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { table } from 'console';
@Component({
selector: 'LN2LNGrid',
templateUrl: './LN2LNGrid.html',
styleUrls: ['./LN2LNGrid.css'],
providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService, DataGridDemoService ],
changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable({
providedIn: 'root'
})
export class LN2LNGridC implements OnInit{ 
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  constructor(private toastService: SohoToastService, private service: DataGridDemoService, private appService: AppService) {
  }
ngOnInit(): void{
  // this.dataGrid?.removeRow(table)
}
  onSelected(e: SohoDataGridSelectedEvent) {
    if (e.rows && e.rows.length) {
      this.toastService.show({
        title: 'Selected',
        message: e.rows.map(row => row.data ? row.data.Table : false).join(', ')
      });
    }
  }

  onOpenFilterRow(_e: SohoDataGridOpenFilterRowEvent) {
    this.toastService.show({title: 'Filterbar', message: 'filter row opened'});
  }

  onCloseFilterRow(_e: SohoDataGridCloseFilterRowEvent) {
    this.toastService.show({title: 'Filterbar', message: 'filter row closed'});
  }

  public onBeforeSelect = (eventData: SohoDataGridBeforeSelectEventData) => {
   console.log(eventData, Soho.keyboard.pressedKeys);
  }

  busy() {
    (this.busyIndicator as any).activated = true;
  }
  Delete(){
      this.dataGrid?.removeSelected();    
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid?.clearFilter();

  }

  sortColumn() {
    this.dataGrid?.setSortColumn('Table');
  }

  export() {
    this.dataGrid?.exportToExcel('my-export');
    this.dataGrid?.exportToCsv('my-export');
  }
}