import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "../local-storage.service";
import { User } from "../model/auth/user";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const token = this.storageService.getTokenInStorage();
    if (token == null) {
      throw Error("No Token");
    }
    this.usersService.getUsers(token!).subscribe((response: User[]) => {
      this.users = response;
    });
  }
}
