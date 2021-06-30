import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient){}
    public retrieveData(){
        //return this.http.get("http://dummy.restapiexample.com/api/v1/employees");
        return this.http.get("http://127.0.0.1:5000/api/v1/resources/books/all");
    }
    public postData(){
       // this.http.post();
    }
    public getData(){
        return this.http.get("http://127.0.0.1:5000/ln2ln");
        //  return this.http.get("https://api.mocki.io/v1/9b74df2e");

    }
    
    public get1Data(){return this.http.get("http://127.0.0.1:5000/a2ln");}
}