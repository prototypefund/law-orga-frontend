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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

const hash = require('object-hash');
import { FullRecord } from '../../../models/record.model';
import { RecordsSandboxService } from '../../../services/records-sandbox.service';
import { FullClient } from '../../../models/client.model';
import { OriginCountry } from '../../../models/country.model';
import { FormControl, FormGroup } from '@angular/forms';
import { RecordDocument } from '../../../models/record_document.model';
import { RecordMessage } from '../../../models/record_message.model';
import { Tag } from '../../../models/tag.model';
import { State } from '../../../../core/models/state.model';
import { CoreSandboxService } from '../../../../core/services/core-sandbox.service';
import { dateInPastValidator } from '../../../../statics/validators.statics';
import { alphabeticalSorterByField } from '../../../../shared/other/sorter-helper';
import { tap } from 'rxjs/internal/operators/tap';
import { SharedSandboxService } from '../../../../shared/services/shared-sandbox.service';
import { RlcSettings } from '../../../../core/models/rlc_settings.model';

@Component({
    selector: 'app-full-record-detail',
    templateUrl: './full-record-detail.component.html',
    styleUrls: ['./full-record-detail.component.scss']
})
export class FullRecordDetailComponent implements OnInit, OnDestroy {
    allCountries: Observable<OriginCountry[]>;
    originCountryError: any;
    givenOriginCountry: OriginCountry;

    allRecordTags: Observable<Tag[]>;
    recordTagErrors: any;

    allRecordStates: Observable<State[]>;
    givenRecordState: State;

    record: FullRecord;
    client: FullClient;
    origin_country: OriginCountry;
    record_documents: RecordDocument[];
    record_messages: RecordMessage[];

    recordEditForm: FormGroup;
    user_working_on_record = false;
    rlc_options = {
        show_yielding: false,
    };

    settingsSubscription: Subscription;
    specialRecordSubscription: Subscription;

    constructor(private recordSB: RecordsSandboxService, private coreSB: CoreSandboxService, private sharedSB: SharedSandboxService) {
        this.recordEditForm = new FormGroup({
            client_name: new FormControl(''),
            client_birthday: new FormControl('', [dateInPastValidator]),
            client_phone: new FormControl(''),
            client_note: new FormControl(''),
            note: new FormControl(''),
            official_note: new FormControl(''),
            last_contact_date: new FormControl('', [dateInPastValidator]),
            state: new FormControl(''),
            consultant_team: new FormControl(''),
            lawyer: new FormControl(''),
            related_persons: new FormControl(''),
            contact: new FormControl(''),
            bamf_token: new FormControl(''),
            foreign_token: new FormControl(''),
            first_correspondence: new FormControl(''),
            circumstances: new FormControl(''),
            next_steps: new FormControl(''),
            status_described: new FormControl(''),
            additional_facts: new FormControl('')
        });
    }

    ngOnDestroy() {
        this.recordSB.resetFullClientInformation();
        this.settingsSubscription.unsubscribe();
        this.specialRecordSubscription.unsubscribe();
    }

    ngOnInit() {
        this.allCountries = this.recordSB.getOriginCountries();
        this.allRecordTags = this.recordSB.getRecordTags().pipe(
            tap(results => {
                alphabeticalSorterByField(results, 'name');
            })
        );
        this.allRecordStates = this.recordSB.getRecordStates();

        // there but not changeable
        // first_contact_date, last_edited, token
        this.specialRecordSubscription = this.recordSB
            .getSpecialRecord()
            .subscribe(
                (special_record: {
                    record: FullRecord;
                    client: FullClient;
                    origin_country: OriginCountry;
                    record_documents: RecordDocument[];
                    record_messages: RecordMessage[];
                }) => {
                    console.log('special record subscription happening');
                    this.record = special_record.record;
                    this.client = special_record.client;

                    this.origin_country = special_record.origin_country;
                    this.record_documents = Object.values(
                        special_record.record_documents
                    );
                    this.record_messages = Object.values(
                        special_record.record_messages
                    );

                    if (this.client && this.record) this.loadValues();
                }
            );

        this.settingsSubscription = this.coreSB.getRlcSettings().subscribe((settings: RlcSettings) => {
            if (settings && settings.recordPoolEnabled){
                this.rlc_options.show_yielding = true;
            }
        });
    }

    loadValues() {
        this.recordEditForm.controls['client_name'].setValue(this.client.name);
        this.recordEditForm.controls['client_birthday'].setValue(
            this.client.birthday
        );
        this.recordEditForm.controls['client_phone'].setValue(
            this.client.phone_number
        );
        this.recordEditForm.controls['client_note'].setValue(this.client.note);

        this.recordEditForm.controls['official_note'].setValue(
            this.record.official_note
        );
        this.recordEditForm.controls['state'].setValue(this.record.state);
        this.recordEditForm.controls['note'].setValue(this.record.note);
        this.recordEditForm.controls['contact'].setValue(this.record.contact);
        this.recordEditForm.controls['bamf_token'].setValue(
            this.record.bamf_token
        );
        this.recordEditForm.controls['foreign_token'].setValue(
            this.record.foreign_token
        );
        this.recordEditForm.controls['first_correspondence'].setValue(
            this.record.first_correspondence
        );
        this.recordEditForm.controls['circumstances'].setValue(
            this.record.circumstances
        );
        this.recordEditForm.controls['lawyer'].setValue(this.record.lawyer);
        this.recordEditForm.controls['related_persons'].setValue(
            this.record.related_persons
        );
        this.recordEditForm.controls['consultant_team'].setValue(
            this.record.consultant_team
        );
        this.recordEditForm.controls['last_contact_date'].setValue(
            this.record.last_contact_date
        );
        this.recordEditForm.controls['additional_facts'].setValue(
            this.record.additional_facts
        );
        this.recordEditForm.controls['next_steps'].setValue(
            this.record.next_steps
        );
        this.recordEditForm.controls['status_described'].setValue(
            this.record.status_described
        );

        this.givenOriginCountry = this.recordSB.getOriginCountryById(
            this.client.origin_country
        );
        this.givenRecordState = this.recordSB.getRecordStateByAbbreviation(
            this.record.state
        );

        this.coreSB.getUser().subscribe((user) => {
            this.record.working_on_record.forEach((currentUser) => {
                if (currentUser['id'] === user.id)
                    this.user_working_on_record = true;
            })
        });
        console.log('hash before: ', hash(this.recordEditForm.getRawValue()));
    }

