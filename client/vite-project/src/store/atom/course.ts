  import {atom} from "recoil"
  export interface Courses{
    _id:string,
    title:string,
    description:string,
    price:string,
    published:string,
    organiser:string,
    image:string
  }
export const courseState = atom<{isLoading:boolean,course:Courses|null}>({
    key: 'courseState',
    default:{
        isLoading:true,
        course:null
    },
  });