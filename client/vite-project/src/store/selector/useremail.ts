import {selector} from "recoil"
import { userState } from "../atom/user";
export const useremail = selector({
    key: 'useremail',
    get: ({get}) => {
      const resp = get(userState);
  
      return resp.userEmail;
    },
  });
  