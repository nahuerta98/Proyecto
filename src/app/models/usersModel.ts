export interface UsersList {
    data: [User],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
}
export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    roleId: string,
    active: boolean,
    createAt: string
}