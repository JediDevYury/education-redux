import {ThunkMiddleware} from "@reduxjs/toolkit";

export const Logger: ThunkMiddleware =
 (api) =>
  (next) =>
   (action) => {
     console.log('Logger middleware', action);
     const result = next(action);
     console.log('Logger middleware', action, api.getState());

     return result;
   };
