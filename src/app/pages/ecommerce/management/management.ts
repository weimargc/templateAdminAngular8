import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'management',
  templateUrl: './management.html',
  styleUrls: ['./management.scss'],
})
export class ManagementComponent implements OnInit {
  showAlert: boolean = false;

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) {}

  createNewProduct() {
    this.router.navigate(['/app/ecommerce/management/create']);
  }

  ngOnInit(): void {
    this.productsService.getProductsRequest();
    setTimeout(() => {
      this.showAlert = true;
    }, 100);
  }
}
