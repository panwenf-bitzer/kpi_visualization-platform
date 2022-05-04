import axios from "axios";
import request from "../utils/request";

export const fetch_dashboard_throughput = query => {
    return request({
        url: '/dashboard_throughput',
        method: 'get',
        params: query
    })
}
export const fetch_dashboard_productivity = query => {
    return request({
        url: '/dashboard_productivity',
        method: 'get',
        params: query
    })
}

export const fetch_past_sh = query => {
    return request({
        url: '/throughput_past_sh',
        method: 'get',
        params: query
    })
}

export const fetch_past_sc = query => {
    return request({
        url: '/throughput_past_sc',
        method: 'get',
        params: query
    })
}
export const fetch_past_alu = query => {
    return request({
        url: '/throughput_past_alu',
        method: 'get',
        params: query
    })
}
export const fetch_past_scr = query => {
    return request({
        url: '/throughput_past_scr',
        method: 'get',
        params: query
    })
}
export const fetch_productivity_monthly = query => {
        return request({
            url: '/Productivity_monthly',
            method: 'get',
            params: query
        })
}
