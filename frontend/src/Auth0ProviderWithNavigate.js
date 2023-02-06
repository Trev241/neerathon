import { Auth0Provider } from "@auth0/auth0-react"
import React from "react"
import { useNavigate } from "react-router-dom"

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate()

  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  }

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: apiEndpoint,
        scope: "read:registrations",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithNavigate