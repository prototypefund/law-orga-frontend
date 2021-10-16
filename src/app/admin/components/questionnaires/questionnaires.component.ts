import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Questionnaire } from 'src/app/recordmanagement/models/questionnaire.model';

@Component({
  templateUrl: './questionnaires.component.html',
})
export class QuestionnairesComponent implements OnInit {
  questionnaires: Questionnaire[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get('api/records/questionnaires/').subscribe((response: Questionnaire[]) => (this.questionnaires = response));
  }
}
