import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProfileStore } from 'src/states/userProfileState'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [userProfile] = useUserProfileStore()

  useEffect(() => {
    if (!userProfile.token) {
      navigate('/login')
    }
  }, [navigate, userProfile.token])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
