import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}
@Component({
  selector: 'app-remove-data-modal',
  templateUrl: './remove-data-modal.component.html',
  styleUrls: ['./remove-data-modal.component.css']
})
export class RemoveDataModalComponent {

  constructor(
    public dialogRef: MatDialogRef<RemoveDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}
