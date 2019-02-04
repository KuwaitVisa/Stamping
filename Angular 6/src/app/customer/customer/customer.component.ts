import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  constructor() { }

  ngOnInit() {

    this.customerForm = new FormGroup({
      fullName: new FormControl(),
      
      enterYour: new FormControl()
    });
  }

  onSubmit(): void {
    console.log(this.customerForm.value);
  }

}
