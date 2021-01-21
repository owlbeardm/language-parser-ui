import { AfterViewChecked, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'td[app-vertical-dash]',
  templateUrl: './vertical-dash.component.html',
  styleUrls: ['./vertical-dash.component.css']
})
export class VerticalDashComponent implements OnInit, AfterViewChecked {

  @ViewChild('row') row: any;
  brow: String = "";

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
    const rowLength = Math.min(10,Math.ceil((this.row?.nativeElement.parentNode.offsetHeight) / 16));
    const brow = this.brow;
    this.brow = rowLength?"|\n".repeat(rowLength):"";
    if (brow != this.brow) {
      this.cdRef.detectChanges();
    }
  }

}