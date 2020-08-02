import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  public Dform: FormGroup;
  public Fform:FormGroup;  
  public MarkAddForm:FormGroup;
  public MarkRemoveForm:FormGroup;
  public vehicleForm:FormGroup;

  closeResult:any;
   answer:any=null;
   temporary:any=[];
   selectedOption;
   message=null;
   type:any;
   vehicles:any;
   filterPlaceholder;
   selectedFilter = [{name: "Flagged"},{ name:"Duplicate"}]
  constructor(private api:ApiService, private fb:FormBuilder,private router:Router,private modalService: NgbModal) { 
    this.form = this.fb.group({
      numPlate:[null, {
        validators:[
          Validators.required
        ]
      }]
    });
    this.vehicleForm = this.fb.group({
      model:[null, {
      }]
      ,make:[null, {
      }],color:[null, {
      }],license_plate:[null, {
      }],saps_flagged:[null, {
      }],license_plate_duplicate:[null, {
      }]
      ,vehicle_id:[null,{
        validators:[
          Validators.required
        ]
      }]
    });
    this.MarkRemoveForm = this.fb.group({
      numPlateRemove:[null, {
        validators:[
          Validators.required
        ]
      }]
    });
    this.MarkAddForm = this.fb.group({
      numPlateMarked:[null, {
        validators:[
          Validators.required
        ]
      }]
    });

    this.Dform = this.fb.group({
      numplate:[null, {
        validators:[]
      }],
      color:[null, {
        validators:[]
      }],
      make:[null, {
        validators:[]
      }],
      model:[null, {
        validators:[]
      }],
      flag:[null, {
        validators:[]
      }]
    });

    this.Fform = this.fb.group({
      filterF:[null, {
        validators:[
          Validators.required
        ]
      }]
    });
  }

  ngOnInit(): void {
   
  }

  open(content) {
    this.answer = null;
    this.vehicles = null;
    this.message = null;
    this.modalService.open(content, { size: 'lg',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openSearched(content) {
    this.retrieveMarkedVehicles();
    this.message=null;
    this.modalService.open(content, { size: 'lg',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openEdit(vehicle){
    this.vehicles = [vehicle];
    this.answer=null;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  editVehicle(){
    console.log(this.vehicleForm.value);
    this.api.updateVehicle(this.vehicleForm.value).subscribe(data=>{
      console.log(data);
      if(data["success"] == true){
        this.type = true;
       this.message = "Vehicle was successfully updated";
      }
      else{
        this.type = false;
        this.message ="Error occurred";
      }
      this.vehicles = null;
    });
  }

  markVehicle(){
    this.message=null;
    this.type=null;
    this.api.markVehicle(this.MarkAddForm.value.numPlateMarked).subscribe((markData)=>{
      if(markData["success"] == true){
        this.type = true;
       this.message = "Vehicle was successfully marked";
      }
      else{
        this.type = false;
        this.message ="Error occurred";
      }
    });
  }

  removeMarkVehicle(){

    this.message=null;
    this.type=null;
    this.api.removeMarked(this.MarkRemoveForm.value.numPlateRemove).subscribe(data =>{

      if(data["success"] == true){
        this.type = true;
       this.message = "Vehicle was successfully removed";
      }
      else{
        this.type = false;
        this.message ="Error occurred";
      }
    });
  }

  retrieveMarkedVehicles(){
    this.api.getMarkedVehicles().subscribe(data=> {
      this.answer = data;
    });
  }
  //-----------------------Searches---------------------------------------------- 
  search(){
    // console.log(this.form.value.numPlate);
    this.api.search(this.form.value.numPlate).subscribe((Searchdata)=>{
      this.answer=Searchdata;
    });
   
  }

  Dsearch(){
    this.api.Dsearch(this.Dform.value.numplate, this.Dform.value.color, this.Dform.value.make, this.Dform.value.model, this.Dform.value.flag).subscribe((DSearchData)=>{
      this.answer=DSearchData;
    });
  }

  //-----------------------Filters---------------------------------------------- 
  filter(){
    //filter by flagged
    if(this.selectedOption == "Flagged"){
      this.api.filterFlagged(this.selectedOption).subscribe((FilterData)=>{
        this.answer=FilterData;
      });
    }
    //filter by duplicates
    else if(this.selectedOption == "Duplicate"){
    this.api.filterDuplicate(this.selectedOption).subscribe((FilterData)=>{
      this.answer=FilterData;
    });
  }
    
  }

//-----------------------Logout---------------------------------------------- 
  logout(){
    this.api.removeToken();
    this.router.navigate(['']);
  }

}
