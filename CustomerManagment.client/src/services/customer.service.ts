import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../environments/environment';
import { AddCustomer } from '../models/add-customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/customers/${id}`;
    return this.http.get<Customer>(url);
  }

  createCustomer(customer: AddCustomer): Observable<Customer> {
    const url = `${this.apiUrl}/customers/CreateCustomer`;
    return this.http.post<Customer>(url, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<void> {
    const url = `${this.apiUrl}/customers/UpdateCustomer/${id}`;
    return this.http.put<void>(url, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    const url = `${this.apiUrl}/customers/${id}`;
    return this.http.delete<void>(url);
  }
}
