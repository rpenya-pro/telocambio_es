interface Eventos {
  _id: string;
  eventId: string;
  slugEvent: string;
  titleEvent: string;
  publishedEvent: boolean;
  dateEvent: Date;
  imagesEvent?: string[];
  tagsEvent?: string[];
  sourceEvent: string;
  publishedBy: string;
  contentEvent: string;
  urlEvent?: string;
}

export default Eventos;
