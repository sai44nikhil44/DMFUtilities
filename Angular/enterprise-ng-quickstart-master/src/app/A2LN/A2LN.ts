import { Component, OnInit, ViewChild,
    ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../app.service';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'A2LN',
    templateUrl: 'A2LN.html',
    styleUrls: ['./A2LN.css'],
    providers: [AppService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable({
    providedIn: 'root'
  })
export class A2LNC  implements OnInit{

    ngOnInit(): void{
    }
    constructor(private appService: AppService, private http: HttpClient) {}
    x = "";
    text="";
    LNMigrationRun: any;
    LNCountTableBefore: any;
    LNCountTableAfter: any;
    AccessImportData: any;
    AccessValidationReport: any;
    RA: any;
    imp: any;
    vr:any;
    mr:any;
    cb:any;
    ca:any;
    rc:any;
    Source :any;
    Target :any;
    open=1;
    show = 1;
    form = 0;
    status: string;
    ReDirect() {
        console.log(this.imp)
        console.log({'import':this.AccessImportData,'validation':this.AccessValidationReport,'mig_run':this.LNMigrationRun,'target':this.LNCountTableAfter,'source':this.LNCountTableBefore,'rec_count':this.RA})
 if(this.imp!=null && this.vr!=null){
this.http.post("http://127.0.0.1:5000/a2ln",{'import':this.AccessImportData,'validation':this.AccessValidationReport}).subscribe((Response:any)=>{
if (Response==="SUCCESS")
        this.form = 1;});}
else if((this.mr!=null && this.ca!=null && this.cb!=null && this.rc!=null)){
this.http.post("http://127.0.0.1:5000/a2ln",{'mig_run':this.LNMigrationRun,'target':this.LNCountTableAfter,'source':this.LNCountTableBefore,'rec_count':this.RA}).subscribe((Response:any)=>{
    if (Response==="SUCCESS")
    this.form=1});}
    else
    {
        console.log("entered")
this.text="Enter Access or LN files to get the output";
    }
  }
    // testing //
    onFileChange(event: any,mode: string) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

            /* selected the first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            const tempData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            if (mode==="accessIm")
            {
                this.AccessImportData=tempData;
                console.log(this.AccessImportData);
            }
            else if (mode==="accessvr")
            {
                this.AccessValidationReport=tempData;
                console.log(this.AccessValidationReport);
            }
            else if (mode==="LN_MR")
            {
                this.LNMigrationRun=tempData;
                console.log(this.LNMigrationRun);
            }
            else if (mode==="LN_CTB")
            {
                this.LNCountTableBefore=tempData;
                console.log(this.LNCountTableBefore);
            }
            else if (mode==="LN_CTA")
            {
                this.LNCountTableAfter=tempData;
                console.log(this.LNCountTableAfter);
            }
            else if (mode==="source")
            {
                this.Source=tempData;
                console.log(this.Source);
            }else if (mode==="target")
            {
                this.Target=tempData;
                console.log(this.Target);
            }
            else if (mode==="RA"){
this.RA=tempData;
console.log(this.RA)
            }
            // console.log(tempData); // Data will be logged in array format containing objects
        };
    }
  
    getData() {
        this.appService.retrieveData().subscribe((response: any) => {
            console.log(response);
        })
    }
    // end testing //
}