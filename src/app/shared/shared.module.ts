import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaskModule } from 'ngx-mask';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import { LightboxModule } from 'ngx-lightbox';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastModule } from 'primeng/toast';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { AddDepartmentDialogComponent } from './dialogs/add-department-dialog/add-department-dialog.component';
import { LeaveDialogComponent } from './dialogs/leave-dialog/leave-dialog.component';
import { AddEmployeeDialogComponent } from './dialogs/add-employee-dialog/add-employee-dialog.component';
import { NgxColorsModule } from 'ngx-colors';
import { AddTaskGroupDialogComponent } from './dialogs/add-task-group-dialog/add-task-group-dialog.component';

import { RouterModule } from '@angular/router';
import { ShareProjectDialogComponent } from './dialogs/share-project-dialog/share-project-dialog.component';
import { EditorModule } from 'primeng/editor';
import { BreakDialogComponent } from './dialogs/break-dialog/break-dialog.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PreviewDialogComponent } from './dialogs/preview-dialog/preview-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddTaskDialogComponent } from './dialogs/add-task-dialog/add-task-dialog.component';
import { RolesAndPermissionsComponent } from '../feature-module/account/account-details/roles-and-permissions/roles-and-permissions.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    AddDepartmentDialogComponent,
    LeaveDialogComponent,
    AddEmployeeDialogComponent,
    AddTaskGroupDialogComponent,
    ShareProjectDialogComponent,
    BreakDialogComponent,
    PreviewDialogComponent,
    AddTaskDialogComponent,
    RolesAndPermissionsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }),
    NgxEditorModule,
    NgScrollbarModule,
    ClipboardModule,
    DragDropModule,
    ScrollingModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    LightboxModule,
    TooltipModule.forRoot(),
    NgChartsModule.forRoot(),
    NgApexchartsModule,
    CarouselModule,
    ToastModule,
    NgxDropzoneModule,
    MaterialModule,
    NgxColorsModule,
    RouterModule,
    EditorModule,
    NgxDocViewerModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    TimepickerModule,
    NgxMaskModule,
    NgScrollbarModule,
    ClipboardModule,
    DragDropModule,
    ScrollingModule,
    ToastrModule,
    LightboxModule,
    TooltipModule,
    NgChartsModule,
    NgApexchartsModule,
    NgxEditorModule,
    CarouselModule,
    ToastModule,
    NgxDropzoneModule,
    MaterialModule,
    NgxColorsModule,
    RouterModule,
    EditorModule,
    ShareProjectDialogComponent,
    RolesAndPermissionsComponent,
    AddTaskDialogComponent,
    NgxDocViewerModule,
    FullCalendarModule,
  ],

  providers: [BsDatepickerConfig, DatePipe],
})
export class SharedModule {}
