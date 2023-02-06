import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
import Button from "react-bootstrap/esm/Button"

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/participants",
      }
    })
  }

  return (
    <Button className="m-2" variant="secondary" onClick={handleLogin}>Organizer</Button>
  )
}