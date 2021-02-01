import { AfterViewChecked, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'th[app-horizontal-dash]',
  templateUrl: './horizontal-dash.component.html',
  styleUrls: ['./horizontal-dash.component.css']
})
export class HorizontalDashComponent implements OnInit, AfterViewChecked {

  @ViewChild('col') col: any;
  bcol: String = "";
  @Input() symbol?: String;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeDash();
  }
  ngAfterViewChecked() {
    this.resizeDash();
  }

  resizeDash() {
    const colLength = Math.floor((this.col?.nativeElement.offsetWidth ) / 8);
    const bcol = this.bcol;
    const symbol = this.symbol?this.symbol:"-";
    this.bcol = colLength?symbol.repeat(colLength):"";
    if (bcol != this.bcol) {
      this.cdRef.detectChanges();
    }
  }

}
