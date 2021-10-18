import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './questionnaires-upload.component.html',
})
export class QuestionnairesUploadComponent {
  fields = [
    {
      label: 'Code',
      name: 'code',
      tag: 'input',
      type: 'text',
    },
  ];

  constructor(private router: Router) {}

  redirect(data: { code: string }): void {
    void this.router.navigate([`/records/upload/${data.code}`]);
  }
}
