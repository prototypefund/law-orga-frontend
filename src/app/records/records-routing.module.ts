import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsListComponent } from './components/records-list/records-list.component';
import { CreateRecordComponent } from './components/records-create/create-record.component';
import { RecordComponent } from './components/records-detail/records-detail.component';
import { RecordPoolComponent } from './components/records-pool/record-pool.component';
import { QuestionnairesUploadComponent } from './components/questionnaires-upload/questionnaires-upload.component';
import { QuestionnairesDetailComponent } from './components/questionnaires-detail/questionnaires-detail.component';

const recordsRoutes: Routes = [
  {
    path: '',
    component: RecordsListComponent,
  },
  {
    path: 'add',
    component: CreateRecordComponent,
  },
  {
    path: 'pool',
    component: RecordPoolComponent,
  },
  {
    path: 'upload',
    component: QuestionnairesUploadComponent,
  },
  {
    path: 'upload/:code',
    component: QuestionnairesDetailComponent,
  },
  {
    path: ':id',
    component: RecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(recordsRoutes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
