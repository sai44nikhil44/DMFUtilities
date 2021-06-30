
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
@Injectable({
  providedIn: 'root'
  })
@Component({
  selector: 'A2LNComGrid',
  templateUrl: './A2LNComGrid.html',
  styleUrls: ['./A2LNComGrid.css'],
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService, DataGridDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class A2LNComGridComponent implements OnInit {

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
    this.dataGrid?.exportToExcel('my-export','Sheet1');
    // this.dataGrid?.exportToCsv('my-export');
  }
}
