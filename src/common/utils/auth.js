export default  {
    isLoggedIn: (token) => {
        // 当有token时还要检测是否过期  
        if( token ) {
            var info;
            try {
                info = JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return false;
            }
            const exp = info.exp;
            const now = Date.now() / 1000;
            //console.log(exp + ' ' + now);
            if(exp > now) {
                return true;
            }
        }
        return false;
    },
    authRequired: () => {
        
    }
}