import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Point from 'ol/geom/Point'
import {
    Control, 
    defaults as defaultControls
} from 'ol/control';

import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { features } from 'process';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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

  mapP
  marker1=[];
  answer: any = null;
  fileData: File = null;
  selectedOption;
  message = null;
  type: any;
  vehicles: any;
  vectorSource:any;
  filterPlaceholder;
  imgURL:any;
  selectedFilter = [{
      name: "Flagged"
  }, {
      name: "Duplicate"
  }]
    vectorLayer: any;
    mapPayload: Object;
    mapVar = null;

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private modalService: NgbModal) {
      this.formUpload = this.fb.group({
          uploadFile: [null, {
              validators: [
                  Validators.required
              ]
          }]
      });
      this.form = this.fb.group({
          numPlate: [null, {
              validators: [
                  Validators.required
              ]
          }]
      });
      this.vehicleForm = this.fb.group({
          model: [null, {}],
          make: [null, {}],
          color: [null, {}],
          license_plate: [null, {}],
          saps_flagged: [null, {}],
          license_plate_duplicate: [null, {}],
          vehicle_id: [null, {
              validators: [
                  Validators.required
              ]
          }]
      });
      this.MarkRemoveForm = this.fb.group({
          numPlateRemove: [null, {
              validators: [
                  Validators.required
              ]
          }]
      });
      this.MarkAddForm = this.fb.group({
          numPlateMarked: [null, {
              validators: [
                  Validators.required
              ]
          }]
      });

      this.Dform = this.fb.group({
          numplate: [null, {
              validators: []
          }],
          color: [null, {
              validators: []
          }],
          make: [null, {
              validators: []
          }],
          model: [null, {
              validators: []
          }],
          flag: [null, {
              validators: []
          }]
      });

      this.Fform = this.fb.group({
          filterF: [null, {
              validators: [
                  Validators.required
              ]
          }]
      });

      this.mapView = this.fb.group({
        license_plate: [null, {
            validators: [
                Validators.required
            ]
        }]
    });
  }

  ngOnInit(): void {
  }

 //-----------------------Map---------------------------------------------- 
  map(){
    let i =0;
    this.api.map(this.mapView.value.license_plate).subscribe((mData) => {
       
        if(mData["success"]==true){
        mData["payload"].forEach(element => {
            console.log(element?.tracking[0]["long"]);
    
            this.marker1.push(new Feature({
                    geometry: new Point(olProj.fromLonLat([element?.tracking[0]["long"], element?.tracking[0]["lat"]]))
                })
            );
            this.marker1[i].setStyle(new Style({
                image: new Icon(/** @type {olx.style.IconOptions} */ ({
                  anchor: [0.5, 46],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  opacity: 0.75,
                  src: '../../assets/pin.png'
                })),
                text: new Text({
                    text:  element?.tracking[0]["date"],
                    fill: new Fill({color: 'black'}),
                    stroke: new Stroke({color: 'yellow', width: 1}),
                    offsetX: -20,
                    offsetY: 20
                })
              }) )
              i++;
        });

        this.vectorSource = new VectorSource({
            features: 
                this.marker1
        });
    
        this.vectorLayer = new VectorLayer({
            source : this.vectorSource
        });
    
        this.mapVar = new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new OSM()
              }),
              this.vectorLayer
            ],
            view: new View({
              center: olProj.fromLonLat([7.0785, 51.4614]),
              zoom: 5
            })
          });
        }
         else {
            this.message = "No vehicle matching that license plate found";
         }
    }); 

         
  }
  //-----------------------Upload---------------------------------------------- 
  submitUpload(type) {
    const formData = new FormData();
    formData.append('file', this.fileData);
    switch(type){
      case "video":
        this.api.submitUploadVideo(formData).subscribe((data) => {
        });
      default:
        this.api.submitUploadImage(formData).subscribe((data) => {
          this.answer = [data];
          console.log(this.answer);
      });
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
        this.imgURL = reader.result;
    }
    }

 //-----------------------Modal opening---------------------------------------------- 
  open(content, sizeOfContent) {
    this.clearVariables();

      this.modalService.open(content, {
          size: sizeOfContent,
          ariaLabelledBy: 'modal-basic-title'
      })
  }
  openSearched(content) {
      this.retrieveMarkedVehicles();
      this.message = null;
      this.modalService.open(content, {
          size: 'lg',
          ariaLabelledBy: 'modal-basic-title'
      })
  }
  openEdit(vehicle) {
      this.vehicles = [vehicle];
      this.answer = null;
  }

  //-----------------------Edit---------------------------------------------- 
  editVehicle() {
      this.api.updateVehicle(this.vehicleForm.value).subscribe(data => {
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
  }

  //-----------------------Mark---------------------------------------------- 
  markVehicle() {
    this.clearVariables();

      this.api.markVehicle(this.MarkAddForm.value.numPlateMarked).subscribe((markData) => {
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

      this.api.removeMarked(this.MarkRemoveForm.value.numPlateRemove).subscribe(data => {

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
      this.api.getMarkedVehicles().subscribe(data => {
          this.answer = data;
      });
  }

  //-----------------------Searches---------------------------------------------- 
  search() {
      this.clearVariables();
      this.api.search(this.form.value.numPlate).subscribe((Searchdata) => {
          this.answer = Searchdata;
      });
  }

  Dsearch() {
    this.clearVariables();

      this.api.Dsearch(this.Dform.value.numplate, this.Dform.value.color, this.Dform.value.make, this.Dform.value.model, this.Dform.value.flag).subscribe((DSearchData) => {
          this.answer = DSearchData;
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

  clearVariables(){
    this.message = null;
    this.type = null;
    this.answer = null;
    this.vehicles = null;
    this.mapVar = null;
  }

  logout(){
    this.api.removeToken();
    this.router.navigate(['']);
  }

}