import {Component, OnInit} from '@angular/core';
import {LanguagesEvolutionService} from "../../../api/services/languages-evolution.service";
import {LanguageConnection} from "../../../api/models/language-connection";
import {LanguageConnectionType} from "../../../api/models/language-connection-type";
import {CategoryEvolutionTableComponent} from "./category-evolution-table/category-evolution-table.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-evolution',
  standalone: true,
  templateUrl: './category-evolution.component.html',
  styleUrls: ['./category-evolution.component.css'],
  imports: [CategoryEvolutionTableComponent, FormsModule]
})
export class CategoryEvolutionComponent implements OnInit {

  connections: LanguageConnection[] = [];
  connection: LanguageConnection | undefined;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
    this.languagesEvolutionService.getConnections().subscribe((connections) => {
      this.connections = connections.sort((a, b) => {
        let result = 0;
        if (a.langFrom?.displayName && b.langFrom?.displayName)
          result = a.langFrom?.displayName.localeCompare(b.langFrom.displayName)
        if (!result && a.langTo?.displayName && b.langTo?.displayName)
          result = a.langTo?.displayName.localeCompare(b.langTo.displayName)
        return result;
      });
    });
  }

  getConnectionText(connection: LanguageConnection) {
    return `${connection.langFrom?.displayName} -> ${connection.langTo?.displayName} (${this.getConnectionTypeText(connection.connectionType)})`;
  }

  getConnectionTypeText(type: LanguageConnectionType | undefined) {
    switch (type) {
      case LanguageConnectionType.Borrowing:
        return 'Borrowing';
      case LanguageConnectionType.Evolving:
        return 'Evolving';
      case LanguageConnectionType.Derivation:
        return 'Derivation';
      default:
        return 'Unknown connection';
    }
  }

  changeConnection(param: { connection: LanguageConnection | undefined }) {
    console.log("changeConnection", param.connection);
  }
}
