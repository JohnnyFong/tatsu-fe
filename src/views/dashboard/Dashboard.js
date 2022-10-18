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
} from '@coreui/react'
import { httpRequestGet, httpRequestPost } from 'src/utils/webUtil'
import { WS_BOOKMARKS, WS_COLLECTION_LISTING, WS_COLLECTION_STATS } from 'src/constants/constants'

import solanaImg from 'src/assets/images/Solana_logo.png'
import anim from 'src/assets/images/anim.webp'
import { setToastState } from 'src/states/toastState'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [itemDetails, setItemDetails] = useState([])
  const [statsDetails, setStatsDetails] = useState({
    floorPrice: 0,
    listedCount: 0,
    avgPrice24hr: 0,
    volumeAll: 0,
  })

  useEffect(() => {
    httpRequestGet(WS_COLLECTION_LISTING).then((res) => {
      setItemDetails(res)
    })
    httpRequestGet(WS_COLLECTION_STATS).then((res) => {
      setStatsDetails(res)
    })
  }, [])

  const handleBookmark = (tokenMint) => {
    httpRequestPost(WS_BOOKMARKS, { tokenMint }).then((res) => {
      setToastState({ status: 'success', message: 'Bookmarked!' })
    })
  }
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num)
  }

  return (
    <>
      <CRow>
        <CCol className="mb-4" sm={6} lg={3}>
          <CCardImage orientation="top" src={anim} />
        </CCol>
        <CCol>
          <CCardBody>
            <CCardTitle>Tatsumeeko: Meekolony Pass</CCardTitle>
            <CCardText>
              Meekolony Passes are a series of 10,000 unique passes that give special perks,
              cosmetics & bonuses for Tatsumeeko, a modern fantasy play-and-earn MMORPG-lite for
              Discord, Web & Mobile!
            </CCardText>
            <CRow>
              <CCol className="mb-4" sm={6}>
                <CCardText>Floor {statsDetails.floorPrice / 1000000000}</CCardText>
              </CCol>
              <CCol>
                <CCardText>Listed {statsDetails.listedCount}</CCardText>
              </CCol>
              <CCol className="mb-4" sm={6}>
                <CCardText>
                  Total Vol {kFormatter((statsDetails.volumeAll / 1000000000).toFixed(1))}
                </CCardText>
              </CCol>
              <CCol>
                <CCardText>
                  Avg. Sale (24h) {(statsDetails.avgPrice24hr / 1000000000).toFixed(2)}
                </CCardText>
              </CCol>
            </CRow>
          </CCardBody>
        </CCol>
      </CRow>
      <CRow>
        {itemDetails.map((item, index) => (
          <CCol className="mb-4" sm={6} lg={3} key={index}>
            <CCard style={{ width: '100%' }}>
              <CCardImage orientation="top" src={item.extra.img} />
              <CCardBody>
                <CCardTitle>Meekolony #{item.rarity.merarity.rank}</CCardTitle>
                <CCardText>Tatsumeeko: Meekolony Pass</CCardText>
                <CCardText>
                  <img src={solanaImg} width={30} alt="solana" className="mb-1" /> {item.price}
                </CCardText>
                <CButton onClick={() => handleBookmark(item.tokenMint)}>Add to bookmark</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Dashboard
