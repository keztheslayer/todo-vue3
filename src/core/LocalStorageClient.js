export class LocalStorageClient {
    constructor( name ) {
        this.name = `todo:${name}`;
    }
    save( state ) {
        localStorage.setItem( this.name, JSON.stringify( state ) );
    }
    get() {
        return JSON.parse( localStorage.getItem( this.name ) );
    }
}
