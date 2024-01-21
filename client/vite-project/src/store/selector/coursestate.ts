import {selector} from "recoil"
import { courseState } from "../atom/course";
export const titleState = selector({
    key: 'titleState',
    get: ({get}) => {
      const resp = get(courseState);
      if(resp.course){
      return resp.course.title;}
      else{
        return "";
      }
    },
  });
export const descriptionState = selector({
    key: 'descriptionState',
    get: ({get}) => {
      const resp = get(courseState);
      if(resp.course){
      return resp.course.description;}
      else{
        return "";
      }
    },
  });
export const priceState = selector({
    key: 'priceState',
    get: ({get}) => {
      const resp = get(courseState);
      if(resp.course){
      return resp.course.price;}
      else{
        return "";
      }
    },
  });
export const publishedState = selector({
    key: 'pubishedState',
    get: ({get}) => {
      const resp = get(courseState);
     if(resp.course)
      return resp.course.published;
      else{
        return "";
      }
    },
  });
export const imageState = selector({
    key: 'imageState',
    get: ({get}) => {
      const resp = get(courseState);
      if(resp.course)
      return resp.course.image;
      else{
        return "";
      }
    },
  });
export const organiserState = selector({
    key: 'organiserState',
    get: ({get}) => {
      const resp = get(courseState);
      if(resp.course)
      return resp.course.organiser;
      else{
        return "";
      }
    },
  });
  