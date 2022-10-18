import { useState, useEffect } from 'react'
import { KEY_USER_PROFILE } from 'src/constants/constants'

const store = {
  state: JSON.parse(localStorage.getItem(KEY_USER_PROFILE)) || {},
  setState(value) {
    if (value) {
      this.state = value
      this.setters.forEach((setter) => setter(this.state))
      localStorage.setItem(KEY_USER_PROFILE, JSON.stringify(value))
    }
  },
  setters: [],
}

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store)

// this is the custom hook we'll call on components.
export function useUserProfileStore() {
  const [state, set] = useState(store.state)
  if (!store.setters.includes(set)) {
    store.setters.push(set)
  }

  useEffect(
    () => () => {
      store.setters = store.setters.filter((setter) => setter !== set)
    },
    [],
  )

  return [state, store.setState]
}

export function getApiToken() {
  return store.state?.token || null
}

// For non component usage
export function setUserProfileState(value) {
  store.setState(value)
}

export function getUserProfileState() {
  return store.state
}
