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
  rLogo:string = "../assets/obd.png";
  rImage:string = "../assets/img/register.svg";

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
      if(data['success']==true)
      {
        this.router.navigate(['home']);
      }
      else{
        this.answer = [data['payload']];
      }
    });

  }

  logout(){
    this.api.removeToken();
    this.router.navigate(['']);
  }

}
