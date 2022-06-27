/* eslint-disable no-unused-vars */
import { dexieDb } from "@/services/dexie.service"

export default{
    // Define state
    state: {
        // Snapshot state
        album: null,
        albumlist: [],

        // Snapshot state
        snapshoot: null,
        snapshootlist: [],
    },

    // Define getters
    getters: {
        // Snapshot getters
        album: (state) => state.album,
        albumlist: (state) => state.albumlist,
        
        // Snapshot getters
        snapshoot: (state) => state.snapshoot,
        snapshootlist: (state) => state.snapshootlist,
    },

    // Define mutation (eq. setters)
    mutations: {
        // Snapshot mutations
        album( state, payload){ state.album = payload.data },
        albumlist( state, payload){ state.albumlist.push(payload.data) },

        // Snapshot mutations
        snapshoot( state, payload){ state.snapshoot = payload.data },
        snapshootlist( state, payload){ 
            state.snapshootlist.push(payload.data) 
        },
    },

    // Define actions
    actions: {
        // Action to save album
        async saveAlbumOperation( { commit, dispatch, state }, data ){
            /* 
                [DEXIE] Save
                Save API response in Dexie
            */
                // Save new snapshot in IndexDB with Dexie.js
                const newAlbumId = await dexieDb.albums.add( data );

                // Get new created snapshoot
                const newAlbum = await dexieDb.albums.get(newAlbumId);
            //

            /* 
                [STORE] Update
                Commit new state with indexed object
            */
                commit( 'albumlist', { data: newAlbum } )
            //
        },

        // Action to add new snapshoot in list
        async pushSnapshootOperation( { commit, dispatch, state }, data ){
            // TODO: create item within an API

            /* 
                [DEXIE] Save
                Save API response in Dexie
            */
                // Save new snapshot in IndexDB with Dexie.js
                const newSnapshootId = await dexieDb.snapshoots.add( data );

                // Get new created snapshoot
                const newSnapshoot = await dexieDb.snapshoots.get(newSnapshootId);
            //

            /* 
                [STORE] Update
                Commit new state with indexed object
            */
                commit( 'snapshootlist', { data: newSnapshoot } )
            //
        },
    }
}