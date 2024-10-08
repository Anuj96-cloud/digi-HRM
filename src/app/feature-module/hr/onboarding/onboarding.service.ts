import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  private apiUrl ='https://your-api-url.com/schedule-appointment';

  private apiUrlemployee ='https://your-api-url.com/schedule-employee';

  constructor(private http: HttpClient) { }
  
  scheduleAppointment(appointmentData: any){
    return this.http.get(this.apiUrl, appointmentData)
  }
  scheduleEmployee(employeeData: any){
    return this.http.get(this.apiUrlemployee, employeeData)
  }
}
