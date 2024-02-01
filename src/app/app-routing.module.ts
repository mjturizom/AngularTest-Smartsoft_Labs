import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guard/auth.guard";
import { UploadComponent } from "./components/csv-upload/csv-upload.component";
import { DataListComponent } from "./components/data-list/data-list.component";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "upload-csv",
    component: UploadComponent,
    // loadComponent: () =>
    //   import("./components/csv-upload/csv-upload.component").then(
    //     (c) => c.UploadComponent
    //   ),
    canActivate: [AuthGuard],
  },
  {
    path: "data-list",
    component: DataListComponent,
    // loadComponent: () =>
    //   import("./components/data-list/data-list.component").then(
    //     (c) => c.DataListComponent
    //   ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
