import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { RootState } from "@/store";
import routes from "./routeConfig";

interface isLogin {
  isLogin: boolean;
  pathname: string;
  authorization:boolean|undefined
}
const GuardedRoute = ({ isLogin, pathname,authorization, ...props }: isLogin) => {
  console.log(props);
  
  if(authorization){
    if (isLogin) {
      return <Route {...props} />;
    }else{
      console.log("You are redirected because you are not logged in");
      return <Redirect to="/Login" />;
    }
  }else{
    if(isLogin){
      return <Redirect to="/Home" />;

    }else{
      return <Route {...props} />;

    }
  }


};

const RenderRouter = () => {
  const state = useSelector((state: RootState) => state);
  const isLogin = state.global.isLogin;
  const pathname = state.router.location.pathname;

  return (
  
    <Switch>
      {routes.map(route =><GuardedRoute key={route.path} isLogin={isLogin} pathname={pathname} authorization={route.authorization} {...route}></GuardedRoute>
      )}
    </Switch>
  );
};
export default RenderRouter;
