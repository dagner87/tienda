import { Component, OnInit } from '@angular/core';
import { Product } from '../../../classes/product';
import { WishlistService } from '../../../services/wishlist.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  
  ngOnInit() { }

}
