import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  dots: String;
  numbers: Observable<number>;
  subscribe?: Subscription;

  constructor() {
    this.dots = "."
    this.numbers = interval(500);
  }

  ngOnInit(): void {
    this.subscribe = this.numbers.subscribe(() => {
      const l = (this.dots.length + 1) % 4;
      this.dots = "...".substr(0, l);
    })
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
