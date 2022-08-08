import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) {

  }
  getTrending(mediaType : string) : Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=866cd3a065ef9304a549f1d65e494940`)
  }
  getMovieDetails(id : string) : Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8aa554bfb0e0e145dfd917eb63931ec1&language=en-US`)
  }
  
}
