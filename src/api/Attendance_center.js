import axios from "axios";
import request from "../utils/request";

export const fetch_table_cnc_attendance = query => {
    return request({
        url: '/productivity_attendance_cnc_table',
        method: 'get',
        params: query
    })
}

export const fetch_table_assembly_attendance = query => {
    return request({
        url: '/productivity_attendance_assembly_table',
        method: 'get',
        params: query
    })
}

export const fetch_table_maintenance_attendance = query => {
    return request({
        url: '/productivity_attendance_maintenance_table',
        method: 'get',
        params: query
    })
}
