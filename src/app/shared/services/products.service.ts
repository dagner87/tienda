import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()

export class ProductsService {
  
  public currency : string = 'USD';
  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public compareProduct: Product[] = [];

  // Initialize 
  constructor(private http: Http,private toastrService: ToastrService) { 
     this.compareProducts.subscribe(products => this.compareProduct = products);
  }

  // Observable Product Array
  private products(): Observable<Product[]> {
     return this.http.get('assets/data/products.json').map((res:any) => res.json())
  }

  // Get Products
  public getProducts(): Observable<Product[]> {
    return this.products();
  }

  // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.products().pipe(map(items => { return items.find((item: Product) => { return item.id === id; }); }));
  }

   // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {
    return this.products().pipe(map(items => 
       items.filter((item: Product) => {
         if(category == 'all')
            return item
         else
            return item.category === category; 
        
       })
     ));
  }

  // Get Products
  public getComapreProducts(): Observable<Product[]> {
    return this.compareProducts.asObservable();
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = this.compareProduct.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = this.compareProduct.filter(item => item.id === product.id)[0];
      const index = this.compareProduct.indexOf(item);
    } else {
      if(this.compareProduct.length < 4)
        this.compareProduct.push(product);
      else 
        this.toastrService.warning('Maximum 4 products are in compare.'); // toasr services
    }
      return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = this.compareProduct.indexOf(product);
    this.compareProduct.splice(index, 1);
  }
   
}