import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-shimmer',
  templateUrl: './articles-shimmer.component.html',
  styleUrls: ['./articles-shimmer.component.sass']
})
export class ArticlesShimmerComponent implements OnInit {
  count: number[] = new Array<number>(1);

  constructor() { }

  ngOnInit(): void {
  }

}
