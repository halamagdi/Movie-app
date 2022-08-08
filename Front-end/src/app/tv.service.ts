import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private _HttpClient: HttpClient) { }



getTvDetails(id : string) : Observable < any > {
  return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=8aa554bfb0e0e145dfd917eb63931ec1&language=en-US`)
}


}




