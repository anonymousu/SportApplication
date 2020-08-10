import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Player } from './model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url = "http://localhost:8082/sports/players" ;
  private url1 = "http://localhost:8082/sports" ;
  private searchURL = "http://localhost:8082/sports/searchPlayers" ;

  constructor(private httpClient: HttpClient) { }

  getPlayer(id : number): Observable<any>{
    return this.httpClient.get(`${this.url}/${id}`);
  }

  getPlayerById(id: number): Observable<any>{
    return this.httpClient.get(`${this.url}/id/${id}`)
  }
  getPlayerByname(userName: string): Observable<any>{
    return this.httpClient.get(`${this.url}/userName/${userName}`)
  }
   registerPlayer(formData: FormData): Observable<any> {
     console.log(formData);
     return this.httpClient.post(`${this.url}`, formData);
   }
  // uploadFile( formData: FormData ) : Observable<any>  
  // {  
  //   return this.httpClient.post(`${this.url}`,formData);  
  // }  

  getPlayerList(): Observable<any>{
    return this.httpClient.get(`${this.url}`);
  }

  deletePlayer(id: number): Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}` , {responseType : 'text'});
  }

  deletePlayers(ids: string): Observable<any>{
    console.log("url is: " + `${this.url1}/delete/players?${ids}}`);
    return this.httpClient.delete(`${this.url1}/delete/players?${ids}`)
    /*console.log("ids to delete: " + ids.length);
    const data = {'ids' : ids};
    const options = {
			headers: new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		};
    const resp = this.httpClient.post(`${this.url1}/delete/players}`,data, options);
    return resp;*/
  }

  searchPlayer(searchTerm: string): Observable<any>{
    //console.log("url : " + `${this.searchURL}?${fieldName}=${searchTerm}`);
    console.log("url : " + `${this.searchURL}?${searchTerm}`);
    return this.httpClient.get(`${this.searchURL}?${searchTerm}`);
  }

  updatePlayer(id: number, value: any): Observable<any>{
    return this.httpClient.put(`${this.url}/${id}`, value);
  }
  //uploadFile(uploadData: any): Observable<any>{
   // return this.httpClient.post(`${this.url}`,uploadData);
  //}


}
