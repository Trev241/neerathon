import { withAuthenticationRequired } from "@auth0/auth0-react"
import React from "react"

function AuthenticationGuard({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        {/* <PageLoader /> */}
        Loading
      </div>
    ),
  })

  return <Component />
}

export default AuthenticationGuard