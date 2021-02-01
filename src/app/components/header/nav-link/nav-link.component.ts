import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyNames } from 'src/app/models/keys';
import { KeyBindService } from 'src/app/services/key-bind.service';

@Component({
  selector: 'app-header-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.css']
})
export class NavLinkComponent implements OnInit {

  @Input() route!: string;
  @Input() name!: string;
  @Input() key!: KeyNames;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private keybind: KeyBindService) {
  }

  ngOnInit(): void {
    const binding$ = this.keybind.match([this.key], ['altKey']).subscribe((event) => {
      event.preventDefault();
      const lang = this.activeRoute.snapshot.queryParamMap.get('lang');
      this.router.navigate([this.route,], { queryParams: { lang: lang } });
    });
  }

}
