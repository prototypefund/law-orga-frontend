import { Component, OnInit } from '@angular/core';
import { replaceInArray } from '../../../shared/services/axios';
import { HttpClient } from '@angular/common/http';
import { RecordPermissionRequest } from 'src/app/recordmanagement/models/record_permission.model';

@Component({
  templateUrl: './permit-requests.component.html',
})
export class RecordsPermitRequestsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  requestsDisplayedColumns = ['requestor', 'record', 'date', 'state', 'processor', 'processDate', 'action'];
  requests: RecordPermissionRequest[];

  ngOnInit(): void {
    this.http.get('api/records/record_permission_requests/').subscribe((response: RecordPermissionRequest[]) => (this.requests = response));
  }

  getRequestState(state: string): string {
    switch (state) {
      case 'gr':
        return 'Granted';
      case 're':
        return 'Requested';
      case 'de':
        return 'Declined';
      default:
        return 'Unknown';
    }
  }

  getRequestStateColor(state: string): string {
    switch (state) {
      case 'gr':
        return 'darkgreen';
      case 're':
        return '';
      case 'de':
        return 'darkorange';
      default:
        return 'red';
    }
  }

  onRequestAction(id: number, action: string): void {
    const data = {
      state: action,
    };
    this.http
      .patch(`api/records/record_permission_requests/${id}/`, data)
      .subscribe(
        (response: RecordPermissionRequest) => (this.requests = replaceInArray(this.requests, response) as RecordPermissionRequest[])
      );
  }
}
