import React from 'react'
import { AuthProps } from '../../../constants'

const AuthLayout = ({children}:AuthProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthLayout
