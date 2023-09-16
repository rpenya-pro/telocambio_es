export interface Thread {
  _id?: string;
  threadTemathic?: string[];
  owner: string;
  publishDate?: Date;
  description?: string;
  isAdultContent?: boolean;
  typeOfThread: string;
  bookTitle?: string;
  author?: string;
  isbn?: string;
  editorial?: string;
  numberEdition?: string;
  yearEdition?: string;
  threadDescription?: string;
  threadImages?: string[];
  vynilTitle?: string;
  artist?: string;
  discography?: string;
  gameTitle?: string;
  threadItemCategory?: string;
  pegy?: string;
  distribuitor?: string;
  comicTitle?: string;
  otherTitle?: string;
  content?: string;
  comments?: string[];
  ownerResponsaCopy?: string;
  qualityStatus?: string;
  qualification?: { rating: number; date: Date }[];
  closedTransaction?: boolean;
}