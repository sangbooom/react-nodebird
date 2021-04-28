import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

const UserProfile = ({ setLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          쨱쨱
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followings">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>상붐</Avatar>} title="sangBooom" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
