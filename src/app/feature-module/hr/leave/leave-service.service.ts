import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {
  private apiUrl = 'https://api.example.com/leave-approvals'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch leave approval data
  getLeaveApprovals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Approve a leave request
  approveLeave(leaveId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/approve`, { leaveId });
  }

  // Reject a leave request
  rejectLeave(leaveId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reject`, { leaveId });
  }
}
