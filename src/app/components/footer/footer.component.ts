import { Component, OnInit, ViewChild, AfterViewChecked, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewChecked {

  @ViewChild('col') col: any;
  bcol: String = "";

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeTable();
  }
  ngAfterViewChecked() {
    this.resizeTable();
  }

  resizeTable() {
    const d = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    const coll = Math.floor((this.col.nativeElement.offsetWidth - 2) / 8);
    const bcol = this.bcol;
    this.bcol = d.substr(0, coll);
    if (bcol != this.bcol) {
      console.log("refresh footer")
      this.cdRef.detectChanges();
    }
  }

}
