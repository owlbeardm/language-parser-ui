import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit, AfterViewChecked {

  //   <input #myname>
  @ViewChild('col1') col1: any;
  @ViewChild('col2') col2: any;
  @ViewChild('dash') dash: any;
  @ViewChild('ddash') ddash: any;
  bcol1: String;
  bcol2: String;
  // element

  constructor(private cdRef: ChangeDetectorRef) {
    this.bcol1 = "";
    this.bcol2 = "";
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeTable();
  }

  ngOnInit(): void {
    console.log("translations ngOnInit ");
  }

  ngAfterViewChecked() {
    console.log("translations ngAfterViewInit ");
    this.resizeTable();
  }

  resizeTable() {
    const d = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    const col1l = Math.floor((this.col1.nativeElement.offsetWidth - 2) / 8);
    this.bcol1 = d.substr(0, col1l);
    const col2l = Math.floor((this.col2.nativeElement.offsetWidth - 2) / 8);
    this.bcol2 = d.substr(0, col2l);
    console.log(this.col2.nativeElement.offsetWidth, col2l);
    this.cdRef.detectChanges();
  }

}
