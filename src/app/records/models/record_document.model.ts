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

export class NameRecordDocument {
  constructor(public id: number, public name: string) {
    this.id = id;
    this.name = name;
  }
}

export class RecordDocument extends NameRecordDocument {
  constructor(
    id: number,
    name: string,
    public creator: string,
    public created_on: Date,
    public last_edited: Date,
    public file_size: number,
    public tags: Tag[]
  ) {
    super(id, name);
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.created_on = created_on;
    this.last_edited = last_edited;
    this.file_size = file_size;
    this.tags = tags;
  }
}
