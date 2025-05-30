import moment from "moment"
import jwt_decode from "jwt-decode"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER,
  SOCIAL_LOGIN,
  USER_AUTHORIZATION,
} from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postJwtLogin,
  postSocialLogin,
  getUserDetails,
  postBackChanelLogout,
  postJwtRevokeToken,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history, response } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "PKCE") {
      // Token Expire time
      var timestamp = moment().add(response.expires_in / 60 - 10, "minutes")
      localStorage.setItem("expires_time", timestamp)
      localStorage.setItem("expires_at", timestamp)

      console.log("response: ", response)

      const userData = jwt_decode(response.access_token)
      localStorage.setItem(
        "x-auth-token",
        Buffer.from(userData.sub).toString("base64")
      )

      const userResponse = yield call(
        getUserDetails,
        userData.sub,
        response.access_token
      )

      if (userResponse !== undefined) {
        localStorage.setItem("branch", userResponse.branches[0].code)
        localStorage.setItem("branchName", userResponse.branches[0].description)
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            uid: `${userResponse.idx}`,
            username: `${userResponse.idx}`,
            role: `${userResponse.roles[0].code}`,
          })
        )
      }

      history.push("/pakoman-digital-loan/role", {
        userResponse: userResponse,
      })
    } else if (process.env.REACT_APP_DEFAULTAUTH === "OAUTH2") {
      const params = {
        username: user.email,
        password: user.password,
        grant_type: "password",
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
      }

      const response = yield call(postJwtLogin, new URLSearchParams(params))

      if (response !== null && response !== undefined) {
        localStorage.setItem("access_token", response.access_token)
        localStorage.setItem("expires_in", response.expires_in)
        localStorage.setItem("refresh_token", response.refresh_token)
        localStorage.setItem("scope", response.scope)
        localStorage.setItem("token_type", response.token_type)

        // Token Expire time
        var timestamp = moment().add(response.expires_in / 60 - 10, "minutes")
        localStorage.setItem("expires_time", timestamp)
      }

      // Extracting user data from token
      localStorage.setItem(
        "x-auth-token",
        Buffer.from(user.email).toString("base64")
      )

      if (user.email !== null && user.email !== undefined) {
        const userResponse = yield call(
          getUserDetails,
          user.email,
          response.access_token
        )
        if (userResponse !== undefined) {
          localStorage.setItem("role", userResponse.roles[0].code)
          localStorage.setItem("branch", userResponse.branches[0].code)
          localStorage.setItem(
            "branchName",
            userResponse.branches[0].description
          )
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              uid: `${userResponse.idx}`,
              username: `${user.email}`,
              role: `${userResponse.roles[0].code}`,
              expires_in: `${response.expires_in}`,
            })
          )
          yield put(
            loginSuccess({
              uid: `${userResponse.idx}`,
              username: `${user.email}`,
              role: `${userResponse.roles[0].code}`,
            })
          )
        }
      }

      history.push("/pakoman-digital-loan/dashboard")
      window.location.reload()
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* autherizationContextHandler({ payload: { userResponse, roleType } }) {
  try {
    localStorage.setItem("role", roleType)
    yield put(
      loginSuccess({
        uid: `${userResponse.idx}`,
        username: `${userResponse.idx}`,
        role: `${roleType}`,
      })
    )

    window.location.replace("/pakoman-digital-loan/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    history.push("/pakoman-digital-loan/redirect")

    const params = {
      id_token_hint: `${localStorage.getItem("access_token")}`,
    }

    localStorage.clear()

    setTimeout(() => {
      window.location.replace(
        `${process.env.REACT_APP_IDENTITY_SERVER_URL}/oidc/logout?id_token_hint=${params.id_token_hint}&post_logout_redirect_uri=${process.env.REACT_APP_REDIRECT_BACK_CHANEL_LOGOUT_URL}`
      )
    }, 1000)

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(fireBaseBackend.socialLoginUser, data, type)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/pakoman-digital-loan/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeLatest(USER_AUTHORIZATION, autherizationContextHandler)
}

export default authSaga
