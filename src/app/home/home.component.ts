import { Component, OnInit } from '@angular/core';

import { User } from "../models/user";
import { UserService } from "../user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User;

  constructor(private userService: UserService) {
    this.user = this.userService.userValue;
   }
}
