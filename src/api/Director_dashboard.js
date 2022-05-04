import axios from "axios";
import qs from 'qs'
import request from "../utils/request";
export const fetch_md_throughput_average = query => {
    return request({
        url: '/md_throughput_average',
        method: 'get',
        params: query
    })
}

export const fetch_md_throughput_all = query => {
    return request({
        url: '/md_throughput_all',
        method: 'get',
        params: query
    })
}

export const fetch_md_throughput_alu = query => {
    return request({
        url: '/md_throughput_alu',
        method: 'get',
        params: query
    })
}

export const fetch_md_throughput_scr = query => {
    return request({
        url: '/md_throughput_scr',
        method: 'get',
        params: query
    })
}
export const fetch_md_throughput_sc = query => {
    return request({
        url: '/md_throughput_sc',
        method: 'get',
        params: query
    })
}
export const fetch_md_throughput_sh = query => {
    return request({
        url: '/md_throughput_sh',
        method: 'get',
        params: query
    })
}
export const fetch_md_productivity_average = query => {
    return request({
        url: '/md_productivity_average',
        method: 'get',
        params: query
    })
}
export const fetch_md_productivity_all = query => {
    return request({
        url: '/md_productivity_all',
        method: 'get',
        params: query
    })
}
export const fetch_md_productivity_cnc_assy = query => {
    return request({
        url: '/md_productivity_cnc_assy',
        method: 'get',
        params: query
    })
}
export const fetch_md_productivity_cnc = query => {
    return request({
        url: '/md_productivity_cnc',
        method: 'get',
        params: query
    })
}
export const fetch_md_productivity_assy = query => {
    return request({
        url: '/md_productivity_assy',
        method: 'get',
        params: query
    })
}
export const fetch_dir_attendance_assy = query => {
    return request({
        url: '/dir_attendance_assy',
        method: 'put',
        data: query
    })
}
export const fetch_dir_attendance_cnc = query => {
    return request({
        url: '/dir_attendance_cnc',
        method: 'put',
        data: query
    })
}
export const fetch_dir_attendance_maintenance = query => {
    return request({
        url: '/dir_attendance_maintenance',
        method: 'put',
        data: query
    })
}

export const fetch_dir_attendance_assy_all = query => {
    return request({
        url: '/dir_attendance_assy_all',
        method: 'get',
        params: query
    })
}
export const fetch_dir_attendance_cnc_all = query => {
    return request({
        url: '/dir_attendance_cnc_all',
        method: 'get',
        params: query
    })
}
