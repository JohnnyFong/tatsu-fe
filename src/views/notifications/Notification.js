import React, { useEffect, useState } from 'react'
import { httpRequestGet, httpRequestPost } from 'src/utils/webUtil'
import {
  CButton,
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { WS_NOTIFICATIONS_OWN, WS_NOTIFICATIONS_READALL } from 'src/constants/constants'
import { setToastState } from 'src/states/toastState'

const Notification = () => {
  const [notificationDetails, setNotificationDetails] = useState([])

  const callAPI = () => {
    httpRequestGet(`${WS_NOTIFICATIONS_OWN}`).then((res) => {
      setNotificationDetails(res.data.data)
    })
  }

  useEffect(() => {
    callAPI()
  }, [])

  const handleReadAll = () => {
    httpRequestPost(`${WS_NOTIFICATIONS_READALL}`).then((res) => {
      setToastState({ status: 'success', message: 'Read All' })
    })
    callAPI()
  }

  return (
    <>
      <CRow>
        <CCol style={{ textAlign: 'right' }}>
          <CButton className="mb-2" onClick={handleReadAll}>
            Read All
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCard style={{ width: '100%' }}>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ActivityId</CTableHeaderCell>
                <CTableHeaderCell scope="col">Read</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {notificationDetails.map((notification, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{notification.activityId}</CTableDataCell>
                  <CTableDataCell>{notification.read.toString()}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CRow>
    </>
  )
}

export default Notification
