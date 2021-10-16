import { RestrictedGroup } from 'src/app/core/models/group.model';
import { HasPermission, Permission } from 'src/app/core/models/permission.model';
import { IUser } from 'src/app/core/models/user.model';
import { IFile } from 'src/app/filemanagement/models/file.model';
import { Folder } from 'src/app/filemanagement/models/folder.model';
import { FolderPermission } from 'src/app/filemanagement/models/folder_permission.model';
import { Message } from 'src/app/recordmanagement/models/message.model';
import { Questionnaire } from 'src/app/recordmanagement/models/questionnaire.model';
import { RecordDeletionRequest } from 'src/app/recordmanagement/models/record_deletion_request.model';
import { RecordDocument } from 'src/app/recordmanagement/models/record_document.model';
import { RecordPermissionRequest } from 'src/app/recordmanagement/models/record_permission.model';
import { Tag } from 'src/app/recordmanagement/models/tag.model';

// types
export interface DjangoError {
  detail?: string;
  non_field_errors?: Array<string>;
}

// useful stuff
export interface BaseModel {
  id: number | string;
  [key: string]: unknown;
}
export type DjangoModel =
  | BaseModel
  | IUser
  | HasPermission
  | Permission
  | RestrictedGroup
  | Message
  | RecordDocument
  | RecordPermissionRequest
  | RecordDeletionRequest
  | IFile
  | Folder
  | FolderPermission
  | Tag
  | Questionnaire;

export interface SubmitData {
  [key: string]: string | number;
}

export const removeFromArray = (array: DjangoModel[], id: number): DjangoModel[] => {
  const newArray = array.filter((item) => item.id !== id);
  return newArray;
};

export const addToArray = (array: DjangoModel[], data: DjangoModel): DjangoModel[] => {
  array.push(data);
  return [...array];
};

export const replaceInArray = (array: DjangoModel[], data: DjangoModel): DjangoModel[] => {
  const index = array.findIndex((item) => item.id === data.id);
  array.splice(index, 1, data);
  return [...array];
};
