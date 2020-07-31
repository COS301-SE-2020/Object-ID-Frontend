import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public form: FormGroup;
  answer:any=null;
  // base64Image:any;

  fileData: File = null;
  constructor(private api:ApiService, private http: HttpClient, private fb:FormBuilder) { 
    this.form = this.fb.group({
      uploadFile:[null, {
        validators:[
          Validators.required
        ]
      }]
  });
  }

  ngOnInit(): void {
  }
 
  fileProgress(fileInput: any) {
    this.fileData = fileInput.files[0];
    // this.getBase64(this.fileData);
  }
//   getBase64(event) {
//     let base64;
//    let reader = new FileReader();
//    reader.readAsDataURL(this.fileData);
//    reader.onload = function () {
//      base64 = reader.result;
//      //console.log(reader.result);
//    };
//    this.base64Image = base64;
//    reader.onerror = function (error) {
//      console.log('Error: ', error);
//    };
// }
 
  submitUpload() {
    //this.fileData = <File>(this.form.value.uploadFile).target.files[0];
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.api.submitUpload(formData).subscribe((data)=>{
      this.answer=data;
      console.log(this.answer);
    });
  }

}
