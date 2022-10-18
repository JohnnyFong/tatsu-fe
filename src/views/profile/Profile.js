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
import { httpRequestDelete, httpRequestGet } from 'src/utils/webUtil'
import { WS_BOOKMARKS, WS_BOOKMARKS_OWN, WS_COLLECTION_STATS } from 'src/constants/constants'

import anim from 'src/assets/images/anim.webp'
import { setToastState } from 'src/states/toastState'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [itemDetails, setItemDetails] = useState(null)
  const [statsDetails, setStatsDetails] = useState({
    floorPrice: 0,
    listedCount: 0,
    avgPrice24hr: 0,
    volumeAll: 0,
  })

  useEffect(() => {
    httpRequestGet(WS_BOOKMARKS_OWN).then((res) => {
      setItemDetails(res.data)
    })
    httpRequestGet(WS_COLLECTION_STATS).then((res) => {
      setStatsDetails(res)
    })
  }, [])

  const handleOnClick = (tokenMint) => {
    navigate('/item', { state: { tokenMint } })
  }

  const handleBookmark = (id) => {
    httpRequestDelete(`${WS_BOOKMARKS}/${id}`).then((res) => {
      setToastState({ status: 'success', message: 'Bookmark Removed!' })
      setItemDetails(itemDetails.filter((i) => i.id !== id))
    })
  }
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num)
  }

  const stringFormat = (json) => {
    try {
      return JSON.parse(json[0].metadata)
    } catch (e) {
      return { name: '', image: '' }
    }
  }

  return (
    <>
      <CRow>
        <CCol className="mb-4" sm={6} lg={3}>
          <CCardImage orientation="top" src={anim} />
        </CCol>
        <CCol>
          <CCardBody>
            <CCardTitle>My Bookmarked NFT</CCardTitle>
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
        {itemDetails?.map((item, index) => (
          <CCol className="mb-4" sm={6} lg={3} key={index}>
            <CCard style={{ width: '100%' }}>
              <CCardImage
                orientation="top"
                src={stringFormat(item.Tokens).image}
                onClick={() => handleOnClick(item.tokenMint)}
                className="cursor-pointer"
              />
              <CCardBody>
                <CCardTitle>{stringFormat(item.Tokens).name}</CCardTitle>
                <CCardText>Tatsumeeko: Meekolony Pass</CCardText>
                <CButton onClick={() => handleBookmark(item.id)}>Remove from bookmark</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Profile
