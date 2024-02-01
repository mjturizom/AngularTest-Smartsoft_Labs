import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {merge, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Amiibo, ApiResponse } from "src/app/interfaces/dataList.interface";
import { ApiService } from "src/app/services/api/api.service";


@Component({
  selector: "app-data-list",
  templateUrl: "./data-list.component.html",
  styleUrls: ["./data-list.component.css"],
})
export class DataListComponent implements AfterViewInit {
  displayedColumns: string[] = [ "head", "name", "character", "gameSeries", "type", "actions"];
  dataSource!: MatTableDataSource<Amiibo>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private apiService: ApiService) {
    this.apiService.getRepoIssues().subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
    .pipe(startWith({}),
    switchMap(() => {
      this.isLoadingResults = true;
      return this.apiService.getRepoIssues()
                  .pipe(catchError(() => observableOf(null)));
    }),
    map(data => {
      this.isLoadingResults = false;
      this.isRateLimitReached = data?.amiibo === null;

      if (data?.amiibo === null) {
        return [];
      }

      this.resultsLength = data?.amiibo.length || 0;
      return data?.amiibo;
    }),
  ).subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  )
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit( element: Amiibo ){
    console.log(element)
   }

  onDelete( element: Amiibo ){
   console.log(element)
  }
}
