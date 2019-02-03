
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services/categoria.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoriaSubscription: Subscription;
  categorias: Categoria[] = [];

  constructor( private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.loadAllCategorias();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.categoriaSubscription.unsubscribe();
}

private loadAllCategorias() {
  this.categoriaService.getAll().pipe(first()).subscribe(resp => {
    this.categorias = resp.data;
});
}

}
