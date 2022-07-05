import moment from "moment"
import jwt_decode from "jwt-decode"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postJwtLogin,
  postSocialLogin,
  getUserDetails,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history, response } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "PKCE") {

      // Token Expire time
      var timestamp = moment().add((response.expires_in / 60) - 10, 'minutes');
      localStorage.setItem("expires_time", timestamp);

      const userData = jwt_decode(response.access_token);
      localStorage.setItem("x-auth-token", Buffer.from(userData.sub).toString('base64'));

      const userResponse = yield call(getUserDetails, userData.sub, response.access_token);

      if (userResponse !== undefined) {

        localStorage.setItem("role", userResponse.roles[0].code);
        localStorage.setItem("branch", userResponse.branches[0].code);

        localStorage.setItem("authUser", JSON.stringify({ "uid": `${userResponse.idx}`, "username": `${user.email}`, "role": `${userResponse.roles[0].code}` }))
        yield put(loginSuccess({ "uid": `${userResponse.idx}`, "username": `${user.email}`, "role": `${userResponse.roles[0].code}` }))
      }

      history.push("/pakoman-digital-loan/dashboard")
      window.location.reload();
      
    } else if (process.env.REACT_APP_DEFAULTAUTH === "OAUTH2") {

      const params = {
        username: user.email,
        password: user.password,
        grant_type: "password",
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
      }

      const response = yield call(postJwtLogin, new URLSearchParams(params));

      if (response !== null && response !== undefined) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("expires_in", response.expires_in);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("scope", response.scope);
        localStorage.setItem("token_type", response.token_type);

        // Token Expire time
        var timestamp = moment().add((response.expires_in / 60) - 10, 'minutes');
        localStorage.setItem("expires_time", timestamp);
      }

      // Extracting user data from token
      localStorage.setItem("x-auth-token", Buffer.from(user.email).toString('base64'));

      if (user.email !== null && user.email !== undefined) {
        const userResponse = yield call(getUserDetails, user.email, response.access_token);
        if (userResponse !== undefined) {

          localStorage.setItem("role", userResponse.roles[0].code);
          localStorage.setItem("branch", userResponse.branches[0].code);

          localStorage.setItem("authUser", JSON.stringify({ "uid": `${userResponse.idx}`, "username": `${user.email}`, "role": `${userResponse.roles[0].code}` }))
          yield put(loginSuccess({ "uid": `${userResponse.idx}`, "username": `${user.email}`, "role": `${userResponse.roles[0].code}` }))
        }
      }

      history.push("/pakoman-digital-loan/dashboard")
      window.location.reload();
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {

    localStorage.clear();

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/pakoman-digital-loan/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      )
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
}

export default authSaga
