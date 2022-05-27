import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, POSTCORS} from "./helper";

const host = getHostInformation();

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    booksInfo = null;
    cart = []

    fetchBooksInfo = async (filters) => {
        const data = {
            "filters": filters
        }
        const petReq = await fetch(`${host}/bookstore-api/books`, POSTCORS(data));
        const petRes = await petReq.json();
        console.log(petRes);
        if (petReq.ok) {
            runInAction(() => {
                this.booksInfo = petRes
            });
        }
    };
}

export default new Store();
