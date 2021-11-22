import Dashboard from '../components/user/Dashboard';
import Profile from '../components/user/Profile';

const routes=[
    {path: '/user', exact: true, name: 'User'},
    {path: '/user/dashboard', exact: true, name: 'Dashboard', component : Dashboard },
    {path: '/user/profile', exact: true, name: 'Profile', component : Profile },
];

export default routes;