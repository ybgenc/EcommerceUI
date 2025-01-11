import { Directive, Renderer2, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private dialog: MatDialog 
  ) {
    const img = _renderer.createElement('img');
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller:string;
  @Output() refreshTable: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.Delete({
        controller:this.controller
      },this.id).subscribe();
      $(td.parentElement).fadeOut(1000, () => {
        this.refreshTable.emit();
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
