import { Component, OnInit, ViewChild, AfterViewChecked, HostListener, ChangeDetectorRef } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { Error } from 'src/app/models/error';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewChecked {

  @ViewChild('col') col: any;
  bcol: String = "";
  errors: Error[] = [];

  constructor(private cdRef: ChangeDetectorRef, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.errors.subscribe((errors)=>{
      this.errors = errors;
    })
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
    const coll = Math.floor((this.col?.nativeElement.offsetWidth - 2) / 8);
    const bcol = this.bcol;
    this.bcol = d.substr(0, coll);
    if (bcol != this.bcol) {
      this.cdRef.detectChanges();
    }
  }

  clear(event: Event) {
    event.stopPropagation();
    this.errorService.clearErrors();
  }

}
