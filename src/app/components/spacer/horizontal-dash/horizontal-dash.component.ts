import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {timer} from 'rxjs';

@Component({
  selector: 'th[app-horizontal-dash]',
  standalone: true,
  templateUrl: './horizontal-dash.component.html',
  styleUrls: ['./horizontal-dash.component.css']
})
export class HorizontalDashComponent implements OnInit, AfterViewChecked {

  @ViewChild('col') col: any;
  bcol = '';
  @Input() symbol?: string;

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {
    // router.events.subscribe((val) => {
    //   this.bcol = '';
    //   this.cdRef.detectChanges();
    //   timer(10).subscribe(() => {
    //     this.resizeDash();
    //   });
    // });
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.resizeDash();
  }

  ngAfterViewChecked(): void {
    this.resizeDash();
  }

  resizeDash(): void {
    const colLength = Math.max(0, Math.floor((this.col?.nativeElement.offsetWidth - 1) / 8));
    const bcol = this.bcol;
    const symbol = this.symbol ? this.symbol : '-';
    this.bcol = colLength ? symbol.repeat(colLength) : '';
    if (bcol !== this.bcol) {
      this.cdRef.detectChanges();
    }
  }

}
