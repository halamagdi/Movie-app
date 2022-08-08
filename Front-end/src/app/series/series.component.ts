import { SeriesService } from './../tv.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

SeriesService
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  tvDetails:any = {};
  id: string = '';
  constructor(private _ActivatedRoute :ActivatedRoute , private _SeriesService :SeriesService) { }

  imgPerfix: string = 'https://image.tmdb.org/t/p/w500/'

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params.id
    this._SeriesService.getTvDetails(this.id).subscribe((response) => {
      this.tvDetails = response
    })

  }

}
