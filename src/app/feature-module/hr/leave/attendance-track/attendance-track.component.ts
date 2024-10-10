import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/core/services/local/local.service';
import { Sort } from '@angular/material/sort';
import { DataService, apiResultFormat, getPolicies, routes } from 'src/app/core/core.index';

interface AttendanceRecord {
  employeeName: string;
  date: string;
  status: string;
}


@Component({
  selector: 'app-attendance-track',
  templateUrl: './attendance-track.component.html',
  styleUrl: './attendance-track.component.scss'
})
export class AttendanceTrackComponent implements OnInit {
  public allDocument: Array<getPolicies> = [];
  public routes = routes;
  attendanceForm!: FormGroup;
  attendanceRecords: AttendanceRecord[] = [];
  editMode: boolean = false;
  editIndex: number | null = null;
  dataSource!: MatTableDataSource<getPolicies>;
  // pagination variables
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
  role! : number;
  constructor(private fb: FormBuilder,private data: DataService,
    private formBuilder: FormBuilder,) {
    // Initialize the attendance form
    this.attendanceForm = this.fb.group({
      employeeName: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialize with some mock data
    this.attendanceRecords = [
      { employeeName: 'John Doe', date: '2024-09-10', status: 'Present' },
      { employeeName: 'Jane Smith', date: '2024-09-11', status: 'Absent' },
    ];
  }

  // Add or Update Attendance
  onSubmit() {
    if (this.attendanceForm.valid) {
      const newRecord: AttendanceRecord = this.attendanceForm.value;
      if (this.editMode && this.editIndex !== null) {
        this.attendanceRecords[this.editIndex] = newRecord; // Update existing record
      } else {
        this.attendanceRecords.push(newRecord); // Add new record
      }
      this.attendanceForm.reset();
      this.editMode = false;
      this.editIndex = null;
    }
  }

  // Open Edit Modal
  openEditModal(record: AttendanceRecord, index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.attendanceForm.patchValue(record); // Load record data into the form
  }

  // Save Attendance Changes
  saveAttendanceChanges() {
    this.onSubmit(); // Call onSubmit to save changes
  }

  // Close Edit Modal
  closeEditModal() {
    this.editMode = false;
    this.editIndex = null;
    this.attendanceForm.reset(); // Clear the form
  }

  // Delete Attendance Record
  deleteRecord(index: number) {
    this.attendanceRecords.splice(index, 1);
  }

//   selectedDocument: any = {};
// // Method to open edit modal and populate the form
// public populateEditForm(document: any): void {
//   this.selectedDocument = document; 
//   this.editEmployeeForm.patchValue({
//     client: document.type,
//     status: document.status,
//     file: document.file
//   });
// }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  private getTableData(): void {
    this.allDocument = [];
    this.serialNumberArray = [];

    this.data.getPolicies().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getPolicies, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allDocument.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getPolicies>(this.allDocument);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
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

public sortData(sort: Sort) {
  const data = this.allDocument.slice();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (!sort.active || sort.direction === '') {
    this.allDocument = data;
  } else {
    this.allDocument = data.sort((a: any, b: any) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }
}
public searchData(value: string): void {
  this.dataSource.filter = value.trim().toLowerCase();
  this.allDocument = this.dataSource.filteredData;
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
}
export interface pageSelection {
  skip: number;
  limit: number;
}
