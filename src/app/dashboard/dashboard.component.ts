import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { features } from "process";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public Cform: FormGroup;

  allCamera = [
    { name: "Camera 1", value: 25 },
    { name: "Camera 2", value: 17 },
    { name: "Camera 3", value: 15 },
    { name: "Camera 4", value: 11 },
  ];
  // allCamera = [];
  // perCamera = [];
  Camera1 = [
    { name: "2020-08-10", value: 2 },
    { name: "2020-08-13", value: 3 },
    { name: "2020-08-22", value: 7 },
    { name: "2020-09-03", value: 4 },
    { name: "2020-09-05", value: 9 },
  ];
  Camera2 = [
    { name: "2020-08-10", value: 2 },
    { name: "2020-08-14", value: 6 },
    { name: "2020-08-17", value: 1 },
    { name: "2020-08-28", value: 4 },
    { name: "2020-09-04", value: 4 },
  ];
  Camera3 = [
    { name: "2020-08-10", value: 5 },
    { name: "2020-08-13", value: 3 },
    { name: "2020-08-22", value: 3 },
    { name: "2020-09-04", value: 4 },
  ];
  Camera4 = [
    { name: "2020-08-10", value: 4 },
    { name: "2020-08-13", value: 3 },
    { name: "2020-08-22", value: 4 },
  ];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.Cform = this.fb.group({
      camera: [
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
    //------------------Chart for all cameras---------------------------
    this.api.allCameras().subscribe((cameraData) => {
      if (cameraData["success"] == true) {
        cameraData["payload"].forEach((element) => {
          this.allCamera.push({
            name: element["name"],
            value: element["total"],
          });
        });
        console.log(this.allCamera);
      }
    });
    //------------------Chart for camera1---------------------------
    this.api.allCameras().subscribe((cameraData) => {
      if (cameraData["success"] == true) {
        cameraData["payload"].forEach((element) => {
          this.Camera1.push({
            name: element["date"],
            value: element["total"],
          });
        });
        console.log(this.Camera1);
      }
    });
    //------------------Chart for camera2---------------------------
    this.api.allCameras().subscribe((cameraData) => {
      if (cameraData["success"] == true) {
        cameraData["payload"].forEach((element) => {
          this.Camera2.push({
            name: element["date"],
            value: element["total"],
          });
        });
        console.log(this.allCamera);
      }
    });
    //------------------Chart for camera3---------------------------
    this.api.allCameras().subscribe((cameraData) => {
      if (cameraData["success"] == true) {
        cameraData["payload"].forEach((element) => {
          this.Camera3.push({
            name: element["date"],
            value: element["total"],
          });
        });
        console.log(this.allCamera);
      }
    });
    //------------------Chart for camera4---------------------------
    this.api.allCameras().subscribe((cameraData) => {
      if (cameraData["success"] == true) {
        cameraData["payload"].forEach((element) => {
          this.Camera4.push({
            name: element["date"],
            value: element["total"],
          });
        });
        console.log(this.allCamera);
      }
    });
  }

  //-----------------Chart for each camera --------------------------
  perCameras() {
    // const formData = new FormData();
    // formData.append("unique_key", this.Cform.value.camera);
    // this.api.perCameras(formData).subscribe((cameraD) => {
    //   if (cameraD["success"] == true) {
    //     cameraD["payload"]["data"].forEach((element) => {
    //       this.perCamera.push({
    //         name: element["date"],
    //         value: element["count"],
    //       });
    //     });
    //     console.log(this.perCamera);
    //   }
    // });
  }

  logout() {
    this.api.removeToken();
    this.router.navigate([""]);
  }
}
