import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { textSpanContainsTextSpan } from 'typescript';
import { history } from '../..';
import { IActivity } from '../modules/activity';


// to make delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
axios.defaults.baseURL = 'http://localhost:5000/api';

// says to do smthing when we getting response back from API 
axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('bad request');
            break; 
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            toast.error('not found');
            history.push('/not-found');
            break;
        case 500:
            toast.error('server error');
            break;
    }
    return Promise.reject(error);
})
// makes life easier, by getting response and storing to responseBody object
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<IActivity[]>('/activities'),
    details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
    create: (activity: IActivity) => axios.post('/activities', activity),
    update: (activity: IActivity) => axios.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;