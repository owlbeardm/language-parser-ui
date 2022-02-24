import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {timer} from 'rxjs';

@Component({
  selector: 'th[app-vertical-dash]',
  templateUrl: './vertical-dash.component.html',
  styleUrls: ['./vertical-dash.component.css']
})
export class VerticalDashComponent implements OnInit, AfterViewChecked {

  @ViewChild('row') row: any;
  brow = '';
  @Input() symbol?: string;
  deleted = false;

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {
    router.events.subscribe((val) => {
      this.brow = '';
      this.cdRef.detectChanges();
      timer(10).subscribe(() => {
        this.resizeDash();
      });
    });
  }

  ngOnInit(): void {
    console.log('VerticalDashComponent.ngOnInit()');
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.resizeDash();
  }

  ngAfterViewChecked(): void {
    this.resizeDash();
  }

  resizeDash(): void {
    const rowLength = Math.max(0, Math.floor((this.row?.nativeElement.parentNode.offsetHeight) / 16));
    const brow = this.brow;
    this.brow = rowLength ? '|\n'.repeat(rowLength) : '';
    if (brow !== this.brow) {
      this.cdRef.detectChanges();
    }
  }

}
