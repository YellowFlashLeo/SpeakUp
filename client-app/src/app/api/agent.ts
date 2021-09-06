import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { textSpanContainsTextSpan } from 'typescript';
import { history } from '../..';
import { IActivity } from '../modules/activity';
import { store } from '../stores/store';


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
            // first if statement checks if we get some data in the body of response
            // if we do then we make it single array with strings (venue:,city: ...)
            if (data.erros) {
                const modalStateErros = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErros.push(data.errors[key]);
                    }
                }
                throw modalStateErros.flat();
            } else {
                toast.error(data); // from API controller
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            toast.error('not found');
            history.push('/not-found');
            break;
        case 500:
            // so main idea is that we save error we get from client to mobX storage
            // setServerError will get error and bind it to ServerError intreface
          store.commonStore.setServerError(data);
          history.push('/server-error');
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