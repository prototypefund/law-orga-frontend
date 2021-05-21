/*
 * law&orga - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsListComponent } from './pages/record-list/records-list.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { CreateRecordComponent } from './pages/create-record/create-record.component';
import { RecordComponent } from './pages/record/record.component';
import { RecordsPermitRequestsComponent } from './pages/records-permit-requests/records-permit-requests.component';
import { RecordPoolComponent } from './pages/record-pool/record-pool.component';
import { UnsavedGuardService } from '../core/services/unsaved-guard.service';

const recordsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecordsListComponent,
  },
  {
    path: 'add',
    component: CreateRecordComponent,
  },
  {
    path: 'record_pool',
    component: RecordPoolComponent,
  },
  {
    path: 'permit_requests',
    component: RecordsPermitRequestsComponent,
  },
  {
    path: ':id',
    component: RecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(recordsRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService, UnsavedGuardService],
})
export class RecordsRoutingModule {}
