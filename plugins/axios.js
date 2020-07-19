import {Message} from "element-ui";

export default function ({$axios}) {

    $axios.onRequest(config => {
        config.timeout = 3000
        return config
    })

    $axios.onResponse(response => {
        if (response.data.status === "error") {
            Message.error(response.data.message)
        } else {
            return response.data
        }
    })

    $axios.onError(error => {
        switch (error.response.status) {
            case 401:
                Message.error(error.response.data.message)
                break
            case 403:
                Message.error(error.response.data.message)
                break
            default:
                Message.error(error.response.statusText)
        }
    })

}
