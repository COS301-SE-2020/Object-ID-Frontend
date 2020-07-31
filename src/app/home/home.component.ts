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

  closeResult:any;
   answer:any=null;
   temporary:any=[];
   selectedOption;
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
    this.modalService.open(content, { size: 'lg',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  //-----------------------Searches---------------------------------------------- 
  search(){
    // console.log(this.form.value.numPlate);
    this.api.search(this.form.value.numPlate).subscribe((Searchdata)=>{
      this.answer=Searchdata;
    });
   
  }

  Dsearch(){
    console.log(this.Dform.value.numplate, this.Dform.value.color, this.Dform.value.make, this.Dform.value.model, this.Dform.value.flag);
    this.api.Dsearch(this.Dform.value.numplate, this.Dform.value.color, this.Dform.value.make, this.Dform.value.model, this.Dform.value.flag).subscribe((DSearchData)=>{
      this.answer=DSearchData;
    });
  }

  //-----------------------Filters---------------------------------------------- 
  filter(){
    console.log(this.selectedOption);
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
