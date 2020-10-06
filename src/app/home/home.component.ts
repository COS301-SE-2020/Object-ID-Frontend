import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import Icon from "ol/style/Icon";
import OSM from "ol/source/OSM";
import * as olProj from "ol/proj";
import TileLayer from "ol/layer/Tile";
import Point from "ol/geom/Point";
import { Control, defaults as defaultControls } from "ol/control";

import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { features } from "process";
import { ThrowStmt } from "@angular/compiler";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  //-----------------------Variables----------------------------------------------

  public form: FormGroup;
  public Dform: FormGroup;
  public Fform: FormGroup;
  public MarkAddForm: FormGroup;
  public MarkRemoveForm: FormGroup;
  public vehicleForm: FormGroup;
  public formUpload: FormGroup;
  public mapView: FormGroup;
  public authForm: FormGroup;

  imgU: any;
  img: any;
  damage: any;
  Dtype: any = [];
  number: any;
  authpass: any;
  id: any;
  searchAnswer: any = [];
  reason: any;
  searchButtonText = "Submit";
  test = "false";
  marker1 = [];
  answer: any = null;
  answer2: any = null;
  fileData: File = null;
  selectedOption;
  message = null;
  type: any;
  vehicles: any;
  vectorSource: any;
  filterPlaceholder;
  imgURL: any;
  selectedFilter = [
    {
      name: "Flagged",
    },
    {
      name: "Duplicate",
    },
  ];
  vectorLayer: any;
  mapPayload: Object;
  mapVar = null;
  passConfirm: Object[];
  toggleNavbar = true;
  closeResult: string;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.formUpload = this.fb.group({
      uploadFile: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      uploadFileAd: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
    this.form = this.fb.group({
      numPlate: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
    this.authForm = this.fb.group({
      username: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      password: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
    this.vehicleForm = this.fb.group({
      model: [null, {}],
      make: [null, {}],
      color: [null, {}],
      license_plate: [null, {}],
      saps_flagged: [null, {}],
      license_plate_duplicate: [null, {}],
      vehicle_id: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
    this.MarkRemoveForm = this.fb.group({
      numPlateRemove: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
    this.MarkAddForm = this.fb.group({
      numPlateMarked: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      reason: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });

    this.Dform = this.fb.group({
      numplate: [
        null,
        {
          validators: [],
        },
      ],
      color: [
        null,
        {
          validators: [],
        },
      ],
      make: [
        null,
        {
          validators: [],
        },
      ],
      model: [
        null,
        {
          validators: [],
        },
      ],
      flag: [
        null,
        {
          validators: [],
        },
      ],
      damage: [
        null,
        {
          validators: [],
        },
      ],
    });

    this.Fform = this.fb.group({
      filterF: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });

    this.mapView = this.fb.group({
      license_plate: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  openn(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  //------------------asset varables---------------------------
  obLogo: string = "../assets/img/objectIDlogo.png";

  ngOnInit(): void {}

  //-----------------------Map----------------------------------------------
  map() {
    let i = 0;
    this.api.map(this.mapView.value.license_plate).subscribe((mData) => {
      if (mData["success"] == true) {
        mData["payload"].forEach((element) => {
          console.log(element?.tracking[0]["long"]);
          console.log(element?.tracking[0]["lat"]);

          this.marker1.push(
            new Feature({
              geometry: new Point(
                olProj.fromLonLat([
                  element?.tracking[0]["long"],
                  element?.tracking[0]["lat"],
                ])
              ),
            })
          );
          this.marker1[i].setStyle(
            new Style({
              image: new Icon(
                /** @type {olx.style.IconOptions} */ {
                  anchor: [0.5, 46],
                  anchorXUnits: "fraction",
                  anchorYUnits: "pixels",
                  opacity: 0.75,
                  src: "../../assets/pin.png",
                }
              ),
              text: new Text({
                text: element?.tracking[0]["date"],
                fill: new Fill({ color: "black" }),
                stroke: new Stroke({ color: "yellow", width: 1 }),
                offsetX: -20,
                offsetY: 20,
              }),
            })
          );
          i++;
        });

        this.vectorSource = new VectorSource({
          features: this.marker1,
        });

        this.vectorLayer = new VectorLayer({
          source: this.vectorSource,
        });

        this.mapVar = new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            this.vectorLayer,
          ],
          view: new View({
            center: olProj.fromLonLat([28.229, -25.747]),
            zoom: 5,
          }),
        });
      } else {
        this.message = "No vehicle matching that license plate found";
      }

      console.log(this.mapVar);
    });
  }
  //-----------------------Upload----------------------------------------------
  submitUpload(type) {
    this.test = "true";
    this.searchButtonText = "Loading...";
    const formData = new FormData();
    formData.append("file", this.fileData);
    switch (type) {
      case "video":
        this.api.submitUploadVideo(formData).subscribe((data) => {});
      default:
        this.api
          .getLoc(this.formUpload.value.uploadFileAd)
          .subscribe((data2) => {
            let long = data2["results"][0].locations[0].displayLatLng.lng;
            let lat = data2["results"][0].locations[0].displayLatLng.lat;
            formData.append("lat", lat);
            formData.append("long", long);
            console.log(formData.get("long"));
            console.log(formData.get("lat"));

            this.api.submitUploadImage(formData).subscribe((data) => {
              this.answer = [data];
              console.log(this.answer);
              this.searchButtonText = "Submit";
            });
          });
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  //-----------------------Modal opening----------------------------------------------
  open(content, sizeOfContent) {
    this.clearVariables();

    this.modalService.open(content, {
      size: sizeOfContent,
      ariaLabelledBy: "modal-basic-title",
    });
  }
  openSearched(content) {
    this.retrieveMarkedVehicles();
    this.message = null;
    this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "modal-basic-title",
    });
  }
  openEdit(vehicle) {
    this.vehicles = [vehicle];
    this.answer = null;
  }

  //-----------------------Edit----------------------------------------------
  editVehicle() {
    this.clearVariables();
    this.type = false;
    this.authpass = prompt("Confirm your password: ");
    this.api
      .submitLogin(localStorage.getItem("username"), this.authpass)
      .subscribe((Adata) => {
        this.passConfirm = [Adata];
        console.log(Adata);
        if (Adata["token"]) {
          this.api.setToken(this.passConfirm);
          this.api.updateVehicle(this.vehicleForm.value).subscribe((data) => {
            console.log(data);
            if (data["success"] == true) {
              this.type = true;
              this.message = "Vehicle was successfully updated";
            } else {
              this.type = false;
              this.message = "Error occurred";
            }
            this.vehicles = null;
          });
        } else {
          this.type = false;
          this.message = "Not authenticated.";
        }
      });
  }

  //-----------------------Mark----------------------------------------------
  markVehicle() {
    this.clearVariables();

    this.api
      .markVehicle(
        this.MarkAddForm.value.numPlateMarked,
        this.MarkAddForm.value.reason
      )
      .subscribe((markData) => {
        this.answer = markData;
        console.log(this.answer);
        if (markData["success"] == true) {
          this.type = true;
          this.message = "Vehicle was successfully marked";
        } else {
          this.type = false;
          this.message = "Error occurred";
        }
      });
  }

  removeMarkVehicle() {
    this.clearVariables();

    this.api
      .removeMarked(this.MarkRemoveForm.value.numPlateRemove)
      .subscribe((data) => {
        if (data["success"] == true) {
          this.type = true;
          this.message = "Vehicle was successfully removed";
        } else {
          this.type = false;
          this.message = "Error occurred";
        }
      });
  }

  retrieveMarkedVehicles() {
    this.api.getMarkedVehicles().subscribe((data) => {
      this.answer = data;
    });
  }

  //-----------------------Searches----------------------------------------------
  authenticate() {
    this.api
      .authenticate(this.form.value.username, this.form.value.password)
      .subscribe((authdata) => {});
  }

  async search() {
    this.clearVariables();
    this.api.search(this.form.value.numPlate).subscribe((SearchData) => {
      this.answer = SearchData;
      if (this.answer["payload"].length > 0) {
        this.answer["payload"].forEach((vehicle) => {
          this.api.damageSearch(vehicle.license_plate).subscribe((damageD) => {
            let helper = "";

            if (damageD["payload"].length > 0) {
              damageD["payload"].forEach((element) => {
                if (element.location != null || element.location != "") {
                  helper += element.location + ", ";
                }
              });
              helper = helper.substr(0, helper.length - 2);
            } else {
              helper = "None";
            }

            this.searchAnswer.push({ ...vehicle, damage: helper });
            console.log(this.searchAnswer);
          });
        });
      }
    });
  }

  openImage(id) {
    this.api.openImage(id).subscribe((data) => {
      console.log(data);
      this.createFromBlob(data);
    });
  }

  createFromBlob(img: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imgU = reader.result;
      },
      false
    );

    if (img) {
      reader.readAsDataURL(img);
    }
  }

  async Dsearch() {
    this.clearVariables();

    this.api
      .Dsearch(
        this.Dform.value.numplate,
        this.Dform.value.color,
        this.Dform.value.make,
        this.Dform.value.model,
        this.Dform.value.flag,
        this.Dform.value.damage
      )
      .subscribe((DSearchData) => {
        this.answer = DSearchData;
        if (this.answer["payload"].length > 0) {
          this.answer["payload"].forEach((vehicle) => {
            this.api
              .damageSearch(vehicle.license_plate)
              .subscribe((damageD) => {
                let helper = "";

                if (damageD["payload"].length > 0) {
                  damageD["payload"].forEach((element) => {
                    if (element.location != null || element.location != "") {
                      helper += element.location + ", ";
                    }
                  });
                  helper = helper.substr(0, helper.length - 2);
                } else {
                  helper = "None";
                }

                this.searchAnswer.push({ ...vehicle, damage: helper });
                console.log(this.searchAnswer);
              });
          });
        }
      });
  }

  //-----------------------Filters----------------------------------------------
  filter() {
    //filter by flagged
    this.clearVariables();

    if (this.selectedOption == "Flagged") {
      this.api.filterFlagged(this.selectedOption).subscribe((FilterData) => {
        this.answer = FilterData;
      });
    }
    //filter by duplicates
    else if (this.selectedOption == "Duplicate") {
      this.api.filterDuplicate(this.selectedOption).subscribe((FilterData) => {
        this.answer = FilterData;
      });
    }
  }

  clearVariables() {
    this.message = null;
    this.type = null;
    this.answer = null;
    this.vehicles = null;
    this.mapVar = null;
    this.imgU = null;
    this.img = null;
    this.damage = null;
    this.Dtype = null;
    this.number = null;
    this.authpass = null;
    this.id = null;
    this.answer2 = null;
    this.fileData = null;
    this.vehicles = null;
    this.vectorSource = null;
    this.imgURL = null;
    this.reason = null;
    this.searchAnswer = [];
  }

  logout() {
    this.api.removeToken();
    this.router.navigate([""]);
  }
}
