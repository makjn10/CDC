import INF from './../views/cdc/INF';
import CompanyRegList from './../views/cdc/CompanyRegList';
import INFList from './../views/cdc/INFList';

const cdcRoutes = [
    { path: '/company/inf', name: 'INF page', component: INF, exact: true },
    { path: '/inf', name: 'INF page', component: INF, exact: true },
    { path: '/regList', name: 'Reg list page', component: CompanyRegList, exact: true },
    { path: '/infList', name: 'INF list page', component: INFList, exact: true },
];

export default cdcRoutes;