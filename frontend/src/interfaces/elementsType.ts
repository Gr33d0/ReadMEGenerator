export interface IElement {
  _id?: string; // gerado automaticamente pelo MongoDB
  tagHtml: string;
  tagMarkDown: string;
  value: string;
  
}

export interface IList {
  _id?: string;
  name: string;
  elements: IElement[];
  align?: 'left' | 'center' | 'right' | string; // pode restringir se quiser
  height?: string;
  spacing?: string;
  user?: string;
  createdAt?: string | Date;
}
