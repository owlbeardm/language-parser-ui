import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from 'src/app/components/abstract/abstract-has-language/abstract-has-language.component';
import {LanguagesService} from '../../../api/services/languages.service';
import {LanguageSoundClusters} from '../../../api/models/language-sound-clusters';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent extends AbstractHasLanguageComponent implements OnChanges {

  langsc: LanguageSoundClusters = {};

  constructor(private languagesService: LanguagesService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage.currentValue) {
      console.log(changes, changes.selectedLanguage.currentValue.id, this.selectedLanguage?.id);
      this.refresh();
    }
  }

  private refresh(): void {
    if (this.selectedLanguage?.id) {
      this.languagesService.getLanguageSoundClusters({languageId: this.selectedLanguage?.id}).subscribe((langsc) => {
        langsc.constClusters = langsc.constClusters?.sort((a, b) => b.length - a.length);
        langsc.constClustersStart = langsc.constClustersStart?.sort((a, b) => b.length - a.length);
        langsc.constClustersEnd = langsc.constClustersEnd?.sort((a, b) => b.length - a.length);
        langsc.vowelClusters = langsc.vowelClusters?.sort((a, b) => b.length - a.length);
        langsc.vowelClustersStart = langsc.vowelClustersStart?.sort((a, b) => b.length - a.length);
        langsc.vowelClustersEnd = langsc.vowelClustersEnd?.sort((a, b) => b.length - a.length);
        this.langsc = langsc;
      });
    }
  }
}
