import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { features } from "process";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public Cameraform: FormGroup;
  public Logoform: FormGroup;
  public Nameform: FormGroup;

  message = null;
  cam: any;
  fileData: File = null;
  lat: any;
  long: any;
  logo: any;
  name: any;
  key: any;
  answer: any;
  imgURL: any;
  searchButtonText = "Submit";
  img: any;
  type: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.Cameraform = this.fb.group({
      cam: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      lat: [
        null,
        {
          validators: [],
        },
      ],
      long: [
        null,
        {
          validators: [],
        },
      ],
    });
    this.Logoform = this.fb.group({
      logo: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
    this.Nameform = this.fb.group({
      name: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  //------------------asset varables---------------------------
  obLogo: string = "../assets/img/objectIDlogo.png";

  ngOnInit(): void {
    this.api.getLogo().subscribe((data) => {
      this.img = data;
      console.log(this.img);
    });
  }

  //------------------modals---------------------------

  open(content, sizeOfContent) {
    this.clearVariables();

    this.modalService.open(content, {
      size: sizeOfContent,
      ariaLabelledBy: "modal-basic-title",
    });
  }

  clearVariables() {
    this.cam = null;
    this.long = null;
    this.lat = null;
    this.name = null;
    this.logo = null;
  }

  addCam() {
    this.api
      .addCam(
        this.Cameraform.value.cam,
        this.Cameraform.value.lat,
        this.Cameraform.value.long
      )
      .subscribe((data) => {
        this.key = data["payload"].unique_key;
        console.log(this.key);
      });
  }

  editName() {
    this.type = false;
    this.api.setName(this.Nameform.value.name).subscribe((data) => {
      this.answer = data;
      console.log(this.answer);
      if (data["success"] == true) {
        this.type = true;
        this.message = "Name was successfully updated";
      }
    });
  }

  editLogo(type) {
    this.type = false;
    this.searchButtonText = "Loading...";
    const formData = new FormData();
    formData.append("file", this.fileData);
    this.api.setLogo(formData).subscribe((data) => {
      this.answer = [data];
      console.log(this.answer);
      this.searchButtonText = "Submit";
      if (data["success"] == true) {
        this.type = true;
        this.message = "Logo was successfully updated";
      }
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  logout() {
    this.api.removeToken();
    this.router.navigate([""]);
  }
}
