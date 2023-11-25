import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PrescriptionOrder } from 'src/app/interfaces/common/prescription-order';
import { Pagination } from 'src/app/interfaces/core/pagination';
// import { Order } from 'src/app/interfaces/common/order';
import { FilterData } from 'src/app/interfaces/core/filter-data';


const API_ORDER = environment.apiBaseLink + '/api/prescription-order/';
const API_ORDER_TEMP = environment.apiBaseLink + '/api/order-temporary/';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionOrderService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  /**
   * ORDER
   */
  placeOrder(data: PrescriptionOrder) {
    return this.httpClient.post<{ _id: string; orderId: any; message: string; success: boolean }>(API_ORDER + 'add-prescription-order-by-user', data);
  }

  confirmPrescriptionOrder(data: any) {
    return this.httpClient.post<{ _id: string; orderId: any; message: string; success: boolean }>(API_ORDER + 'confirm-prescription-order', data);
  }



  updateOrderSessionKey(tranId: string, sessionkey: string) {
    return this.httpClient.post<{ message: string }>(API_ORDER_TEMP + 'update-session-key/' + tranId + '/' + sessionkey, {});
  }



  getAllPrescriptionOrdersByUser(filter?:FilterData, searchQuery?:string) {
      let params = new HttpParams();
       if(searchQuery){
          params = params.append('q',searchQuery);
       }
       return this.httpClient.post<{data:PrescriptionOrder[],success:boolean,message:string}>(API_ORDER + 'get-all-prescription-orders-by-user',filter,{params})
  }

  deletePrescriptionByUser(id:string){
      return this.httpClient.delete(API_ORDER+'delete/'+id);
  }
}
