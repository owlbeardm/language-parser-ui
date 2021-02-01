import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LanguageName } from 'src/app/api/models';
import { RefreshAll } from 'src/app/interface/refresh-all';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit, RefreshAll {

  selectedLanguage?: LanguageName;

  constructor(private langService: LangService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      console.log("ClustersComponent ", event)
      if (event instanceof NavigationEnd) {
        const lang = this.route.snapshot.queryParamMap.get('lang');
        if (lang && this.langService.isValidLanguageName(lang)) {
          this.selectedLanguage = lang;
        }
        console.log("ClustersComponent NavigationEnd", event)
      }
    })
  }

  refreshAll() {
  }
}
