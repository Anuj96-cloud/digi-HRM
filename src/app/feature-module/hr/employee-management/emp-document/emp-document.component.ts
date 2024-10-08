import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';


export interface EmployeeDocument {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number; // Size in KB
  uploadDate: Date;
}
@Component({
  selector: 'app-emp-document',
  templateUrl: './emp-document.component.html',
  styleUrl: './emp-document.component.scss'
})
export class EmpDocumentComponent {
  public routes = routes;
  documents: EmployeeDocument[] = [];
  documentForm!: FormGroup;
  showModal: boolean = false;
  isEditMode: boolean = false;
  selectedDocument: EmployeeDocument | null = null;
  fileError: string | null = null;
  fileData: File | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDocuments();
  }

  initializeForm() {
    this.documentForm = this.fb.group({
      fileName: ['', Validators.required],
    });
  }

  loadDocuments() {
    this.documents = [
      {
        id: 1,
        fileName: 'Contract.pdf',
        fileType: 'application/pdf',
        fileSize: 120,
        uploadDate: new Date(),
      },
      {
        id: 2,
        fileName: 'IDCopy.jpg',
        fileType: 'image/jpeg',
        fileSize: 320,
        uploadDate: new Date(),
      },
    ];
  }

  openModal(mode: 'add' | 'edit', document?: EmployeeDocument) {
    this.showModal = true;
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && document) {
      this.selectedDocument = document;
      this.documentForm.patchValue({ fileName: document.fileName });
    } else {
      this.selectedDocument = null;
      this.documentForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
    this.fileError = null;
    this.fileData = null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 500; // 500KB

      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Invalid file type. Only PDF, JPG, and PNG are allowed.';
        this.fileData = null;
      } else if (file.size / 1024 > maxSize) {
        this.fileError = 'File size exceeds the 500KB limit.';
        this.fileData = null;
      } else {
        this.fileError = null;
        this.fileData = file;
      }
    }
  }

  addDocument() {
    if (this.documentForm.valid && this.fileData) {
      const newDocument: EmployeeDocument = {
        id: this.documents.length + 1,
        fileName: this.documentForm.value.fileName,
        fileType: this.fileData.type,
        fileSize: Math.round(this.fileData.size / 1024),
        uploadDate: new Date(),
      };
      this.documents.push(newDocument);
      this.closeModal();
    }
  }

  updateDocument() {
    if (this.documentForm.valid && this.selectedDocument && this.fileData) {
      Object.assign(this.selectedDocument, {
        fileName: this.documentForm.value.fileName,
        fileType: this.fileData.type,
        fileSize: Math.round(this.fileData.size / 1024),
        uploadDate: new Date(),
      });
      this.closeModal();
    }
  }

  deleteDocument(id: number) {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }

  downloadDocument(document: EmployeeDocument) {
    // Simulate download functionality
    alert(`Downloading ${document.fileName}`);
  }
}