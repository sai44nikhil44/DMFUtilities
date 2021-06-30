
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
@Component({
selector: 'LNGrid',
templateUrl: './LNGrid.html',
styleUrls: ['./LNGrid.css'],
providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService, DataGridDemoService ],
changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable({
providedIn: 'root'
})
export class LNGridC implements OnInit{

  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  constructor(private toastService: SohoToastService, private service: DataGridDemoService, private appService: AppService) {
  }
ngOnInit(): void{
}

  export() {
    this.dataGrid?.exportToExcel('my-export');
    this.dataGrid?.exportToCsv('my-export');
  }
}