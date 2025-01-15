import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import {
  UpdateDialogComponent,
  UpdateState,
} from 'src/app/dialogs/update-dialog/update-dialog.component';

@Directive({
  selector: '[appUpdate]',
})
export class UpdateDirective {
  @Input() controller: string;
  @Input() rowData: any;
  @Output() refreshTable: EventEmitter<any> = new EventEmitter<any>();

  private isDialogOpen = false;

  constructor(
    private httpClientService: HttpClientService,
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  handleClick(): void {
    if (this.isDialogOpen) return;

    this.openUpdateDialog((updatedData: any) => {
      this.sendUpdateRequest(updatedData);
    });
  }

  openUpdateDialog(afterClosed: (updatedData: any) => void): void {
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { ...this.rowData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isDialogOpen = false;
      if (result && result !== UpdateState.No) {
        afterClosed(result);
      }
    });
  }

  sendUpdateRequest(updatedData: any): void {
    this.httpClientService
      .Update({ controller: this.controller }, updatedData)
      .subscribe(
        (response) => {
          this.refreshTable.emit();
        },
        (error) => {}
      );
  }
}
