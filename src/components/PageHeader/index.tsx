import { useAppDispatch } from "@/store";
import { selectGlobal,logout } from "@/store/GrobalSlice";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
type Props = {
  children?: any;
};

const PageHeader = (props: Props) => {
  const state = useSelector(selectGlobal);
  const dispatch = useAppDispatch();

  return (
    <>
      {state.isLogin == true ? (
        <div style={{ height: 100, width: "100%", background: "#fefefe",display:"flex"}}>
          name:{state.loginInfo.username}
          <br />
          login time: {state.loginInfo.loginTime}
          <br />
          <img src={state.loginInfo.avator}></img>
          <Button onClick={() => dispatch(logout())} type="text">
            logout
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default PageHeader;
