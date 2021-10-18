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

import { Tag } from './tag.model';
import { State } from '../../core/models/state.model';

export class TokenRecord {
  constructor(public id: number, public token: string) {
    this.id = id;
    this.token = token;
  }

  static getTokenRecordFromJson(json: any): TokenRecord {
    if (!json) {
      return new TokenRecord(-1, 'DELETED');
    }
    return new TokenRecord(json.id, json.record_token);
  }
}

export interface NewRestrictedRecord {
  id: number;
  state: string;
  created_on: string;
  last_edited: string;
  record_token: string;
  tagged: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  working_on_record: { id: number; name: string; email: string }[];
  official_note: string;
  access: boolean;
}

export class RestrictedRecord extends TokenRecord {
  constructor(
    id: number,
    token: string,
    public last_contact_date: Date,
    public state: string,
    public record_token: string,
    public tags: Tag[],
    public working_on_record: [number, string],
    public official_note: string,
    public is_restricted: boolean
  ) {
    super(id, token);
    this.id = id;
    this.token = token;
    this.record_token = token;
    this.last_contact_date = last_contact_date;

    if (state.length > 2) {
      this.state = State.getStateAbbreviationFromDirtyString(state);
    } else {
      this.state = state;
    }
    this.tags = tags;
    this.working_on_record = working_on_record;
    this.official_note = official_note;
    this.is_restricted = is_restricted;
  }
}

export class FullRecord extends RestrictedRecord {
  constructor(
    id: number,
    token: string,
    last_contact_date: Date,
    state: string,
    tags: Tag[],
    working_on_record: [number, string],
    official_note: string,
    public created_on: Date,
    public last_edited: Date,
    public first_contact_date: Date,
    public note: string,
    public from_rlc: number,
    public client: number,
    public first_consultation: Date,
    public consultant_team: string,
    public lawyer: string,
    public related_persons: string,
    public contact: string,
    public bamf_token: string,
    public foreign_token: string,
    public first_correspondence: string,
    public circumstances: string,
    public next_steps: string,
    public status_described: string,
    public additional_facts: string
  ) {
    super(id, token, last_contact_date, state, token, tags, working_on_record, official_note, false);
    this.created_on = created_on;
    this.last_edited = last_edited;
    this.first_contact_date = first_contact_date;
    this.note = note;
    this.from_rlc = from_rlc;
    this.client = client;
    this.first_consultation = first_consultation;
    this.contact = contact;
    this.circumstances = circumstances;
    this.consultant_team = consultant_team;
    this.lawyer = lawyer;
    this.related_persons = related_persons;
    this.bamf_token = bamf_token;
    this.foreign_token = foreign_token;
    this.first_correspondence = first_correspondence;
    this.next_steps = next_steps;
    this.status_described = status_described;
    this.additional_facts = additional_facts;
  }
}
