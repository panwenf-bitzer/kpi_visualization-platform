import axios from "axios";
import request from "../utils/request";

export const fetch_table_compressor = query => {
    return request({
        url: '/throughput_compressor_table',
        method: 'get',
        params: query
    })
}