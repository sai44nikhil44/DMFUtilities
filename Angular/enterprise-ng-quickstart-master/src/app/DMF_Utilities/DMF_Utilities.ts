import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
@Component({
    selector: 'DMF_Utilities',
    templateUrl: 'DMF_Utilities.html',
    styleUrls: ['./DMF_Utilities.css'],
    providers: [AppService]
})
@Injectable({
    providedIn: 'root'
  })
export class DMF_UtilitiesC {
    constructor(private appService: AppService) {}
    x = "";
    LNData: any
    AccessData: any;
    show = 0;
    form = 0;
    
    onChange(event: any) {
        this.form = 0;
        this.x = event.target["value"];
        if (this.x == "A2LN")
            this.show = 1;
        else if (this.x == "LN2LN")
            this.show = 2;
        else
            this.show = 0;
        console.log(this.x)
    }
    ReDirect() {
        this.show = 0;
        this.form = 1;
    }
    // testing //
    onFileChange(event: any) {
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
            const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(data); // Data will be logged in array format containing objects
        };
    }
    onFileChangeAccessImportReport(event: any) {
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        console.log(event);
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
            this.AccessData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(this.AccessData); // Data will be logged in array format containing objects
        };


    }
    onFileChangeAccessValidationReport(event: any) {
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        console.log(event);
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
            this.AccessData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(this.AccessData); // Data will be logged in array format containing objects
        };


    }
    onFileChangeLN_MR(event: any) {
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        console.log(event);
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
            this.LNData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(this.LNData); // Data will be logged in array format containing objects
        };
    }
    onFileChangeLN_CTB(event: any) {
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        console.log(event);
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
            this.LNData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(this.LNData); // Data will be logged in array format containing objects
        };
    }
    onFileChangeLN_CTA(event: any) {
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        console.log(event);
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
            this.LNData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            console.log(this.LNData); // Data will be logged in array format containing objects
        };
    }
    getData() {
        this.appService.retrieveData().subscribe((response: any) => {
            console.log(response);
        })
    }
    // end testing //
}