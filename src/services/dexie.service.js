/* 
    [IMPORT] Definition
    Import and defien Dexie.js
*/
    import Dexie from 'dexie';
    export const dexieDb = new Dexie('insta-clone');
//

/* 
    [DEXIE] Setup
    Define usable collections (table)
*/
    dexieDb.version(1).stores({
        users: '++id, name, email, password', // Primary key and indexed props
        snapshoots: '++id, title, caption, base64, author', // Primary key and indexed props
        albums: '++id, title, snapshoots, author', // Primary key and indexed props
    });
//