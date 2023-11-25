import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { AddCustomer } from '../../models/add-customer.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css',
})
export class UpdateCustomerComponent {
  form!: FormGroup;
  model!: AddCustomer;
  customerId!: number;
  customer!: Customer | any;

  constructor(
    private customerservice: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.model = {
      name: '',
    };
  }
  ngOnInit() {
    // Retrieve the customer ID from the route parameters
    this.route.params.subscribe((params) => {
      this.customerId = params['id']; // 'id' should match the parameter name in the route
    });
  }

  saveCustomer(customerForm: any) {
    debugger;
    this.customer = customerForm.value;
    if (this.customer.name != '') {
      this.customerservice
        .updateCustomer(this.customerId, this.customer)
        .subscribe({
          next: (response) => {
            console.log('Customer Update successfully:', response);

            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error creating customer:', error);
          },
        });
    } else {
      alert('Please add customer name');
    }
  }
}
