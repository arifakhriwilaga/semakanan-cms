export default function RedirectIfAuthenticated (router) {
    /**
     * If the user is already authenticated he shouldn't be able to visit
     * pages like login, register, etc...
     */
    router.beforeEach((to, from, next) => {
        let token = localStorage.getItem('token')


        /**
         * Checks if there's a token and the next page name is none of the following
         */
        if ((token) && (to.name === 'Login' || to.name === 'Register')) {
            // redirects according user role
            router.go(-1)
        }

        if ((!token) && to.path !== '/login') {
            // alert(token)
            next({path: '/login'})
            // return router.go({name: 'Login'})
        }
        next()
    })
}