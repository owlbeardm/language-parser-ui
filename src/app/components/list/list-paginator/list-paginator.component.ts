import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-list-paginator',
  standalone: true,
  templateUrl: './list-paginator.component.html',
  styleUrls: ['./list-paginator.component.css'],
  imports: [NgFor, NgIf]
})
export class ListPaginatorComponent implements OnInit, OnChanges {

  pageBttns: number[] = [];
  @Input() totalPages = 0;
  @Input() total = 0;
  @Input() page = 0;
  @Input() size = 30;
  @Output() load = new EventEmitter<{ page: number, size: number }>();

  constructor() {
  }

  ngOnInit(): void {
    this.load.emit({page: this.page, size: this.size});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.redrawPageBttns();
  }

  redrawPageBttns(): void {
    if (this.totalPages) {
      this.pageBttns = [];
      for (let i = 0; i < 3; i++) {
        this.pageBttns.push(i);
        this.pageBttns.push(this.totalPages - 1 - i);
        this.pageBttns.push(this.page + i);
        this.pageBttns.push(this.page - i);
      }
      this.pageBttns = this.pageBttns
        .filter((v, i, a) => a.indexOf(v) === i && v >= 0 && this.totalPages && v < this.totalPages)
        .sort((a, b) => a - b);
    }
  }

  changePage(newpagenmb: number | undefined): void {
    if (this.totalPages && newpagenmb !== undefined) {
      const page = Math.min(Math.max(0, newpagenmb), this.totalPages - 1);
      if (page !== this.page) {
        this.page = page;
        this.load.emit({page: this.page, size: this.size});
      }
    }
  }

}
