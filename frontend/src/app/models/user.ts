export interface LoginInfo{
    email: string,
    password: string,       
}

export interface User{
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: Date,
    address: string,
    picture: string,
    verification: string
}

export interface RegistrationInfo{
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    birthday: Date,
    address: string,
    password: string,
    role: string,
    picture: File,
}

export interface UpdatedUser{
    id: number,
    username: string,
    email: string,
    newpassword: string,
    oldpassword: string,
    firstName: string,
    lastName: string,
    birthday: Date,
    address: string,
    picture: File
}

export interface VerifyOrDeny{
    action: string
}