import Home from "@/pages/Home";
import { selectCount } from "@/pages/Home/HomeSlice";
import Test from "@/pages/Test";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import {RootState} from "@/store"

const routes = [
  {
    path: "/Home",
    exact: true,
    component: Home,
  },
  {
    path: "/User",
    exact: true,
    Auth:true,
    component: Test,
  },
  {
    path: "/Test",
    exact: true,
    component: ()=><div>sdfsdf</div>,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect from="/" to="/Home" />,
  },
];

interface isLogin {
  isLogin: boolean;
  pathname:string;
}
const GuardedRoute = ({isLogin,pathname,...props}:isLogin) => {
  console.log(pathname,isLogin,'testing')
  if (isLogin) {
    return <Route {...props} />;
  }
  console.log('You are redirected because you are not logged in')
  return <Redirect to="/Home" />
}

const RenderRouter = () => {
  const state  = useSelector((state:RootState)=>state);

  return (
        <Switch>
          {routes.map(route => (
            route.Auth? <GuardedRoute isLogin={state.counter.isLogin} pathname={state.router.location.pathname} {...route}></GuardedRoute>: <Route {...route}></Route>
            // eslint-disable-next-line react/jsx-key
            
          ))}
        </Switch>
  );
};
export default RenderRouter;
