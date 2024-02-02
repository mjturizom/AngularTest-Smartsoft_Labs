import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Amiibo } from "src/app/interfaces/dataList.interface";
import { ApiService } from "src/app/services/api/api.service";
import { AddDataModalComponent } from "../modals/add-data-modal/add-data-modal.component";
import { RemoveDataModalComponent } from "../modals/remove-data-modal/remove-data-modal.component";
import { EditDataModalComponent } from "../modals/edit-data-modal/edit-data-modal.component";

@Component({
  selector: "app-data-list",
  templateUrl: "./data-list.component.html",
  styleUrls: ["./data-list.component.css"],
})
export class DataListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "head",
    "name",
    "character",
    "gameSeries",
    "type",
    "actions",
  ];
  dataSource!: MatTableDataSource<Amiibo>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService
            .getRepoIssues()
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data?.amiibo === null;

          if (data?.amiibo === null) {
            return [];
          }

          this.resultsLength = data?.amiibo.length || 0;
          return data?.amiibo;
        })
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element: Amiibo) {
    const { name, character, amiiboSeries, gameSeries, head, tail, type } =
      element;
    const dialogRef = this.dialog.open(EditDataModalComponent, {
      data: {
        name,
        character,
        amiiboSeries,
        gameSeries,
        head,
        tail,
        type,
      },
    });
    dialogRef.afterClosed().subscribe((result: Amiibo) => {
      if (result) {
        this.isLoadingResults = true;
        element = { ...element, ...result };
        this.dataSource.data = this.dataSource.data.map((amiibo) => {
          if (amiibo.head === element.head) {
            return { ...element, ...result };
          }
          return amiibo;
        });
        this.isLoadingResults = false;
      }
    });
  }

  onDelete(element: Amiibo) {
    const dialogRef = this.dialog.open(RemoveDataModalComponent, {
      data: { name: element.name },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoadingResults = true;
        const dataFiltered = this.dataSource.data.filter(
          (amiibo) => amiibo.head !== element.head
        );
        this.dataSource = new MatTableDataSource(dataFiltered);
        this.isLoadingResults = false;
      }
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddDataModalComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("The dialog was closed", result);
    });
  }
}
