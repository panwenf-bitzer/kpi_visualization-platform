import axios from "axios";
import request from "../utils/request";

export const fetch_daily_output_alu = query => {
    return request({
        url: '/output_alu',
        method: 'get',
        params: query
    })
}

export const fetch_daily_output_roll = query => {
    return request({
        url: '/output_roll',
        method: 'get',
        params: query
    })
}

export const fetch_daily_output_sc = query => {
    return request({
        url: '/output_sc',
        method: 'get',
        params: query
    })
}
export const fetch_daily_output_sh = query => {
    return request({
        url: '/output_sh',
        method: 'get',
        params: query
    })
}