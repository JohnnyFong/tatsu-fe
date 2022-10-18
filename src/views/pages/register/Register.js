import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { httpRequestPost } from 'src/utils/webUtil'
import { WS_SIGNUP } from 'src/constants/constants'
import { useUserProfileStore } from 'src/states/userProfileState'
import { useNavigate } from 'react-router-dom'
import { setToastState } from 'src/states/toastState'

const Register = () => {
  const navigate = useNavigate()
  const [, setUserProfile] = useUserProfileStore()
  const [signupDetails, setSignupDetails] = useState({
    email: '',
    password: '',
  })

  const handleOnChange = (e, key) => {
    setSignupDetails((prev) => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

  const handleSignup = () => {
    httpRequestPost(WS_SIGNUP, signupDetails).then((res) => {
      setToastState({ status: 'success', message: 'Login Success' })
      setUserProfile(res.data.data)
      // NAV TO DASHBOARD
      navigate('/')
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => handleOnChange(e, 'email')}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => handleOnChange(e, 'password')}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSignup}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
