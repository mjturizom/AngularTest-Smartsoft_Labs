import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guard/auth.guard";
import { UploadComponent } from "./components/csv-upload/csv-upload.component";
import { DataListComponent } from "./components/data-list/data-list.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'data-list', pathMatch: 'full' },
      {
        path: "upload-csv",
        component: UploadComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "data-list",
        component: DataListComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
