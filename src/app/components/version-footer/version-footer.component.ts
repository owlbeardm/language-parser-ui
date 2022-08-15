import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-version-footer',
  templateUrl: './version-footer.component.html',
  styleUrls: ['./version-footer.component.css']
})
export class VersionFooterComponent implements OnInit {

  @Input() version!: string;
  year?: string;

  constructor() {
  }

  ngOnInit(): void {
    const now = new Date().getFullYear();
    if (now !== 2022) {
      this.year = `2022–${now}`;
    } else {
      this.year = `${now}`;
    }
  }

}
