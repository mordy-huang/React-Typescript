import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Test: React.FC = () => {
  const router = useSelector((state: RootState) => state.router);

  return (
    <div>
      <Link to={"/home"}>to home</Link>
      {router.location.pathname}
      <br></br>
      <br />
      test
    </div>
  );
};
export default Test;
