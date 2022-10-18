import axios from 'axios'
import { getApiToken } from 'src/states/userProfileState'
import { setToastState } from 'src/states/toastState'
import { setUserProfileState } from 'src/states/userProfileState'
import { KEY_USER_PROFILE } from 'src/constants/constants'

const version = 'v1'

const instance = axios.create({
  baseURL: `${process.env[`REACT_APP_BASE_API_URL`]}${version}`,
  timeout: 10000,
})

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (getApiToken()) {
    config.headers.Authorization = `Bearer ${getApiToken()}`
  }
  return config
}, undefined)

// Add a response interceptor
instance.interceptors.response.use(
  function (res) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // SESSION TIMEOUT HANDLING

    if (res.status !== 200 && res.status !== 201 && res.data.code !== 200) {
      if (res.data.code === 501) {
        setUserProfileState({})
        localStorage.removeItem(KEY_USER_PROFILE)
      }
      setToastState({ status: 'danger', message: res?.data?.message })
      return Promise.reject(res)
    }
    return res
  },
  function (res) {
    setToastState({ status: 'danger', message: res?.response?.data?.message })
    return Promise.reject(res)
  },
)

const httpRequestGet = (url, config) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => reject(e))
  })
}

const httpRequestPost = (url, body, config) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, body, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => reject(e))
  })
}

const httpRequestPut = (url, body, config) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, body, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => reject(e))
  })
}

const httpRequestDelete = (url, config) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => reject(e))
  })
}

export { httpRequestGet, httpRequestPost, httpRequestPut, httpRequestDelete }
