import {Dispatch, Middleware, MiddlewareAPI, StoreEnhancer} from "@reduxjs/toolkit";

export function compose<R>(...args: Function[]): (...args: any[]) => R;

// This function is used to compose multiple functions into one.
// It takes an array of functions and returns a function that is the composition of all those functions.
export function compose(...args: Function[]) {
  if (args.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (args.length === 1) {
    return args[0]
  }

  return args.reduce(
   (a, b) =>
    (...args: any) =>
     a(b(...args))
  )
}

// This is a simplified version of the applyMiddleware function from Redux Toolkit
export function applyMiddlewareTest(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return createStore => (reducer, preloadedState) => {
    // Create a store with the provided reducer and preloaded state.
    const store = createStore(reducer, preloadedState)

    // Initialize dispatch function that throws an error if called before the middleware is applied.
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    // Create a middleware API object that provides the getState and dispatch functions to the middleware.
    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    // Apply each middleware to the middleware API.
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // Compose all the middleware functions into a single dispatch function.
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

    // Return the store enhanced with the new dispatch function.
    return {
      ...store,
      dispatch
    }
  }
}
