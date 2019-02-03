import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '../models/response';
import { GlobalService } from '../models/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    'x-api-key': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private globalService: GlobalService, private http: HttpClient) { }

  getAllProductos(): Observable<any> {
    return this.http.get<Response>(this.globalService.apiHost + 'producto/all-products');
  }

}
