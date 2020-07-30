import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  public Dform: FormGroup;
  public Fform:FormGroup;  
  
   answer:any=null;
   temporary:any=[];
   selectedOption;
   filterPlaceholder;
   selectedFilter = [{name: "Flagged"},{ name:"Duplicate"}]
  constructor(private api:ApiService, private fb:FormBuilder,private router:Router) { 
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
