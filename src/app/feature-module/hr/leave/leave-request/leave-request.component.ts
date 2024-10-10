import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { apiResultFormat, getLeaveReport, routes } from 'src/app/core/core.index';
import { LeaveServiceService } from '../leave-service.service';
export interface LeaveApproval {
  employeeName: string;
  department: string;
  leaveType: string;
  noOfDays: number;
  status: string;
  comments: string;
  approver: string;
}

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent {
  leaveApprovalData: LeaveApproval[] = [
    {
      employeeName: 'John Doe',
      department: 'Development',
      leaveType: 'Sick Leave',
      noOfDays: 3,
      status: 'Pending',
      comments: '',
      approver: '',
 
    },
    {
      employeeName: 'Jane Smith',
      department: 'Designing',
      leaveType: 'Emergency Leave',
      noOfDays: 2,
      status: 'Pending',
      comments: '',
      approver: '',
 
    }
    // Add more data as needed
  ];
  selected1 = 'option1';
  public lstleavereport: Array<getLeaveReport> = [];
 
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
  
 
  
  departments: string[] = [];
  leaveStatuses: string[] = ['Pending', 'Approved', 'Rejected'];
  selectedDepartment: string = '';
  selectedLeaveStatus: string = '';
  searchDataValue: string = '';
  showModal: boolean = false;
  modalAction: 'approve' | 'reject' = 'approve';
  selectedLeave: any;
  fromDate: any;
  toDate: any;
   
  constructor(private leaveRquestService: LeaveServiceService ) {}

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

  

  getLeaveApprovalData(): void {
    this.leaveRquestService.getLeaveApprovals().subscribe(data => {
      this.leaveApprovalData = data;
      this.totalData = data.length;
      this.updatePageNumbers();
    });
  }

  updatePageNumbers(): void {
    this.pageNumberArray = Array.from({ length: Math.ceil(this.totalData / this.pageSize) }, (v, i) => i + 1);
    this.serialNumberArray = Array.from({ length: Math.min(this.pageSize, this.totalData) }, (v, i) => (this.currentPage - 1) * this.pageSize + i + 1);
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
    this.getLeaveApprovalData();
    this.getTableData();
  }
  applyFilters(): void {
    // Implement filter logic here
    // For now, you might just want to re-fetch the data with the current filters applied.
    this.getLeaveApprovalData(); // Adjust as needed based on actual filter logic
  }

  
  openModal(action: 'approve' | 'reject', leave: any): void {
    this.modalAction = action;
    this.selectedLeave = leave;
    this.showModal = true;
  }

  confirmAction(): void {
    if (this.modalAction === 'approve') {
      this.approveLeave(this.selectedLeave.id); // Assuming 'id' is the identifier for leave requests
    } else {
      this.rejectLeave(this.selectedLeave.id);
    }
    this.showModal = false; // Close modal after action
  }

  approveLeave(leaveId: number): void {
    this.leaveRquestService.approveLeave(leaveId).subscribe(() => {
      // Optionally refetch or update the leaveApprovalData to reflect changes
      this.getLeaveApprovalData();
      console.log(`Leave approved for ID ${leaveId}`);
    });
  }

  rejectLeave(leaveId: number): void {
    this.leaveRquestService.rejectLeave(leaveId).subscribe(() => {
      // Optionally refetch or update the leaveApprovalData to reflect changes
      this.getLeaveApprovalData();
      console.log(`Leave rejected for ID ${leaveId}`);
    });
  }

  filterData(): void {
    // Implement filtering logic based on selected criteria
  }
}

export interface pageSelection {
  skip: number;
  limit: number;
}

