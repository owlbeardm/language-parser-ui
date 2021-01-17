import { Component, OnInit, ViewChild, AfterViewChecked, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit, AfterViewChecked {

  @ViewChild('col') col: any;
  bcol: String = "";

  constructor(private cdRef: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resize();
  }

  ngAfterViewChecked() {
    this.resize();
  }

  resize() {
    const d = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    const coll = Math.floor((this.col.nativeElement.offsetWidth - 2) / 8);
    const bcol = this.bcol;
    this.bcol = d.substr(0, coll);
    console.log("this.col.nativeElement.offsetWidth", this.col.nativeElement.offsetWidth, coll)
    if (bcol != this.bcol) {
      console.log("refresh", bcol)
      this.cdRef.detectChanges();
    }
  }

  ngOnInit(): void {
  }

}
