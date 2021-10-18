import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Questionnaire } from 'src/app/records/models/questionnaire.model';
import { removeFromArray } from 'src/app/shared/services/axios';
import { SharedSandboxService } from 'src/app/shared/services/shared-sandbox.service';

@Component({
  templateUrl: './questionnaires.component.html',
})
export class QuestionnairesComponent implements OnInit {
  questionnaires: Questionnaire[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog, private sharedSB: SharedSandboxService) {}

  ngOnInit(): void {
    this.http.get('api/records/questionnaires/').subscribe((response: Questionnaire[]) => (this.questionnaires = response));
  }

  deleteQuestionnaire(id: number): void {
    this.sharedSB.openConfirmDialog(
      {
        title: 'Delete Questionnaire',
        description: 'Are you sure you want to delete this questionnaire?',
        confirmLabel: 'Delete',
        confirmColor: 'warn',
      },
      (remove: boolean) => {
        if (remove) {
          this.http.delete(`api/records/questionnaires/${id}/`).subscribe(() => {
            this.questionnaires = removeFromArray(this.questionnaires, id) as Questionnaire[];
          });
        }
      }
    );
  }
}
