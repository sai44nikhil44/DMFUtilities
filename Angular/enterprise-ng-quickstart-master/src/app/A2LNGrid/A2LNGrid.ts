
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { SohoDataGridComponent, SohoDataGridService } from 'ids-enterprise-ng';
import { DataGridDemoService } from './datagrid-demo.service';
import { Injectable } from '@angular/core';
@Component({
selector: 'A2LNGrid',
templateUrl: './A2LNGrid.html',
styleUrls: ['./A2LNGrid.css'],
providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, DataGridDemoService ],
changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable({
providedIn: 'root'
})
export class A2LNGridC implements OnInit{
 
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  constructor() {
  }
ngOnInit(): void{
}

  export() {
    this.dataGrid?.exportToExcel('my-export');
  }
}