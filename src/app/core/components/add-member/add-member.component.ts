import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FullUser } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'add-member',
  templateUrl: 'add-member.component.html',
})
export class AddMemberComponent implements OnInit {
  members: FullUser[];
  selectedMember: number;

  constructor(public dialogRef: MatDialogRef<AddMemberComponent>, public http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('api/profiles/').subscribe((response: FullUser[]) => (this.members = response));
  }
}
