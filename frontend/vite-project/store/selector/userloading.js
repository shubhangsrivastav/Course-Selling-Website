import {selector} from "recoil"
import { userState } from "../atom/user";
export const userloading = selector({
    key: 'userloading', 
    get: ({get}) => {
      const  resp= get(userState);
  
      return resp.isLoading;
    },
  });