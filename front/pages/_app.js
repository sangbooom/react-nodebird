import React from "react";
import "antd/dist/antd.css";
import PropTypes from "prop-types";

// 모든 컴포넌트의 부모 컴포넌트가 됨.

const App = ({ Component }) => {
  return (
    <>
      <div>공통 메뉴</div>
      <Component />;
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
