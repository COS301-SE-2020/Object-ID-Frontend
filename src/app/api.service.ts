import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //-----------------------Login---------------------------------------------- 
  submitLogin(username, password) {
      return this.http.post("http://127.0.0.1:8000/api-auth/", {
          "username": username,
          "password": password
      });
  }

  setToken(token) {
      localStorage.setItem("token", token[0].token);
  }
  removeToken() {
      localStorage.removeItem("token");
  }

  getToken() {
      return localStorage.getItem("token");
  }

  isLoggedIn() {
      if (this.getToken() === null) {
          return false;
      }
      return true;
  }

//-----------------------Mark---------------------------------------------- 
  markVehicle(numPlate) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/add_marked_vehicle/", {
          'license_plate': numPlate
      }, this.getHeaders());
  }

  removeMarked(numPlate) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/remove_marked_vehicle/", {
          'license_plate': numPlate
      }, this.getHeaders());
  }

  getMarkedVehicles() {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/get_marked_vehicles", {}, this.getHeaders());
  }

 //-----------------------Update---------------------------------------------- 
  updateVehicle(vehicle) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/edit_vehicle", {
          "vehicle_id": vehicle.vehicle_id,
          "make": vehicle.make,
          "model": vehicle.model,
          "license_plate": vehicle.license_plate,
          "color": vehicle.color,
          "license_plate_duplicate": vehicle.license_plate_duplicate,
          "saps_flagged": vehicle.saps_fagged
      }, this.getHeaders());
  }

  //-----------------------Register---------------------------------------------- 
  submitRegister(username, email, password, cpassword) {
      return this.http.post("http://127.0.0.1:8000/api/v1/user/register_user/", {
          "username": username,
          "email": email,
          "password1": password,
          "password2": cpassword
      }, this.getHeaders());
  }

  //-----------------------Searches---------------------------------------------- 
  search(numberPlate) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/search/", {
          "search": numberPlate
      }, this.getHeaders());
  }

  Dsearch(numberplate, color, make, model, flag) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/search_advanced/", {
          "type": "and",
          "filters": {
              "license_plate": numberplate,
              "color": color,
              "make": make,
              "model": model,
              "saps_flagged": flag
          }
      }, this.getHeaders());
  }

  //-----------------------Filters---------------------------------------------- 
  filterFlagged(filter) {
      return this.http.get("http://127.0.0.1:8000/api/v1/vehicle/get_saps_flagged/",
          this.getHeaders());
  }

  filterDuplicate(filter) {
      return this.http.get("http://127.0.0.1:8000/api/v1/vehicle/get_duplicates/",
          this.getHeaders());
  }

//-----------------------Upload---------------------------------------------- 
  submitUploadImage(FormData) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/file_recognize/", FormData,
          this.getHeaders());
  }

  submitUploadVideo(FormData) {
      return this.http.post("http://127.0.0.1:8000/api/v1/vehicle/detect/", FormData,
          this.getHeaders());
  }

//-----------------------Header---------------------------------------------- 
  getHeaders() {
      return {
          headers: new HttpHeaders({
              'Authorization': "Token " + this.getToken()
          })
      };
  }

}