import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Questionnaire } from 'src/app/recordmanagement/models/questionnaire.model';

@Component({
  templateUrl: './questionnaires-update.component.html',
})
export class QuestionnairesUpdateComponent implements OnInit {
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
  id: number;
  questionnaire: Questionnaire;

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] as number;
      this.http.get(`api/records/questionnaires/${this.id}`).subscribe((response: Questionnaire) => (this.questionnaire = response));
    });
  }

  successful(): void {
    void this.router.navigate(['/admin/questionnaires']);
  }
}
