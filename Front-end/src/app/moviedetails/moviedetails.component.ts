import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movieDetails: any = {}
  id: string = '';
  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService: MoviesService) {

  }
  imgPerfix: string = 'https://image.tmdb.org/t/p/w500/'

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params.id
    this._MoviesService.getMovieDetails(this.id).subscribe((response) => {
      this.movieDetails = response
    })

  

  }

}
