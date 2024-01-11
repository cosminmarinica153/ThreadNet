
export interface IThread {
    id: number;
    userId: number;
    categoryId: number;
    title: string;
    content: string;
    threadDate: Date;
    isEdited: boolean;
}
