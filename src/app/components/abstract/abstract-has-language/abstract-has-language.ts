import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RefreshAll } from 'src/app/interface/refresh-all';
//TODO: add new api
// import { LanguageName } from "../../../api/models";
import { LangService } from "../../../services/lang.service";


@Component({ template: '' })
export class AbstractHasLanguage implements OnInit, RefreshAll {

    // selectedLanguage?: LanguageName;

    constructor(private langService: LangService, private _route: ActivatedRoute, private _router: Router) {
    }

    ngOnInit(): void {
        const lang = this._route.snapshot.queryParamMap.get('lang');
        // if (lang && this.langService.isValidLanguageName(lang)) {
        //     this.selectedLanguage = lang;
        //     this.changeLang(this.selectedLanguage);
        // }
        // TODO: add new api
        // this.langService.selectedLanguage.subscribe((selectedLanguage) => {
        //     this.selectedLanguage = selectedLanguage;
        //     this._router.navigate([], {
        //         queryParams: this.selectedLanguage ? { lang: this.selectedLanguage } : {},
        //         relativeTo: this._route,
        //         queryParamsHandling: 'merge'
        //     });
        //     this.refreshAll();
        // });
    }

    changeLang(selectedLanguage: any /*LanguageName*/ | undefined): void {
        this.langService.changeSelectedLanguage(selectedLanguage);
    }

    refreshAll(): void { };
}
