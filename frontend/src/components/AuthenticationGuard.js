import { withAuthenticationRequired } from "@auth0/auth0-react"
import React from "react"
import LoadingPage from "./Placeholder"

function AuthenticationGuard({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <LoadingPage message="Please wait..." />
    ),
  })

  return <Component />
}

export default AuthenticationGuard