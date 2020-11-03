/* here we add all routes module wise */
import fellowRoutes from './Routes/fellowshipRoutes'
import cdcRoutes from './Routes/cdcRoutes'
const routes = [];

/* fellowship routes */
for(let i=0;i<fellowRoutes.length;i++){
    routes.push(fellowRoutes[i])
}

/* cdc routes */
for(let i=0;i<cdcRoutes.length;i++){
    routes.push(cdcRoutes[i])
}

export default routes;