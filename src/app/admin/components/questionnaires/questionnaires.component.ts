import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './questionnaires.component.html',
})
export class QuestionnairesComponent {
  constructor(private http: HttpClient, public dialog: MatDialog) {}
}
