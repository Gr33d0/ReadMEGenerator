export interface CreateElementDTO {
    title: string;
    type: string;
    icon: string;
    value: string;
    html_value: string;
    markdown_value: string;
}

export interface IElement extends CreateElementDTO {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}