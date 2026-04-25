export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  readUrl?: string;
  readerType: string;
}

export interface AIHistory {
  word: string;
  context: string;
  response: string;
}
