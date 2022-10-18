import React, { useEffect, useState } from 'react'
import { CToaster, CToast, CToastBody } from '@coreui/react'
import { useToastStore } from 'src/states/toastState'

export const Toast = () => {
  const [toastStore, setToastStore] = useToastStore()
  const [showToast, setShowToast] = useState(false)
  let toasts = [{ position: 'bottom-center', autohide: 3000 }]

  let toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()

  useEffect(() => {
    if (toastStore.message) {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 4500)
    }
  }, [setToastStore, toastStore])

  return (
    <>
      {Object.keys(toasters).map((toasterKey) => (
        <CToaster position={toasterKey} key={'toaster' + toasterKey}>
          {toasters[toasterKey].map((toast, key) => {
            return (
              <CToast color={toastStore.status || 'info'} key={'toast' + key} visible={showToast}>
                <CToastBody>{toastStore.message}</CToastBody>
              </CToast>
            )
          })}
        </CToaster>
      ))}
    </>
  )
}
