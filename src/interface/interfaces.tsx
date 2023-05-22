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
     hasPrevious: boolean,
     hasNext: boolean,
     totalDocs: number
   },

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

export interface Login{
  userName:string,
  password:string
}

export interface OpecionsPaginateIncome {
  sort:{}
  page:number
}

export interface token{
  token?: {
    userName?: string,
    role?: string,
    name?: string
  } | string | JWTPayload,
  message?: string
}
