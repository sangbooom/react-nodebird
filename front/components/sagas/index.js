import { all, fork, call, put, take, takeEvery } from "redux-saga/effects";



export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
