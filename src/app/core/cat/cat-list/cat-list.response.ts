export class CatListResponse{
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    orderByPropertyName: string;
    sortingDirection: string;
    items: {id:string; name: string; age: number; breed: string }[];
}