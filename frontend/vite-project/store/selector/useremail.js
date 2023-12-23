import {selector} from "recoil"
import { userState } from "../atom/user";
export const useremail = selector({
    key: 'useremail', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const resp = get(userState);
  
      return resp.userEmail;
    },
  });
  