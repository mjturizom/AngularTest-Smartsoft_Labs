import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Amiibo } from 'src/app/interfaces/dataList.interface';
@Component({
  selector: 'app-add-data-modal',
  templateUrl: './add-data-modal.component.html',
  styleUrls: ['./add-data-modal.component.css']
})
export class AddDataModalComponent {
  formkeys: any[]; 

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
    public dialogRef: MatDialogRef<AddDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Amiibo>,
  ) {
    this.formkeys = Object.keys(this.form.value)
    
  }

  

  onSubmit(): void {
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
    
  }

  
}
