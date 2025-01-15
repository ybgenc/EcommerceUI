import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  AlertType,
  Position,
} from '../../admin/alertify.service';
import {
  ToasterAlertType,
  ToasterCustomService,
  ToasterPosition,
} from '../../ui/toaster-custom.service';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private toasterCustomService: ToasterCustomService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner : NgxSpinnerService
  ) {}

  @Input() options: Partial<FileUploadOptions>;

  ngOnInit(): void {}

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show()
        this.httpClientService
          .Create(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              header: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            () => { this.spinner.hide()
              if (this.options.isAdminPage) {
                this.alertifyService.message('Files uploaded successfully', {
                  alertType: AlertType.Success,
                  position: Position.TopRight,
                  dismissOther: true,
                });
              } else {
                this.toasterCustomService.message(
                  'Files uploaded successfully',
                  'Success',
                  {
                    toasterAlertType: ToasterAlertType.Success,
                    position: ToasterPosition.TopRight,
                  }
                );
              }
            }, 
            (errorResponse: HttpErrorResponse) => {
              this.spinner.hide()
              if (this.options.isAdminPage) {
                this.alertifyService.message(
                  'An error occurred while uploading the files.',
                  {
                    alertType: AlertType.Error,
                    position: Position.TopRight,
                    dismissOther: true,
                  }
                );
              } else {
                this.toasterCustomService.message(
                  'An error occurred while uploading the files.',
                  'Error',
                  {
                    toasterAlertType: ToasterAlertType.Error,
                    position: ToasterPosition.TopRight,
                  }
                );
              } 
            }
          );
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  description?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
