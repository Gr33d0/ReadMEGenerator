export interface IElement {
  _id?: string; // gerado automaticamente pelo MongoDB
  tagHtml: string;
  tagMarkDown: string;
  value: string;
  align?: 'left' | 'center' | 'right' | string; // pode restringir se quiser
}

export interface IList {
  _id?: string;
  name: string;
  elements: IElement[];
  user?: string;
  createdAt?: string | Date;
}
