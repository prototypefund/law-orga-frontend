import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TagsComponent } from './components/tags/tags.component';
import { QuestionnairesComponent } from './components/questionnaires/questionnaires.component';
import { RecordsDeletionRequestsComponent } from './components/deletion-requests/deletion-requests.component';
import { RecordsPermitRequestsComponent } from './components/permit-requests/permit-requests.component';
import { AdminComponent } from './components/admin/admin.component';
import { QuestionnairesCreateComponent } from './components/questionnaires-create/questionnaires-create.component';
import { QuestionnairesUpdateComponent } from './components/questionnaires-update/questionnaires-update.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'permit-requests',
    component: RecordsPermitRequestsComponent,
  },
  {
    path: 'deletion-requests',
    component: RecordsDeletionRequestsComponent,
  },
  {
    path: 'questionnaires',
    component: QuestionnairesComponent,
  },
  {
    path: 'questionnaires/create',
    component: QuestionnairesCreateComponent,
  },
  {
    path: 'questionnaires/:id/update',
    component: QuestionnairesUpdateComponent,
  },
  {
    path: 'tags',
    component: TagsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
