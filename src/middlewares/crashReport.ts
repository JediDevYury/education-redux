import {ThunkMiddleware} from "@reduxjs/toolkit";

const logErrorToService = (err: Error, user: unknown) => {
  // This is just a fake function that simulates an API call to an error logging service.
  console.log('Error logged:', err.message)
  console.log('User:', user)
}

const isError = (err: unknown): err is Error => err instanceof Error;

export const crashReporter: ThunkMiddleware = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    logErrorToService(isError(err) ? err : new Error('An error occurred'), store.getState().user)
    throw err
  }
}
