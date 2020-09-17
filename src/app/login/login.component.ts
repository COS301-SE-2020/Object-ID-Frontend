import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sWave:string = "../assets/wave.svg";
  pImage:string = "../assets/programming.svg";
  oLogo:string = "../assets/obd.png";
 
  public form: FormGroup;

  token:any=null;
  answer:any=null;

  constructor(private api:ApiService, private fb:FormBuilder,private router: Router) { 
    this.form = this.fb.group({
      username:[null, {
        validators:[
          Validators.required
        ]
      }],  
        password:[null, {
          validators:[
            Validators.required
          ]
        }]
    });

  };

  ngOnInit(): void {
  }

  submitLogin(){
    this.api.submitLogin(this.form.value.username, this.form.value.password)
    .subscribe( (data)=>{
      this.token=[data];
      this.api.setToken(this.token);
      this.api.setUsername(this.form.value.username);
      this.router.navigate(['home']);
    }, err =>
    {
      this.answer = "The login credentials provided are incorrect";
    });
}
}
