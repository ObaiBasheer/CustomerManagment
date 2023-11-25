import { Component } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    CustomerListComponent,
    HttpClientModule,
    NgFor,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
})
export class AppComponent {
  title = 'Customer Managment';
}
