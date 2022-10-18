// API URLS
export const WS_LOGIN = '/auth/login'
export const WS_SIGNUP = '/auth/signup'
export const WS_BOOKMARKS = '/bookmarks'
export const WS_BOOKMARKS_OWN = '/bookmarks/own'
export const WS_ACTIVITIES = '/activities'
export const WS_NOTIFICATIONS_OWN = '/notifications/own'
export const WS_NOTIFICATIONS_BULKREAD = '/notifications/bulkRead'
export const WS_NOTIFICATIONS_READALL = '/notifications/readAll'
export const WS_NOTIFICATIONS_COUNT = '/notifications/own/unread'

export const WS_COLLECTION_LISTING = '/magiceden/collection'
export const WS_COLLECTION_STATS = '/magiceden/collection/stats'
export const WS_TOKEN_METADATA = '/magiceden/token'

// STATUS CODES
// 400 - Bad request (Missing params, body)
// 401 - Unauthorised (Bad token, etc.)
export const SUCCESS_RESPONSE_CODE = '200'
export const ERROR_RESPONSE_CODE = '500' // HTTP CODE 200
export const INVALID_ACCESS_TOKEN_RESPONSE_CODE = '501'

export const KEY_USER_PROFILE = 'yDKUIQH1sd'
