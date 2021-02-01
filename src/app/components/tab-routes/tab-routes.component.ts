import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { KeyBindService } from 'src/app/services/key-bind.service';

@Component({
  selector: 'app-tab-routes',
  templateUrl: './tab-routes.component.html',
  styleUrls: ['./tab-routes.component.css']
})
export class TabRoutesComponent implements OnInit {

  @Input() tabs!: Array<{
    route: string,
    name: string,
    enabled: boolean
  }>;
  selectedIndex: number = 0;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private keybind: KeyBindService) {

  }

  ngOnInit(): void {
    this.correctIndex();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.correctIndex();
      }
    });
    this.navigateIndex(this.selectedIndex);
    const binding$ = this.keybind.match(['TAB'], []).subscribe((event) => {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.tabs.length;
      this.navigateIndex(this.selectedIndex);
    });
  }

  correctIndex() {
    const path = this.activeRoute.snapshot.children[0].routeConfig ?.path;
    this.selectedIndex = this.tabs.reduce((i, tab, curI) => {
      return tab.route == path ? curI : i;
    }, this.selectedIndex)
  }

  select(i: number) {
    this.selectedIndex = i;
  }

  navigateIndex(i: number) {
    const lang = this.activeRoute.snapshot.queryParamMap.get('lang');
    this.router.navigate([this.tabs[i].route,], { relativeTo: this.activeRoute, queryParams: { lang: lang } });
  }

}
