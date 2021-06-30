import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'LN2LN',
    templateUrl: 'LN2LN.html',
    styleUrls: ['./LN2LN.css'],
    providers: [AppService]
})
@Injectable({
    providedIn: 'root'
  })
export class LN2LNC {
    constructor(private appService: AppService, private http: HttpClient) {}
    x = "";
    LNMigrationRun: any;
    LNCountTableBefore: any;
    LNCountTableAfter: any;
    AccessImportData: any;
    AccessValidationReport: any;
    Source :any;
    Target :any;
    RA: any;
    text ="";
    show = 0;
    form = 0;
    src: any;
    status: string;
    ReDirect() {
        console.log({'source':this.Source,'target':this.Target});
        console.log(this.src)
           if((this.Source!=null && this.Target!=null) || (this.LNMigrationRun!=null && this.RA!=null)){
this.http.post("http://127.0.0.1:5000/ln2ln",{'source':this.Source,'target':this.Target,'mig_run':this.LNMigrationRun,'rec_count':this.RA}).subscribe((Response:any)=>{
           console.log(Response);
    if (Response=="SUCCESS")
    {
        this.LNMigrationRun=null;
        this.LNCountTableBefore=null;
        this.LNCountTableAfter=null;
        this.AccessImportData=null;
        this.AccessValidationReport=null;
        this.Source=null;
        this.Target=null;
        this.RA=null;
        console.log({'source':this.Source,'target':this.Target});
        this.show = 0;
        this.form = 1;
        this.text="";
    }
    else{
        this.text="Upload proper files"
    }
}
);}else{
    this.text="Upload the specified files"
}
    
    }
    // testing //
    onFileChange(event: any,mode: string) {
        /* wire up file reader */
        this.form=0;
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