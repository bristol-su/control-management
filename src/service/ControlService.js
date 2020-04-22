import api from "@bristol-su/control-js-api-client";
import axios from "axios";

class ControlService {

    createService() {
        let apiUrl = "";
        if(process.env.VUE_APP_CONTROL_API_URL !== undefined) {
            apiUrl = process.env.VUE_APP_CONTROL_API_URL
        } else if(process.env.MIX_CONTROL_API_URL !== undefined) {
            apiUrl = process.env.MIX_CONTROL_API_URL;
        }

        this.control = new api(apiUrl, axios);
    }

    getService() {
        if(!this.control) {
            this.createService();
        }
        return this.control;
    }
}

export default new ControlService();