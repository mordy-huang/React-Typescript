import { useSelector } from "react-redux";
import {  Switch, Route, Redirect } from "react-router-dom";
import {RootState} from "@/store"
import routes from "./routeConfig";



interface isLogin {
  isLogin: boolean;
  pathname:string;
}
const GuardedRoute = ({isLogin,pathname,...props}:isLogin) => {
  if (isLogin) {
    return <Route {...props} />;
  }
  console.log('You are redirected because you are not logged in')
  return <Redirect to="/Login" />
}

const RenderRouter = () => {
  const state  = useSelector((state:RootState)=>state);

  return (
        <Switch>
          {routes.map(route => (
            route.authorization? <GuardedRoute isLogin={state.counter.isLogin} pathname={state.router.location.pathname} {...route}></GuardedRoute>: <Route {...route}></Route>            
          ))}
        </Switch>
  );
};
export default RenderRouter;
