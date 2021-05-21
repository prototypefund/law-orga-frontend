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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordsRoutingModule } from './records-routing.module';
import { RecordsListComponent } from './pages/record-list/records-list.component';
import { CreateRecordComponent } from './pages/create-record/create-record.component';
import { SharedModule } from '../shared/shared.module';
import { RecordComponent } from './pages/record/record.component';
import { RecordsPermitRequestsComponent } from './pages/records-permit-requests/records-permit-requests.component';
import { RecordPoolComponent } from './pages/record-pool/record-pool.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [RecordsRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, CoreModule],
  declarations: [RecordsListComponent, CreateRecordComponent, RecordComponent, RecordsPermitRequestsComponent, RecordPoolComponent],
  providers: [],
})
export class RecordsModule {}
