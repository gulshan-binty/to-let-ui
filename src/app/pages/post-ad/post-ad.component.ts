import { Component, ViewChild } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/common/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss']
})
export class PostAdComponent {

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) {

  }

}
