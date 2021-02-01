import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyBindService } from 'src/app/services/key-bind.service';

@Component({
  selector: 'app-tab-routes',
  templateUrl: './tab-routes.component.html',
  styleUrls: ['./tab-routes.component.css']
})
export class TabRoutesComponent implements OnInit {

  @Input() tabs!: Array<any>;
  selectedIndex: number = 0;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private keybind: KeyBindService) {
  }

  ngOnInit(): void {
    this.navigateIndex(this.selectedIndex);
    const binding$ = this.keybind.match(['TAB'], ['altKey']).subscribe(() => {
      this.selectedIndex = (this.selectedIndex + 1) % this.tabs.length;
      this.navigateIndex(this.selectedIndex);
    });
  }

  select(i: number) {
    this.selectedIndex = i;
  }

  navigateIndex(i: number) {
    const lang = this.activeRoute.snapshot.queryParamMap.get('lang');
    this.router.navigate([this.tabs[i].route,], { relativeTo: this.activeRoute, queryParams: { lang: lang } });
  }

}
