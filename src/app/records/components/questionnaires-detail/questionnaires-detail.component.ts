import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Questionnaire, RecordQuestionnaire } from '../../models/questionnaire.model';

@Component({
  templateUrl: './questionnaires-detail.component.html',
})
export class QuestionnairesDetailComponent implements OnInit {
  recordQuestionnaire: RecordQuestionnaire;
  questionnaire: Questionnaire;
  fields = [
    {
      tag: 'textarea',
      label: 'Questions',
      name: 'answer',
      required: true,
      initial: '',
    },
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getRecordQuestionnaire(params.code as string);
    });
  }

  getRecordQuestionnaire(code: string): void {
    this.http.get(`api/records/record_questionnaires/${code}/`).subscribe((response: RecordQuestionnaire) => {
      this.recordQuestionnaire = response;
      this.questionnaire = this.recordQuestionnaire.questionnaire as Questionnaire;
      this.recordQuestionnaire.questionnaire = this.questionnaire.id;
      this.recordQuestionnaire.answer = this.recordQuestionnaire.answer || this.questionnaire.questionnaire;
    });
  }
}
