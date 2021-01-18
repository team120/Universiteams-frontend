import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseUrl = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    const url = `${this.baseUrl}/users`
    return this.httpClient.get<User[]>(url)
  }

  getUser(id: Number){
    const url = `${this.baseUrl}/users/${id}`
    return this.httpClient.get<User>(url)
  }
}
