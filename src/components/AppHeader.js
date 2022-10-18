import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { httpRequestGet } from 'src/utils/webUtil'
import { WS_NOTIFICATIONS_COUNT } from 'src/constants/constants'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [notificationCount, setNotificationCount] = useState(0)
  useEffect(() => {
    httpRequestGet(`${WS_NOTIFICATIONS_COUNT}`).then((res) => {
      setNotificationCount(res.data.count)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/profile" component={NavLink}>
              My Bookmark
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/notification" component={NavLink}>
              Notification
              {notificationCount > 0 && (
                <CBadge shape="pill" color="info">
                  {notificationCount}
                </CBadge>
              )}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
