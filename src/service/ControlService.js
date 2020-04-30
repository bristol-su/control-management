import api from "@bristol-su/control-js-api-client";
import axios from "axios";

export class ControlService {

    constructor() {
        if(ControlService.instance) {
            return ControlService.instance
        }

        ControlService.instance = this;

        return this;
    }

    createWith(callback) {
        if (!this.callbacks) {
            this.callbacks = [];
        }
        this.callbacks.push(callback);
    }

    createService() {
        let apiUrl = "";
        if (process.env.VUE_APP_CONTROL_API_URL !== undefined) {
            apiUrl = process.env.VUE_APP_CONTROL_API_URL
        } else if (process.env.MIX_CONTROL_API_URL !== undefined) {
            apiUrl = process.env.MIX_CONTROL_API_URL;
        } else if (window !== undefined && Object.prototype.hasOwnProperty.call(window, 'controlApiUrl')) {
            apiUrl = window.controlApiUrl;
        }
        let axiosInstance = this.newAxiosInstance();
        this.control = new api(apiUrl, axiosInstance);
        (this.callbacks || []).forEach(callback => {
            callback(this.control._http);
        })
    }

    newAxiosInstance() {
        return axios;
    }

    getService() {
        if (this.control === undefined) {
            this.createService();
        }
        return this.control;
    }
}

export default new ControlService();