import {Component, Input, OnInit} from '@angular/core';
import {PingService} from "../../api/services/ping.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-version-footer',
  standalone: true,
  templateUrl: './version-footer.component.html',
  styleUrls: ['./version-footer.component.css'],
  imports: [NgIf]
})
export class VersionFooterComponent implements OnInit {

  @Input() version!: string;
  year?: string;
  apiVersion?: string;

  constructor(private pingService: PingService) {
  }

  ngOnInit(): void {
    const now = new Date().getFullYear();
    if (now !== 2022) {
      this.year = `2022–${now}`;
    } else {
      this.year = `${now}`;
    }
    this.pingService.version().subscribe(version => this.apiVersion = version);
  }

}
