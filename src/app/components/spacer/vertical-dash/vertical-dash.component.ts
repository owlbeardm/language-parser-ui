import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'th[app-vertical-dash]',
  templateUrl: './vertical-dash.component.html',
  styleUrls: ['./vertical-dash.component.css']
})
export class VerticalDashComponent implements OnInit, AfterViewChecked {

  @ViewChild('row') row: any;
  brow: String = '';
  @Input() symbol?: String;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log('VerticalDashComponent.ngOnInit()');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log('VerticalDashComponent.onResize()');
    this.resizeDash();
  }

  ngAfterViewChecked() {
    this.resizeDash();
  }

  resizeDash() {
    console.log('VerticalDashComponent.resizeDash()', this.row?.nativeElement.parentNode.offsetHeight);
    const rowLength = Math.floor((this.row?.nativeElement.parentNode.offsetHeight) / 16);
    const brow = this.brow;
    this.brow = rowLength ? '|\n'.repeat(rowLength) : '';
    if (brow !== this.brow) {
      this.cdRef.detectChanges();
    }
  }

}
