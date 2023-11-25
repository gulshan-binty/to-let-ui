import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Product, ProductFilterGroup} from '../../interfaces/common/product.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_PRODUCT = environment.apiBaseLink + '/api/product/';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addProduct
   * insertManyProduct
   * getAllProducts
   * getProductById
   * updateProductById
   * updateMultipleProductById
   * deleteProductById
   * deleteMultipleProductById
   */

  addProduct(data: Product) {
    return this.httpClient.post<ResponsePayload>
    (API_PRODUCT + 'add-by-user', data);
  }


  getAllProducts(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Product[],filterGroup: ProductFilterGroup, count: number, success: boolean }>(API_PRODUCT + 'get-all', filterData, {params});
  }

  addProductByUser(data: Product) {
    return this.httpClient.post<ResponsePayload>
    (API_PRODUCT + 'add-by-user', data);
  }

  getAllProductsByUser(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Product[], count: number, success: boolean }>(API_PRODUCT + 'get-all-by-user', filterData, {params});
  }


  getProductById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Product, message: string, success: boolean }>(API_PRODUCT + id, {params});
  }

  getProductBySlug(slug: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Product, message: string, success: boolean }>(API_PRODUCT+'slug/' + slug, {params});
  }

  updateProductByUser(id: string, data: Product) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_PRODUCT + 'update-by-user/' + id, data);
  }

  updateUserProductById(id: string, data: Product) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_PRODUCT + 'update-by-user/' + id, data);
  }

  deleteProductByUserId(id: string) {
    return this.httpClient.delete<ResponsePayload>(API_PRODUCT + 'delete-by-user/' + id);
  }




}
