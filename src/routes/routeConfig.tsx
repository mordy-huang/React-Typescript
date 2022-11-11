import { Redirect } from 'react-router-dom';
import {Home,Login,Test} from '../pages'
const routes = [
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Home",
    component: Home,
    authorization:true,

  },
  {
    path: "/Test",
    authorization:true,
    component: Test,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect from="/" to="/Login" />,
  },
];

export default routes;