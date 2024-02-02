import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Amiibo, } from 'src/app/interfaces/dataList.interface';

@Component({
  selector: 'app-edit-data-modal',
  templateUrl: './edit-data-modal.component.html',
  styleUrls: ['./edit-data-modal.component.css']
})
export class EditDataModalComponent {

  form = new FormGroup({
    amiiboSeries: new FormControl('', [Validators.required]),
    character: new FormControl('', [Validators.required]),
    gameSeries: new FormControl('', [Validators.required]),
    head: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    tail: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<EditDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Amiibo,
  ) {
    this.form.setValue({ ...data })
  }
  onSubmit(){
    this.dialogRef.close(this.form.value);
  }
}
