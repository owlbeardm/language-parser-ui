import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageName } from '../api/models';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  selectedLanguage?: LanguageName;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  changeLang(): void {
    this.router.navigate([], {
      queryParams: this.selectedLanguage ? { lang: this.selectedLanguage } : {},
      relativeTo: this.route
    });
    // this.refreshAll();
  }

}
