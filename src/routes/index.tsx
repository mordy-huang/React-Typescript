import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { RootState } from "@/store";
import routes from "./routeConfig";

interface isLogin {
  isLogin: boolean;
  pathname: string;
}
const GuardedRoute = ({ isLogin, pathname, ...props }: isLogin) => {
  if (isLogin) {
    return <Route {...props} />;
  }
  console.log("You are redirected because you are not logged in");
  return <Redirect to="/Login" />;
};

const RenderRouter = () => {
  const state = useSelector((state: RootState) => state);
  const isLogin = state.global.isLogin;
  const pathname = state.router.location.pathname;

  return (
    <Switch>
      {routes.map(route =>
        route.authorization ? (
          <GuardedRoute isLogin={isLogin} pathname={pathname} {...route}></GuardedRoute>
        ) : isLogin ? (
          <Route {...route}></Route>
        ) : (
          <Redirect to="/Home" />
        )
      )}
    </Switch>
  );
};
export default RenderRouter;
