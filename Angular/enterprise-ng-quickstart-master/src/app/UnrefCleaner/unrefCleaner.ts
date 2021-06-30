import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
@Component({
    selector: 'unrefCleaner',
    templateUrl: 'unrefCleaner.html',
    styleUrls: ['./unrefCleaner.css'],
    providers: [AppService]
})
@Injectable({
    providedIn: 'root'
})
export class unrefCleaner {
    constructor(private appService: AppService, private http: HttpClient) {

    }
    data: any
    lines: Array<string> = []
    dict: any = {}
    output: Array<string> = []
    out: string


    last_table: any
    onFileChangeUnref(event: any) {
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
                if (line.indexOf('>') != -1) {
                    this.last_table = line
                    if (!(line in this.dict)) {
                        this.dict[line] = {}
                    }
                    continue
                }
                if (!(line in this.dict[this.last_table])) {
                    this.dict[this.last_table][line] = 1
                }
                else {
                    this.dict[this.last_table][line] = this.dict[this.last_table][line] + 1
                }
            }
            console.log(this.dict[this.last_table])
            for (const key in this.dict) {
                console.log(key)
                for (const line in this.dict[key]) {
                    //console.log("level 1")
                    console.log(line)
                    console.log("output =" + this.dict[key][line])
                }
            }
            for (const key in this.dict) {
                this.output.push(key)
                this.output.push('\n')
                for (const line in this.dict[key]) {
                    this.output.push(line + "count =" + this.dict[key][line])
                    this.output.push('\n')
                }
            }
        };
    }

    ReDirect() {
        console.log(this.output)
        this.out = this.output.join(' ')
        console.log(this.out)

    }

    ///// testing //////

    dynamicDownloadTxt() {
        this.dyanmicDownloadByHtmlTag(
            {
                fileName: 'Report.txt',
                text: this.out
            }
        )
    }



    private setting = {
        element: {
            dynamicDownload: null as HTMLElement
        }
    }
    private dyanmicDownloadByHtmlTag(arg: {
        fileName: string,
        text: string
    }) {
        if (!this.setting.element.dynamicDownload) {
            this.setting.element.dynamicDownload = document.createElement('a');
        }
        const element = this.setting.element.dynamicDownload;
        const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
        element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
        element.setAttribute('download', arg.fileName);



        var event = new MouseEvent("click");
        element.dispatchEvent(event);
    }


}