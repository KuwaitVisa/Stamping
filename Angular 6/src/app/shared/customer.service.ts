import { Injectable } from '@angular/core';


import { environment } from '../../environments/environment';
import { Customer } from './customer.model';
import { Agent } from './agent.model';
import { ICustomers } from './ICustomers';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  selectedCustomer: Customer = {
    _id:null,
    fullName: '',
    passportnumber: '',
    visaexpdate: '',
    medicalexpdate: '',
    receiveddate: '',
    submissiondate: '',
    deliverydate: '',
    priority: '',
    agentname: '',
    status: '',
    comments:''
  };

  selectedAgent: Agent = {
    _id:null,
    agentName: '',
    MobileNumber: '', 
    Address: '',
    normalRate:'',
    TatkalRate:''
  };
 
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  postCustomer(customer: Customer){
    console.log("customer service:"+customer);
    return this.http.post(environment.apiBaseUrl+'/customer',customer,this.noAuthHeader);
  }
  postAgent(agent: Agent){
    const obj = {
      agentName: agent.agentName,
      MobileNumber: agent.MobileNumber,
      normalRate: agent.normalRate,
      TatkalRate: agent.TatkalRate,
      Address: agent.Address
    };
    return this.http.post(environment.apiBaseUrl+'/agent', obj);
       
  }
    
 

  getCustomerList() {
    return this.http.get(environment.apiBaseUrl + '/customerList');
  }

  getAgentList() {
    return this.http.get(environment.apiBaseUrl + '/agentList');
  }

  getCustomers(): Observable<ICustomers[]> {
    return this.http.get<ICustomers[]>(environment.apiBaseUrl + '/customerList')
        .pipe(catchError(this.handleError));
}

getEmployee(_id: number): Observable<Customer> {
  console.log('Service:::::'+_id);
  return this.http.get<Customer>(`${environment.apiBaseUrl+'/customerById'}/${_id}`)
      .pipe(catchError(this.handleError));
}

updateEmployee(customer, id) {

  const obj = {
    fullName: customer.fullName,
    passportnumber: customer.passportnumber,
    submissiondate: customer.submissiondate,
    deliverydate: customer.deliverydate,
    agentname: customer.agentname
  };
  this
    .http
    .post(`${environment.apiBaseUrl+'/update'}/${id}`, obj)
    .subscribe(res => console.log('Done'));
}

delete(id) {
  return this
            .http
            .get(`${environment.apiBaseUrl+'/delete'}/${id}`);
}
private handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
  } else {
      console.error('Server Side Error :', errorResponse);
  }
  return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}
}
