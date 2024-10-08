import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpManagementService {
  
   getEmployee() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

 
  getEmployees(): Observable<any> {
    return this.http.get('/api/employees');
  }

  
  addEmployee(employee: any): Observable<any> {
    return this.http.post('/api/employees', employee);
  }

 
  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`/api/employees/${employee.id}`, employee);
  }

  
  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`/api/employees/${employeeId}`);
  }
 

}
