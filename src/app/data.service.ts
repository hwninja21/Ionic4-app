import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
//import { getMaxListeners } from 'cluster';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
  
})
export class DataService {
  token;

  public refreshQuotes = new Subject<number>();
  constructor(private http: HttpClient) {}

  // getData(url: string) {
  //   return this.http.get(`${apiUrl}/wp/v2/${url}`);
  // }

  postDataToWp(data: any) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   //'Access-Control-Allow-Origin': '*',
    //   Authorization: `Bearer ${this.token}`,
    // });
    // const headers = new HttpHeaders();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json'); 
    // const requestOptions = new RequestOptions({ headers: headers });
    return this.http.post(`https://mary-janes.co.uk/wp-json/wp/v2/users/register`, data);
  }
 
  getDataByEmail(email: string){
    const headers =   new HttpHeaders({
      'Authorization': 'Basic WE1TMVJXTTRNTFpCUE4yNFc5TFdPMUtKVENIMEI0V0k6Sjg1QlZZUDFIRTBUWDQxRTQ2QUNEQklQSzhIMTRLOFQ=',
      'Content-Type': 'application/json'
    });
   return this.http.get(`https://api.eposnowhq.com/api/v4/Customer/GetByEmail?email=` + email, { headers: headers });
  }
  getDataByUserId(userId: number){
    const headers =   new HttpHeaders({
      'Authorization': 'Basic WE1TMVJXTTRNTFpCUE4yNFc5TFdPMUtKVENIMEI0V0k6Sjg1QlZZUDFIRTBUWDQxRTQ2QUNEQklQSzhIMTRLOFQ=',
      'Content-Type': 'application/json'
    });
   return this.http.get(`https://api.eposnowhq.com/api/v4/Customer?id=` + userId, { headers: headers });
  }
  resetPassword(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`https://mary-janes.co.uk/wp-json/wp/v2/users/lostpassword`, data, { headers: headers });
  }
  postDataToEpos(data) {
    
    const headers =   new HttpHeaders({
      'Authorization': 'Basic WE1TMVJXTTRNTFpCUE4yNFc5TFdPMUtKVENIMEI0V0k6Sjg1QlZZUDFIRTBUWDQxRTQ2QUNEQklQSzhIMTRLOFQ=',
      'Content-Type': 'application/json'
    });
   return this.http.post(`https://api.eposnowhq.com/api/v4/Customer`, data, { headers: headers });
  }
  putDataToEpos(data) {
    
    const headers =   new HttpHeaders({
      'Authorization': 'Basic WE1TMVJXTTRNTFpCUE4yNFc5TFdPMUtKVENIMEI0V0k6Sjg1QlZZUDFIRTBUWDQxRTQ2QUNEQklQSzhIMTRLOFQ=',
      'Content-Type': 'application/json'
    });
   return this.http.put(`https://api.eposnowhq.com/api/v4/Customer`, data, { headers: headers });
  }

  updateUserOfWp(data: any, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.post(`https://mary-janes.co.uk/wp-json/wp/v2/users/me`, data, {headers: headers});
  }
  getUserOfWp(token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.get(`https://mary-janes.co.uk/wp-json/wp/v2/users/me`, {headers: headers});
  }
  // deleteData(url: string) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.token}`
  //   });
  //   return this.http.delete(`${apiUrl}/wp/v2/${url}`, {
  //     headers: headers
  //   });
  // }
}

