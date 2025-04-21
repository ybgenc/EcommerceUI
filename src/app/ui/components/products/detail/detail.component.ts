import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseStorageUrl } from 'src/app/contract/BaseStorageUrl';
import { Add_Basket_Item } from 'src/app/contract/basket/add-basket-item';
import { Product_Detail } from 'src/app/contract/product/product_detail';
import { AlertType, Position } from 'src/app/services/admin/alertify.service';
import { BaseUrlService } from 'src/app/services/common/models/base-url.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ToasterAlertType, ToasterCustomService, ToasterPosition } from 'src/app/services/ui/toaster-custom.service';

interface ProductResponse {
  product: Product_Detail & {
    productImageFiles: Array<{
      id: string;
      fileName: string;
      path: string;
      storage: string;
      showCase: boolean;
      createdDate: string;
      updatedDate: string;
    }>;
  };
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product: Product_Detail & {
    productImageFiles?: Array<{
      id: string;
      fileName: string;
      path: string;
      storage: string;
      showCase: boolean;
      createdDate: string;
      updatedDate: string;
    }>;
  };
  isLoading: boolean = true;
  errorMessage: string = '';
  showcaseImage: string = '';
  baseStorageUrl: BaseStorageUrl;
  currentImageIndex: number = 0;
  sliderInterval: any;
  autoSlideInterval: number = 5000;
  isAutoSliding: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private baseUrlService: BaseUrlService,
    private basketService: BasketService,
    private toasterService: ToasterCustomService
  ) { }

  async ngOnInit() {
    this.baseStorageUrl = await this.baseUrlService.getBaseStorageUrl();
    await this.loadProduct();
    this.initSlider();
  }

  initSlider(): void {
    if (this.product?.productImageFiles?.length > 0) {
      this.showcaseImage = this.product.productImageFiles[0].path;
      this.currentImageIndex = 0;
    }
  }

  async loadProduct(): Promise<void> {
    try {
      this.isLoading = true;
      const productId = this.route.snapshot.paramMap.get('id');

      if (!productId) {
        throw new Error('Product ID is required');
      }

      const response = await this.productService.getProduct(productId) as unknown as ProductResponse;

      this.product = response.product;

      if (this.product.productImageFiles && this.product.productImageFiles.length > 0) {
        const showcase = this.product.productImageFiles.find(img => img.showCase);
        this.showcaseImage = showcase ? showcase.path : this.product.productImageFiles[0].path;
      }

    } catch (error) {
      console.error('Error loading product:', error);
      this.errorMessage = 'Failed to load product details. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getImagePath(path: string): string {
    return path.replace(/\\/g, '/');
  }


  goToSlide(index: number): void {
    if (this.product?.productImageFiles && this.product.productImageFiles.length > 0) {
      if (index < 0) {
        index = this.product.productImageFiles.length - 1;
      } else if (index >= this.product.productImageFiles.length) {
        index = 0;
      }

      this.currentImageIndex = index;
      this.showcaseImage = this.product.productImageFiles[index].path;
    }
  }

  prevSlide(): void {
    this.goToSlide(this.currentImageIndex - 1);
  }

  nextSlide(): void {
    this.goToSlide(this.currentImageIndex + 1);

  }


  addItemToBasket(Quantity: number) {
    const productId = this.route.snapshot.paramMap.get('id');
    const item: Add_Basket_Item = {
      ProductId: productId,
      Quantity: Quantity
    };

    this.basketService.addItemToBasket(item)
      .then(() => {
        this.toasterService.message("Success", "The product has been successfully added to your basket.", {
          toasterAlertType: ToasterAlertType.Success,
          position: ToasterPosition.TopRight
        });
      })
      .catch((error) => {
        this.toasterService.message("Error", "There was an issue while adding the product to your basket. Please try again later.", {
          toasterAlertType: ToasterAlertType.Error,
          position: ToasterPosition.TopRight
        });
      });
  }

}
