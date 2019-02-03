import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { ProductsService } from '../../shared/services/products.service';
import { Producto } from '../../shared/models/producto';
import { ProductoService } from '../../shared/services/producto.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Producto[] = [];

  constructor(private productsService: ProductsService, public productoService: ProductoService) { }

  ngOnInit() {
    this.productoService.getAllProductos().pipe(first()).subscribe(resp => {
      this.products = resp.data;
    });
  }

}
