import {atom} from "recoil"
export const userState = atom<{isLoading:boolean,userEmail:String|null}>({
    key: 'userState',
    default:{
        isLoading:true,
        userEmail:null
    },
  });
  