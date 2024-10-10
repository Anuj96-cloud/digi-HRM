import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { apiResultFormat, getLeaveReport, routes } from 'src/app/core/core.index';

interface LeaveApproval {
  employeeName: string;
  department: string;
  leaveType: string;
  noOfDays: number;
  status: string;
  comments: string;
  approver: string;
  img: string; // For the employee profile image
}

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss']
})
export class LeaveApprovalComponent implements OnInit {
  leaveApprovalData: LeaveApproval[] = [
    {
      employeeName: 'John Doe',
      department: 'Development',
      leaveType: 'Sick Leave',
      noOfDays: 3,
      status: 'Pending',
      comments: '',
      approver: '',
      img: 'assets/img/profiles/avatar-01.jpg'
    },
    {
      employeeName: 'Jane Smith',
      department: 'Designing',
      leaveType: 'Emergency Leave',
      noOfDays: 2,
      status: 'Pending',
      comments: '',
      approver: '',
      img: 'assets/img/profiles/avatar-02.jpg'
    }
    // Add more data as needed
  ];
  selected1 = 'option1';
  public lstleavereport: Array<getLeaveReport> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getLeaveReport>;
  public routes = routes;
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  
  // Modal related variables
  modalAction: 'approve' | 'reject' = 'approve'; // Action type for the modal
  selectedLeave!: LeaveApproval; // The leave request being approved/rejected
  showModal: boolean = false; // Flag to show/hide the modal

  constructor() {}

  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.lstleavereport = [];
    this.serialNumberArray = [];

    // Simulated API call; replace with actual API call logic
    this.dataSource = new MatTableDataSource<getLeaveReport>(this.lstleavereport);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  public sortData(sort: Sort) {
    const data = this.lstleavereport.slice();
    if (!sort.active || sort.direction === '') {
      this.lstleavereport = data;
    } else {
      this.lstleavereport = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstleavereport = this.dataSource.filteredData;
  }
  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }
  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public openModal(action: 'approve' | 'reject', leave: LeaveApproval): void {
    this.modalAction = action;
    this.selectedLeave = leave;
    this.showModal = false; // Show modal
  }

  public confirmAction(): void {
    if (this.modalAction === 'approve') {
      this.approveLeave(this.selectedLeave);
    } else {
      this.rejectLeave(this.selectedLeave);
    }
    this.showModal = false; // Hide modal after action
  }

  public approveLeave(leave: LeaveApproval) {
    leave.status = 'Approved';
    leave.approver = 'HR Manager'; // Example approver; this can be dynamic
    leave.comments = prompt("Enter approval comments (optional):") || '';
  }

  public rejectLeave(leave: LeaveApproval) {
    leave.status = 'Rejected';
    leave.approver = 'HR Manager'; // Example approver; this can be dynamic
    leave.comments = prompt("Enter rejection comments (optional):") || '';
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
}

export interface pageSelection {
  skip: number;
  limit: number;
}
