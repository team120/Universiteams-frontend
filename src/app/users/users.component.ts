import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LocalStorageService } from "../local-storage.service";
import { User } from "../model/auth/user";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users = new MatTableDataSource<User>();
  columnsToDisplay = ["name", "lastName", "mail", "requestActions"]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private usersService: UsersService,
    private storageService: LocalStorageService
  ) {}

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
}
