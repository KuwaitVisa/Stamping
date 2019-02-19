import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { ICustomers } from '../../shared/ICustomers';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerDetails:ICustomers[];
  constructor(private customerService: CustomerService,private fb: FormBuilder) { }

  ngOnInit() {

    this.customerForm = this.fb.group({
      fullName: ['', Validators.required ],
      enterYour: ['', Validators.required ]
   });
  }

  search(fullName , enterYour): void {
    
    console.log("fullName"+fullName);
    console.log("enterYour"+enterYour);
    this.customerService.search(fullName , enterYour).subscribe(
      res => {
        this.customerDetails = res['customer'];
        
        console.log("Customer Details",this.customerDetails)
      },
      err => { 
        console.log(err);
        
      }
    );

  }


}
