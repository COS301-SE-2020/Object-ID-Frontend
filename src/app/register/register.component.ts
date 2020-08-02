import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  answer:any=null;

  constructor(private api:ApiService, private fb:FormBuilder,private router:Router) { 
    this.form = this.fb.group({
      username:[null, {
        validators:[
          Validators.required
        ]
      }],  
        email:[null, {
          validators:[
            Validators.required
          ]
        }],
        password:[null, {
          validators:[
            Validators.required
          ]
        }],
        cpassword:[null, {
          validators:[
            Validators.required
          ]
        }]
    });
  };

  ngOnInit(): void {
  }

  submitRegister(){
    this.api.submitRegister(this.form.value.username, this.form.value.email, this.form.value.password, this.form.value.cpassword)
    .subscribe( (data)=>{
      this.answer=[data];
      this.router.navigate['home'];
    });

  }

}
