import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IActivity } from "../modules/activity";

export default class ActivityStore {
    actvityRegistry = new Map<string, IActivity>();
    selectedActivity: IActivity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
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

    get activitiesByDate() {
        return Array.from(this.actvityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    // return array of object where each object has key of activity date and value as all activities with the same date
    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date; // key
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]; // foreach activity we check if we have match for activity date.
                return activities;
            }, {} as { [key: string]: IActivity[] })
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: IActivity) => {
        activity.date = activity.date.split('T')[0];
        this.actvityRegistry.set(activity.id, activity);
    }
    private getActivity = (id: string) => {
        return this.actvityRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: IActivity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            // since its gonna happen in the next tick we use runInAction (becuase entire method is async)
            runInAction(() => {
                this.actvityRegistry.set(activity.id, activity);
                // so that we dsiplay details of created activity on the right
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: IActivity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // we are basically creating new array of activities, first without the one we are updating and then we add it
                //this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.actvityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                //this.activities = [...this.activities.filter(a => a.id !== id)];
                this.actvityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}