    onSaveClick() {
        this.record.note = this.recordEditForm.value['note'];
        this.record.related_persons = this.recordEditForm.value[
            'related_persons'
            ];
        this.record.contact = this.recordEditForm.value['contact'];
        this.record.last_contact_date = CoreSandboxService.transformDate(
            this.recordEditForm.value['last_contact_date']
        );
        this.record.official_note = this.recordEditForm.value['official_note'];
        this.record.bamf_token = this.recordEditForm.value['bamf_token'];
        this.record.foreign_token = this.recordEditForm.value['foreign_token'];
        this.record.additional_facts = this.recordEditForm.value[
            'additional_facts'
            ];
        this.record.first_correspondence = this.recordEditForm.value[
            'first_correspondence'
            ];
        this.record.circumstances = this.recordEditForm.value['circumstances'];
        this.record.lawyer = this.recordEditForm.value['lawyer'];
        this.record.related_persons = this.recordEditForm.value[
            'related_persons'
            ];
        this.record.consultant_team = this.recordEditForm.value[
            'consultant_team'
            ];
        this.record.next_steps = this.recordEditForm.value['next_steps'];
        this.record.status_described = this.recordEditForm.value[
            'status_described'
            ];

        this.client.note = this.recordEditForm.value['client_note'];
        this.client.name = this.recordEditForm.value['client_name'];
        this.client.birthday = CoreSandboxService.transformDate(
            this.recordEditForm.value['client_birthday']
        );
        this.client.origin_country = this.origin_country.id;
        this.client.phone_number = this.recordEditForm.value['client_phone'];

        this.recordSB.startSavingRecord(this.record, this.client);
    }

    onBackClick() {
        // this.recordSB.goBack();
        const time = new Date();
        console.log('start: ', time.getTime());
        console.log('new hash: ', hash(this.recordEditForm.getRawValue()));
        const diff = new Date().getTime() - time.getTime();
        console.log('diff: ', diff);
    }

    onSelectedOriginCountryChanged(newOriginCountry: OriginCountry): void {
        this.origin_country = newOriginCountry;
        this.client.origin_country = newOriginCountry.id;
    }

    onSelectedRecordTagsChanged(newTags: Tag[]): void {
        this.record.tags = newTags;
        if (newTags.length === 0) {
            this.recordTagErrors = { null: 'true' };
        } else {
            this.recordTagErrors = null;
        }
    }

    onSelectedRecordStateChanged(event: State): void {
        this.record.state = event.abbreviation;
    }

    adjustTextAreaHeight(o) {
        o.style.height = '1px';
        o.style.height = 25 + o.scrollHeight + 'px';
    }

    downloadAllRecordDocuments(event) {
        event.stopPropagation();
        this.recordSB.downloadAllRecordDocuments();
    }

    onChangeRecordTokenClick() {
        this.sharedSB.openEditTextDialog({
            short: true,
            descriptionLabel: 'record token',
            text: this.record.token,
            descriptionText: 'please enter new record token'
        }, (newToken: string) => {
            if (newToken) {
                this.record.token = newToken;
                this.record.last_contact_date = CoreSandboxService.transformDate(
                    this.recordEditForm.value['last_contact_date']
                );
                this.client.birthday = CoreSandboxService.transformDate(
                    this.recordEditForm.value['client_birthday']
                );
                this.recordSB.startSavingRecord(this.record, this.client);
            }
        });
    }

    onRequestRecordDeletionClick() {
        this.sharedSB.openEditTextDialog({
            short: false,
            descriptionLabel: 'record deletion',
            text: '',
            descriptionText: 'please explain why you want to delete this record',
            saveLabel: 'delete',
            saveColor: 'warn'
        }, (deletion_description: string) => {
            if (deletion_description) {
                this.sharedSB.openConfirmDialog({
                    description: 'are you sure you want to delete the record?',
                    confirmLabel: 'delete',
                    confirmColor: 'warn'
                }, (delete_record: boolean) => {
                    if (delete_record) {
                        this.recordSB.startRequestingRecordDeletion(this.record, deletion_description);
                    }
                });
            }

        });
    }

    onYieldingRecordClick() {
        this.sharedSB.openConfirmDialog({
            confirmLabel: 'sure',
            cancelLabel: 'cancel',
            description: 'are you sure you want to yield from record?',
            title: 'Yield Record',
            confirmColor: 'warn'
        }, (result) => {
            if (result){
                // yield record
                this.recordSB.startYieldingRecord(this.record);
            }
        });
    }
}
