import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Response, Categoria } from '../models';
import { GlobalService } from '../models/global.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private globalService: GlobalService, private http: HttpClient) { }

    getAll() {
        return this.http.get<Response>(this.globalService.apiHost + 'categoria');
    }

    getById(id: number) {
        return this.http.get(`${GlobalService}/categoria/${id}`);
    }

    /* register(categoria: Categoria) {
        return this.http.post(`${GlobalService}/categoria/register`, categoria);
    }

    update(categoria: Categoria) {
        return this.http.put(`${GlobalService}/categoria/${categoria.id}`, categoria);
    }

    delete(id: number) {
        return this.http.delete(`${GlobalService}/categoria/${id}`);
    } */
}
