import { all, fork, call, put, take, takeEvery } from "redux-saga/effects";

function* watchAddPost() {
    yield takeEvery("ADD_POST_REQUEST", addPost);
  }


export default post;