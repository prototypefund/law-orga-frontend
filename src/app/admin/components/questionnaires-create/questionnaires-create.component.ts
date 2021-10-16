import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './questionnaires-create.component.html',
})
export class QuestionnairesCreateComponent {
  fields = [
    {
      label: 'Name',
      name: 'name',
      tag: 'input',
    },
    {
      label: 'Questionnaire',
      name: 'questionnaire',
      tag: 'textarea',
      rows: 10,
      placeholder: 'Question 1: \n-- Answer here -- \n\n Question 2: \n-- Answer here --\n\n',
    },
  ];

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) {}

  successful(): void {
    void this.router.navigate(['/admin/questionnaires']);
  }
}
