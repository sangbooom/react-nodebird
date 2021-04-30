import { all, fork, call, put, take, takeEvery } from "redux-saga/effects";

function loginAPI() {
  return axios.post("/api/login");
}

function* logIn() {
  try {
    const result = yield call(loginAPI);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  while (true) {
    yield take("LOG_IN_REQUEST", logIn);
  }
}

function* watchLogIn() {
  yield takeEvery("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeEvery("LOG_OUT_REQUEST", logOut);
}

export default user;
