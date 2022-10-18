import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import solanaImg from 'src/assets/images/Solana_logo.png'
import { useLocation } from 'react-router-dom'
import { httpRequestGet } from 'src/utils/webUtil'
import { WS_ACTIVITIES, WS_TOKEN_METADATA } from 'src/constants/constants'

const Item = () => {
  const { state } = useLocation()
  const { tokenMint } = state
  const [metadataDetails, setMetadataDetails] = useState({})
  const [activityDetails, setActivityDetails] = useState([])

  useEffect(() => {
    httpRequestGet(`${WS_TOKEN_METADATA}/${tokenMint}`).then((res) => {
      setMetadataDetails(res)
    })

    httpRequestGet(`${WS_ACTIVITIES}/${tokenMint}`).then((res) => {
      setActivityDetails(res.data.data)
    })
  }, [])

  return (
    <>
      <CRow>
        <CCard style={{ width: '100%' }}>
          <CCol className="mb-4" sm={6} lg={3}>
            <CCardImage orientation="top" src={metadataDetails.image} />
          </CCol>
          <CCol>
            <CCardBody>
              <CCardTitle>{metadataDetails.name}</CCardTitle>
              <CCardText>
                Meekolony Passes are a series of 10,000 unique passes that give special perks,
                cosmetics & bonuses for Tatsumeeko, a modern fantasy play-and-earn MMORPG-lite for
                Discord, Web & Mobile!
              </CCardText>
              <CRow>
                <CCol className="mb-4" sm={6}>
                  <CCardText>Owner {metadataDetails.owner}</CCardText>
                </CCol>
                <CCol className="mb-4" sm={6}>
                  <CCardText>Attributes: {JSON.stringify(metadataDetails.attributes)}</CCardText>
                </CCol>
                <CCol className="mb-4" sm={6}>
                  <CCardText>Properties: {JSON.stringify(metadataDetails.properties)}</CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCol>
        </CCard>
      </CRow>
      <CRow>
        <CCard style={{ width: '100%' }}>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Activities</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {activityDetails.map((activity, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{activity.metadata}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CRow>
    </>
  )
}

export default Item
