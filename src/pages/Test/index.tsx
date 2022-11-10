import { RootState } from "@/store";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginout,
} from "@/pages/Home/HomeSlice";
const Test: React.FC = () => {
  const dispatch = useDispatch()
  const router = useSelector((state: RootState) => state.router);

  return (
    <div>
      <Link to={"/home"}>to home</Link>
      {router.location.pathname}
      <br></br>
      <button onClick={()=>dispatch(loginout())}>logout</button>
      <br />
      test
    </div>
  );
};
export default Test;
