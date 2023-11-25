import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Otp} from '../../interfaces/common/otp.interface';

const API_URL = environment.apiBaseLink + '/api/otp/';


@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * generateOtpWithPhoneNo()
   * validateOtpWithPhoneNo()
   */

  generateOtpWithPhoneNo(phoneNo) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'generate-otp', {phoneNo});
  }

  validateOtpWithPhoneNo(data: { phoneNo: string, code: string }) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'validate-otp', data);
  }


}
