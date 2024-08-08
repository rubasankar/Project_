/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN, BaseURL} from "./constants";

const ApiService = {
    get: async function (url: string): Promise<any> {
        // console.log('get', url);

        const token = window.localStorage.getItem(ACCESS_TOKEN);
        // console.log('api get access token', token)
        return new Promise((resolve, reject) => {
            fetch(`${BaseURL}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    // console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    post: async function(url: string, data:any):Promise<any>{
        // console.log('post', url, data);

        const token = window.localStorage.getItem(ACCESS_TOKEN);

        return new Promise((resolve, reject) => {
            fetch(`${BaseURL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((json) => {
                    // console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    delete: async function(url: string):Promise<any>{
        // console.log('post', url);

        const token = localStorage.getItem(ACCESS_TOKEN);

        return new Promise(() => {
            fetch(`${BaseURL}${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
        })
    },

    postWithoutToken: async function(url: string, data: any):Promise<any>{
        // console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${BaseURL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    // console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default ApiService;