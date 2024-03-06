import {Component, Input, OnInit, Output, EventEmitter, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {DOCUMENT} from "@angular/common";
import {AuthService} from "../../../authenticate/services/auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss']
})
export class HeaderComponent  implements OnInit {


  firsname: string = "";
  lastname: string = "";

  auth!: any;




  constructor( private router:Router,
               private modalService:NgbModal,
               private authService: AuthService,
               @Inject(DOCUMENT) private document: any,
               ) {

  }




  async ngOnInit() {



  }

  logout() {
    this.authService.logOut();
  }






}
