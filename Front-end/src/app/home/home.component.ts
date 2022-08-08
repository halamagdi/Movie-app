
import { MoviesService } from './../movies.service';

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {

  constructor(private _MoviesService: MoviesService ) { }

  trendingMovies: any[] = [];
  trendingTv: any[] = [];
  



  imgPerfix: string = 'https://image.tmdb.org/t/p/w500/'
  ngOnInit(): void {


    this._MoviesService.getTrending('movie').subscribe((response) => {
      this.trendingMovies = response.results.slice(0, 10);
    })

    this._MoviesService.getTrending('tv').subscribe((response) => {
      this.trendingTv = response.results.slice(0, 10);
    })
   
  }

  ngOnChanges(changes: SimpleChanges): void { }
}
