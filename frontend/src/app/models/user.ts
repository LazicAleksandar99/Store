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
