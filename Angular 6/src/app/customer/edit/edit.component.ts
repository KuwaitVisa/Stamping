import { Component, OnInit } from '@angular/core';
import { FormGroup,NgForm,FormControl } from "@angular/forms";

import { ActivatedRoute ,Router} from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CustomerService } from '../../shared/customer.service';
import { ICustomers } from '../../shared/ICustomers';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  customerForm: FormGroup;
  customer:ICustomers[];
  date = new FormControl(new Date());
  constructor(private customerService: CustomerService,private route: ActivatedRoute,private router: Router) {
    {
      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY' });
     }
    this.createForm();
  }
  createForm() {
    this.customerForm = new FormGroup({
      fullName: new FormControl(),
      passportnumber: new FormControl(),
      visaexpdate: new FormControl(),
      medicalexpdate: new FormControl(),
      receiveddate: new FormControl(),
      submissiondate: new FormControl(),
      deliverydate: new FormControl(),
      priority: new FormControl(),
      agentname: new FormControl(),
      status: new FormControl(),
      comments: new FormControl(),
    });
    }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const customerId = +params.get('id');
      console.log('Inside init '+customerId);
      if (customerId) {

        console.log('before call init '+customerId);
        this.getEmployee(customerId);
      }
    });
  }

  getEmployee(_id: number) {
    this.customerService.getEmployee(_id)
    .subscribe(
      res => {
        this.customer = res['customer'];
        console.log("Customer Details",this.customer)
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onSubmit(form: NgForm) {
    this.route.params.subscribe(params => {
      this.customerService.updateEmployee(this.customer,params['id']);
      this.router.navigate(['/customerList']);
   });
  }


}
