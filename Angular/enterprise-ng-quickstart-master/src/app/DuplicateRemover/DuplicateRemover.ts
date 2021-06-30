import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
    selector: 'DuplicateRemover',
    templateUrl: 'DuplicateRemover.html',
    styleUrls: ['./DuplicateRemover.css'],
    providers: [AppService]
})
@Injectable({
    providedIn: 'root'
})
export class duplicateRemover {
    constructor(private appService: AppService) { }

    data: any
    lines: Array<string> = []
    dict: any = {}
    output: any = []
    out: string
    last_table: any

    onFileChange(event: any) {
        /* wire up file reader */

        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();

        reader.readAsBinaryString(target.files[0]);
        reader.onload = (e: any) => {

            this.data = reader.result
            let i = 1
            for (const line of this.data.split(/[\r\n]+/)) {
                this.lines.push(line)
            }
            for (const line of this.lines) {
                var temp = []
                temp = line.split('')
                this.output.push(temp)

            }
            console.log(this.output)

        };

    }
}