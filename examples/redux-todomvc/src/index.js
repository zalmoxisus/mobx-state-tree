import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import 'todomvc-app-css/index.css'

import { Provider } from 'react-redux'
import todosFactory from './models/todos'
import { asReduxStore } from 'mobx-state-tree'

const initialState = {
    todos: [{
        text: 'learn mobx-state-tree',
        completed: false,
        id: 0
    }]
}
const todos = window.todos = todosFactory(initialState)
const store = asReduxStore(todos)

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  const reducer = (state, action) => {
    const { type, ...rest } = action
    if (todos[type]) todos[type].call(this,rest)
    return [...todos.todos]
  }
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__(reducer, [...todos.todos])
  devTools.subscribe(() => {
    todos.todos.replace(devTools.getState())
  })
  store.dispatch = action => {
    devTools.dispatch(action)
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
