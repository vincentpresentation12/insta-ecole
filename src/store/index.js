/* 
    [IMPORTS] Module
    Define main module to create store
*/
    // NPM modules
    import { createStore } from "vuex";

    // Store modules
    import auth from "./modules/auth";
    import media from "./modules/media";
//

/* 
    [EXPORT] Store
    Define and export store to use it in 'main.js'
*/
    export default createStore({
        modules: {
            auth: auth,
            media: media
        }
    })
//