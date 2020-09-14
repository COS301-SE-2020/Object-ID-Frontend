import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { features } from "process";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  //------------------asset varables---------------------------
  obLogo: string = "../assets/img/objectIDlogo.png";

  ngOnInit(): void {}

  logout() {
    this.api.removeToken();
    this.router.navigate([""]);
  }
}
