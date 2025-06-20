export class StorageManager {
    constructor(key){
        this.key = key;
    }
    saveData(data){
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    exist(){
        return (this.key in localStorage);
    }
    loadData(){
        return JSON.parse(
            localStorage.getItem(this.key)
        );
    }
    clear(){
        localStorage.removeItem(this.key);
    }
}