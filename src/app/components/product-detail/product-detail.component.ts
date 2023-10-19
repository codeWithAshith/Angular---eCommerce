import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private id: number = 0;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id')!);
      let products: Product[] = productService.getLocalProducts();
      this.product = products.find((p) => p.id === this.id)!;
    });
  }
}
