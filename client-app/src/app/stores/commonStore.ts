import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../modules/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;
    constructor() {
        makeAutoObservable(this);

        // first param is what we are reacting to
        // what we do as reaction
        // reaction doest run when store is initially loads but it only runs when there is change in token 
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}