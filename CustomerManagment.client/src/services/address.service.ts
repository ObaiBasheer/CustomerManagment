import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Address } from '../models/address.model';
import { AddCustomerComponent } from '../app/add-customer/add-customer.component';
import { AddressCustomer } from '../models/AddressCustomer.model';

@Injectable({
  providedIn: 'root',
})
export class AddresssService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAddress(): Observable<AddressCustomer[]> {
    return this.http.get<AddressCustomer[]>(`${this.apiUrl}/Addresss`);
  }

  getAddressById(id: number): Observable<Address> {
    const url = `${this.apiUrl}/Addresss/${id}`;
    return this.http.get<Address>(url);
  }

  getAddressByCustomerId(id: number): Observable<Address[]> {
    const url = `${this.apiUrl}/Addresss/GetAddressByCustomerId/${id}`;
    return this.http.get<Address[]>(url);
  }
}
