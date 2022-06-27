/* eslint-disable no-unused-vars */

/* 
    [IMPORTS] Vue.js
    Import main modules to define router
*/
    import { createRouter, createWebHistory } from 'vue-router'
    import StoreModule from '../store/index';
//

/* 
    [ROUTER] Paths
    Define a array of objects to configure router paths
*/
    const routerPaths = [
        {
            path: '/',
            name: 'HomeView',
            meta: { authguard: false },
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/dashboard',
            name: 'DashboardView',
            meta: { authguard: true },
            component: () => import('../views/DashboardView.vue')
        },
        {
            path: '/add/:type',
            name: 'CreateView',
            meta: { authguard: true },
            component: () => import('../views/CreateView.vue')
        },
        {
            path: '/:type/:id',
            name: 'SingleView',
            meta: { authguard: true },
            component: () => import('../views/SingleView.vue')
        },
    ];
//

/* 
    [ROUTER] Define
    Create new router with ve-router module
*/
    const AppRouter = createRouter({
        routes: routerPaths,
        history: createWebHistory(),
    })
//

/* 
    [ROUTE] Before
    Used before display route component
*/
    AppRouter.beforeEach( async ( to, from, next ) => {
        // Authguard: check user info before enable route
        if( to.meta.authguard ){
            // Check 'userinfo' local storage
            if(StoreModule.getters.userinfo){
                // Get user info from API
                const connectedUser = await StoreModule.dispatch('pkceOperation', {
                    email: StoreModule.getters.userinfo.email,
                    password: StoreModule.getters.userinfo.password,
                })

                // Check user info from API
                if(connectedUser.status === 200){
                    next();
                }
                else{
                    // Redirect unconnected user to 'HomeView'
                    next({ name: 'HomeView' });
                }
            }
            else{
                // Redirect unconnected user to 'HomeView'
                next({ name: 'HomeView' });
            }
        }
        else{
            // Enable public route
            next();
        }

    })
//

/* 
    [EXPORT] Router
    Export router to use it in 'main.js'
*/
    export default AppRouter;
//