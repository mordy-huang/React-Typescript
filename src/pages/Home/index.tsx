import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/index";

import {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
  login,
  loginout,
  fetchUserById,
} from "./models/HomeSlice";
import { Link, useHistory } from "react-router-dom";
import { Spin } from "antd";

// export const useAppDispatch = () => useDispatch<AppDispatch>();

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { value, loading, user } = useSelector(selectCount);
  const history = useHistory();
  const router = useSelector((state: RootState) => state.router);

  useEffect(() => {
    dispatch(fetchUserById(Number((Math.random() * 10).toFixed(0))));
  }, [dispatch]);

  return (
    <div>
      <Link to={"/Login"}>to Login</Link> <br></br>
      {router.location.pathname}
      Loading: {loading ? "true" : "false"}
      <Link to={"/test"}>to test</Link>
      Count: {value}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>+2</button>
      USER:
      <br></br>
      <Spin spinning={loading}>
        name:{user.first_name} {user.last_name} <br></br>
        avator:<img height={100} width={100} src={user.avatar} alt={"loading"}></img> <br></br>
        email:{user.email}
      </Spin>
      <button onClick={() => dispatch(fetchUserById(Number((Math.random() * 10).toFixed(0))))}>
        refresh
      </button>
      <button onClick={() => dispatch(login("sdfdsf"))}> login </button>
    </div>
  );
};
export default Home;
