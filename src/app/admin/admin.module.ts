import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { RecordsDeletionRequestsComponent } from './components/deletion-requests/deletion-requests.component';
import { RecordsPermitRequestsComponent } from './components/permit-requests/permit-requests.component';
import { QuestionnairesComponent } from './components/questionnaires/questionnaires.component';
import { TagsComponent } from './components/tags/tags.component';

@NgModule({
  imports: [AdminRoutingModule, SharedModule, CoreModule],
  declarations: [AdminComponent, RecordsPermitRequestsComponent, RecordsDeletionRequestsComponent, TagsComponent, QuestionnairesComponent],
})
export class AdminModule {}
