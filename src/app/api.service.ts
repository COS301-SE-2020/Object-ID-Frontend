import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //-----------------------Map----------------------------------------------
  map(license_plate) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/get_vehicle_locations/",
      {
        license_plate: license_plate,
      },
      this.getHeaders()
    );
  }

  //-----------------------Login----------------------------------------------
  submitLogin(username, password) {
    return this.http.post("http://127.0.0.1:8000/api-auth/", {
      username: username,
      password: password,
    });
  }

  setToken(token) {
    localStorage.setItem("token", token[0].token);
  }

  setUsername(username) {
    localStorage.setItem("username", username);
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
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/add_marked_vehicle/",
      {
        license_plate: numPlate,
      },
      this.getHeaders()
    );
  }

  removeMarked(numPlate) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/remove_marked_vehicle/",
      {
        license_plate: numPlate,
      },
      this.getHeaders()
    );
  }

  getMarkedVehicles() {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/get_marked_vehicles",
      {},
      this.getHeaders()
    );
  }

  //-----------------------Update----------------------------------------------
  updateVehicle(vehicle) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/edit_vehicle",
      {
        vehicle_id: vehicle.vehicle_id,
        make: vehicle.make,
        model: vehicle.model,
        license_plate: vehicle.license_plate,
        color: vehicle.color,
        license_plate_duplicate: vehicle.license_plate_duplicate,
        saps_flagged: vehicle.saps_fagged,
      },
      this.getHeaders()
    );
  }

  //-----------------------Register----------------------------------------------
  submitRegister(username, email, password, cpassword) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/user/register_user/",
      {
        username: username,
        email: email,
        password1: password,
        password2: cpassword,
      },
      {}
    );
  }

  //-----------------------Searches----------------------------------------------
  authenticate(username, password) {
    return this.http.post("http://127.0.0.1:8000/api-auth/", {
      username: username,
      password: password,
    });
  }

  search(numberPlate) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/search/",
      {
        search: numberPlate,
      },
      this.getHeaders()
    );
  }

  Dsearch(numberplate, color, make, model, flag) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/search_advanced/",
      {
        type: "and",
        filters: {
          license_plate: numberplate,
          color: color,
          make: make,
          model: model,
          saps_flagged: flag,
        },
      },
      this.getHeaders()
    );
  }

  openImage(id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + this.getToken(),
    });

    return this.http.post<Blob>(
      "http://127.0.0.1:8000/api/v1/vehicle/get_latest_vehicle_image/",
      {
        vehicle_id: id,
      },
      { headers: headers, responseType: "blob" as "json" }
    );
  }

  //-----------------------Filters----------------------------------------------
  filterFlagged(filter) {
    return this.http.get(
      "http://127.0.0.1:8000/api/v1/vehicle/get_saps_flagged/",
      this.getHeaders()
    );
  }

  filterDuplicate(filter) {
    return this.http.get(
      "http://127.0.0.1:8000/api/v1/vehicle/get_duplicates/",
      this.getHeaders()
    );
  }

  //-----------------------Upload----------------------------------------------
  submitUploadImage(formData) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/file_recognize/",
      formData,
      this.getHeaders()
    );
  }

  getLoc(uploadFormAd) {
    return this.http.get(
      "http://open.mapquestapi.com/geocoding/v1/address?key=62PmHdx24WG4SKrLCjPKwlrnbW9yBbuD&location=" +
        uploadFormAd +
        ",ZA"
    );
  }

  submitUploadVideo(FormData) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/vehicle/detect/",
      FormData,
      this.getHeaders()
    );
  }

  //-----------------------Charts----------------------------------------------
  allCameras() {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/dashboard/get_all_camera_total/",
      null,
      this.getHeaders()
    );
  }

  perCameras(camera) {
    return this.http.post(
      "http://127.0.0.1:8000/api/v1/dashboard/get_camera_history/",
      camera,
      this.getHeaders()
    );
  }

  //-----------------------Header----------------------------------------------
  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: "Token " + this.getToken(),
      }),
    };
  }
}
