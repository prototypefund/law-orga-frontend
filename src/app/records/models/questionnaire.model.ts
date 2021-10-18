export interface Questionnaire {
  id: number;
  rlc: number;
  name: string;
  note: string;
  questionnaire: string;
  allow_file_upload: boolean;
  updated: string;
  created: string;
}

export interface RecordQuestionnaire {
  id: number;
  record: number;
  questionnaire: number;
  answer: string;
  answered: boolean;
  created: string;
  updated: string;
}
