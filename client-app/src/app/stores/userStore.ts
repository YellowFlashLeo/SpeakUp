import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../modules/user";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // If user logged in then we have User with props if not then its null

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
}