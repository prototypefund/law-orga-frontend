import { NgModule } from '@angular/core';
import { RecordsRoutingModule } from './records-routing.module';
import { RecordsListComponent } from './components/records-list/records-list.component';
import { CreateRecordComponent } from './components/records-create/create-record.component';
import { SharedModule } from '../shared/shared.module';
import { RecordComponent } from './components/records-detail/records-detail.component';
import { RecordPoolComponent } from './components/records-pool/record-pool.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [RecordsRoutingModule, SharedModule, CoreModule],
  declarations: [RecordsListComponent, CreateRecordComponent, RecordComponent, RecordPoolComponent],
  providers: [],
})
export class RecordsModule {}
