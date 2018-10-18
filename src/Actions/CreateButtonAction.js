import axios from 'axios';
import { API_URL_1 } from '../Support/api_url';

export const onCreateCompany = (details) => {
    return(dispatch) => {
        console.log(details);
            axios.post(`${API_URL_1}/registerCompany`, details)
            .then((res) => {
                console.log(res);
                dispatch({
                    type: 'REGISTER_SUCCESSFUL',
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
        };
    }

        
export const onCreateOffice = (details) => {
    return(dispatch) => {
        axios.post(`${API_URL_1}/registerOffice`, details)
        .then((res) => {
            dispatch({
                type: 'REGISTER_SUCCESSFUL',
                payload: {
                    name: res.data[0].officeName,
                    officeStartDate: res.data[0].officeStartDate,
                    longitude: res.data[0].longitude,
                    latitude: res.data[0].latitude,
                    company: res.data[0].company,
                    error: ''
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const companyDetail = () => {
    return(dispatch) => {
        axios.get(`${API_URL_1}/company`)
        .then(res => {
            dispatch ({
                type: 'GET_COMPANY_DATA',
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: "GET_FAILED"
            })
        })
    }
}

export const officeDetail = () => {
    return (dispatch) => {
        axios.get(`${API_URL_1}/office`)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: 'GET_OFFICE_DATA',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "GET_FAILED"
                })
            })
    }
}