import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup,NgForm,FormBuilder,Validators } from '@angular/forms';
import { ICustomers } from '../../shared/ICustomers';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerDetails:ICustomers;
  serverErrorMessages: string;
  
  constructor(private customerService: CustomerService,private fb: FormBuilder) { }
  
  ngOnInit() {

    this.customerForm = this.fb.group({
      cname: ['', Validators.required ],
      enterYour: ['', Validators.required ]
   });
  }

  search(form: NgForm): void {
 
    this.customerService.search(form.value.cname , form.value.enterYour).subscribe(
      res => {
        this.customerDetails = (res['customer']);
        
        console.log("Customer Details",this.customerDetails);
        this.customerForm.reset();
        this.serverErrorMessages = '';
      },
      err => { 
        console.log(err);
         this.serverErrorMessages = "customer record not found";
         
         
      }
    );

  }


}
