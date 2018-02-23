import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ParserService {

  constructor(private http: HttpClient) { }

  setMainArr(file){
    let mainA = file.split('\r\n')
    return mainA
  }

  httpOptions={
    headers:new HttpHeaders({'Content-Type':  'application/json'})
  };

  parsuj(_item){
    let itemToSend={
      item:_item
    }
    return this.http.post('http://localhost:3000/api', itemToSend, this.httpOptions)
  }
}
