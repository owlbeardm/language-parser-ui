import { Component } from '@angular/core';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent extends AbstractHasLanguage {

  // constructor(langService: LangService, private route: ActivatedRoute, private router: Router) {
  //   super();
  // }

  ngOnInit(): void {
    super.ngOnInit();
  }

  refreshAll() {
    console.log("ClustersComponent", this.selectedLanguage);
  }
}
