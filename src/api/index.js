import request from '../utils/request';
import axios from "axios";
import qs from 'qs'
// export const fetchData = query => {
//     return request({
//         url: './table.json',
//         method: 'get',
//         params: query
//     });
// };

export const ldap_authorization = query => {
    return axios({
        url: '/authorization',
        method: 'post',
        data: qs.stringify(query)
    });
};

export const fetch_alu_throughput = query => {
    return request({
        url: '/throughput_alu',
        method: 'get',
        params: query
    })
}

export const fetch_msk_throughput = query => {
    return request({
        url: '/throughput_msk',
        method: 'get',
        params: query
    })
}

export const fetch_sc_throughput = query => {
    return request({
        url: '/throughput_sc',
        method: 'get',
        params: query
    })
}

export const fetch_sh_throughput = query => {
    return request({
        url: '/throughput_sh',
        method: 'get',
        params: query
    })
}

export const fetch_scr_throughput = query => {
    return request({
        url: '/throughput_scr',
        method: 'get',
        params: query
    })
}
export const fetch_alu_productivity = query => {
    return request({
        url: '/productivity_alu',
        method: 'get',
        params: query
    })
}

export const fetch_cnc_productivity = query => {
    return request({
        url: '/productivity_cnc',
        method: 'get',
        params: query
    })
}

export const fetch_sc_productivity = query => {
    return request({
        url: '/productivity_sc',
        method: 'get',
        params: query
    })
}

export const fetch_sh_productivity = query => {
    return request({
        url: '/productivity_sh',
        method: 'get',
        params: query
    })
}

export const fetch_scr_productivity = query => {
    return request({
        url: '/productivity_scr',
        method: 'get',
        params: query
    })
}

export const fetch_attendance = query => {
    return request({
        url: '/productivity_attendance',
        method: 'get',
        params: query
    })
}
export const fetch_production_data = query => {
    return request({
        url: '/productivity_production_data',
        method: 'get',
        params: query
    })
}


// export const deleteData = query => {
//     return axios({
//         url: '/delete_production',
//         method: 'delete',
//         params: {"id":query}
//     })
// }
//
// export const updateData = query => {
//     return axios({
//         url: '/update_production',
//         method: 'put',
//         data: query
//     })
// }
