import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//TODO: add new api
// import { ApiService } from 'src/app/api/services';
import { AbstractHasLanguageComponent } from 'src/app/components/abstract/abstract-has-language/abstract-has-language.component';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent extends AbstractHasLanguageComponent {


  clusters?: string[];
  startClusters?: string[];
  lastClusters?: string[];

  constructor(
    // private apiService: ApiService,
    _langService: LangService,
    _route: ActivatedRoute,
    _router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  refreshAll() {
    // if (this.selectedLanguage) {
      //TODO: add new api
      // this.apiService.getApiWordsConstclustersLang({ lang: this.selectedLanguage }).subscribe((clusters) => this.clusters = clusters.filter((c) => !!c));
      // this.apiService.getApiWordsConstclustersLang({ lang: this.selectedLanguage, clusterType: 'StartingCluster' }).subscribe((clusters) => this.startClusters = clusters);
      // this.apiService.getApiWordsConstclustersLang({ lang: this.selectedLanguage, clusterType: 'LastClusters' }).subscribe((clusters) => this.lastClusters = clusters);
    // }
  }
}
