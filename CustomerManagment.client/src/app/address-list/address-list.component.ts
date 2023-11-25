import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/address.model';
import { AddresssService } from '../../services/address.service';
import { Subscription, interval } from 'rxjs';
import { AddressCustomer } from '../../models/AddressCustomer.model';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css',
})
export class AddressListComponent {
  address: Address[] = [];
  addressWithCustomer: AddressCustomer[] = [];
  data: any;
  private refreshSubscription!: Subscription;
  constructor(
    private client: HttpClient,
    private addressService: AddresssService
  ) {}

  ngOnInit(): void {
    this.loadAddress();

    // Set up an interval to periodically refresh data
    this.refreshSubscription = interval(60000) // Refresh every 5 seconds (adjust as needed)
      .subscribe(() => this.refreshData());
  }

  ngOnDestroy() {
    // Unsubscribe from the interval when the component is destroyed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  loadAddress() {
    this.addressService.getAddress().subscribe({
      next: (val) => {
        this.addressWithCustomer = val;
      },
      error: (error) => {
        console.error('Error loading customers', error);
      },
    });
  }

  refreshData() {
    this.addressService.getAddress().subscribe((newData) => {
      this.data = newData;
    });
  }
}
