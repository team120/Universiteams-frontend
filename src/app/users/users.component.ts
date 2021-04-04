import { LocalStorageService } from "../service/local-storage/local-storage.service";
import { User } from "../model/user/user";
import { UsersService } from "../service/users/users.service";

import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users = new MatTableDataSource<User>();
  columnsToDisplay = ["user", "requestActions"]
  filterRequestsAlreadyApplied = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private usersService: UsersService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const token = this.storageService.getTokenInStorage();
    if (token == null) {
      throw Error("No Token");
    }
    console.log(token);
    this.usersService.getUsers(token!).subscribe((response: User[]) => {
      this.users.data = response;
    });
  }

  ngAfterViewInit(): void {
    this.users.paginator = this.paginator
    this.users.sort = this.sort
  }

  filter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value
    this.users.filter = inputValue.trim().toLowerCase()
  }

  searchValid() {
    return this.users.filter == "";
  }

  toggleFilterRequests() {
    if (!this.filterRequestsAlreadyApplied) {
      this.users.filter = "true"
      this.filterRequestsAlreadyApplied = true
    } else {
      this.users.filter = ""
      this.filterRequestsAlreadyApplied = false
    }
  }
}
