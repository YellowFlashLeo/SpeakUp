import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { IActivity } from "../modules/activity";

export default class ActivityStore {
    activities: IActivity[] = [];
    selectedActivity: IActivity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;
    /*(constructor() {
        makeObservable(this, {
            title: observable,
            setTitle: action
        });

    }*/

    // Will allow all props decalred in this class to be observable automatically
    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}