import { JWTPayload } from 'jose'

export interface IncomeState {
    saveIncomes:{
     docs: [{
     '_id': string,
     'name': string,
     'site': string,
     'whatdo': string,
     'rda': string,
     'exit': boolean,
     'nameEnter': string,
     'dateEnter': string,
     'comments': string,
     'createdAt': string,
     'updatedAt': string,
     '__v': 0
   }
   ],
   totalDocs: number
   limit: number
   totalPages: number
   page: number
   pagingCounter: number
   hasPrevPage:boolean
   hasNextPage:boolean
   prevPage:null | number
   nextPage:null | number
   },

   }

export interface User {
    _id:string,
    userName:string,
    email:string,
    password:string,
    resetPassword:boolean
    role:string,
    name:string,
    lastname:string,
    createdAt:string,
    updatedAt:string,
    __v:number
}

export interface UserArray {
  saveUsers: [{
    _id:string,
    userName:string,
    email:string,
    password:string,
    resetPassword:boolean
    role:string,
    name:string,
    lastname:string,
    createdAt:string,
    updatedAt:string,
    __v:number
  }]
}

export interface AxiosUser {
  message: User,
  status: number,
 }
export interface SaveDataNewIncome {
    name:string
    site:string
    whatdo:string
    rda:string
    exit:boolean
    comments:string
    dateEnter?:string
    dateExit?:string
}

export interface Income {
  '_id': string,
  'name': string,
  'site': string,
  'whatdo': string,
  'rda': string,
  'exit': boolean,
  'nameEnter': string,
  'nameExit'?: string,
  'dateEnter': string,
  'dateExit'?: string,
  'comments': string,
  'createdAt': string,
  'updatedAt': string,
  '__v': 0
}

export interface DataUser {
  name:string
  lastname:string
  userName:string
  role:string

  email:string

}
export interface SaveDataNewUser {
  name:string
  lastname:string
  userName:string
  email: string,
  role:string
  password?:string
  confirmPassword?:string
  recoverpassword?:boolean,
  idUser?: string
}

export interface Login{
  userName:string,
  password:string
}
export interface ChangePassword{
  oldPassword:string,
  newPassword:string
  confirmNewPassword:string
}

export interface BrowserToken {
  exp: number
  iat: number
  name: string
  role: string
  _id:string
  userName: string,
  resetPassword:boolean
}

export interface OpecionsPaginateIncome {
  sort:{}
  page:number
  limit:number
}

export interface token{
  token?: {
    userName?: string,
    role?: string,
    name?: string
  } | string | JWTPayload,
  message?: string
}

export interface respondeIncomes {
  incomes?: any,
  status?: number,
  message?: string,
}

export interface respondoControllers{
  message?: any,
  status: number
}

export interface SubmitUserData {
   name: string,
    lastname: string,
    email: string,
    userName: string,
    role: string,
    password: string,
    _id: string,
}
