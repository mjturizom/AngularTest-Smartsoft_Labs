import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { UploadComponent } from './components/csv-upload/csv-upload.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { AddDataModalComponent } from './components/modals/add-data-modal/add-data-modal.component';
import { RemoveDataModalComponent } from './components/modals/remove-data-modal/remove-data-modal.component';
import { EditDataModalComponent } from './components/modals/edit-data-modal/edit-data-modal.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DataListComponent,
    AddDataModalComponent,
    RemoveDataModalComponent,
    EditDataModalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
