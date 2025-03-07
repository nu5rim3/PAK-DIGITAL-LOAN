// PKCE-X
import AuthService from "pkce-x"

export const Authentication = () => {
  const auth = new AuthService({
    client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
    authorization_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_URL}/oauth2/authorize`,
    token_endpoint: `/pakoman-digital-loan/oauth2/token`,
    requested_scopes: "*",
    storage: localStorage,
  })

  return auth
}

export const isTokenValid = () => {
  const expiresAt = localStorage.getItem("expires_at")
  if (!expiresAt) return false

  return Date.now() < new Date(expiresAt).getTime() // ✅ Converts to timestamp correctly
}
