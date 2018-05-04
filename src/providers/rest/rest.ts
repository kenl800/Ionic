import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  //apiUrl = "https://care.x-one.asia/api/json_location_list?lat=3.0721&lon=101.6069"; //kl coordinate
  //apiUrl = "https://care.x-one.asia/api/json_location_list?lat=4.387194&lon=113.978934";
  //url = "http://care.x-one.asia/api/json_qr_details?code=300116109&pass=3022774275472643";

  result: any;
  getResult: any;
  productUrl: any;
  request: any;
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getUsers(apiUrl) {
  return new Promise(resolve => {
    this.http.get(apiUrl).subscribe((data:any) => {
      this.getResult = data.result;
      resolve(this.getResult);
    }, err => {
      console.log(err);
    });
  });
  }

  getProduct(url) {
  return new Promise(resolve => {
    this.http.get(url).subscribe((data:any) => {
      this.getResult = data;
      resolve(this.getResult);
    }, err => {
      console.log(err);
    });
  });
  }

  getFbUser(url) {
  return new Promise(resolve => {
    this.http.get(url).subscribe((data:any) => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
  }

  getFbUser2(url) {
  return new Promise(resolve => {
    this.http.get(url).subscribe((data:any) => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
  }

  registerFB(url) {
  return new Promise(resolve => {
    this.http.get(url).subscribe((data:any) => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
  }
}
