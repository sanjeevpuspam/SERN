import axios  from 'axios'; 
import {SET_LOADER, FETCH_SHOPS, ADD_SHOP, DELETE_SHOP, UPDATE_SHOP } from './types';

 const ApiUrl = "http://127.0.0.1:3005/api/";

 export function setLoader(status) {
    return {
        type: SET_LOADER,
        payload: status
    }
}

 export function fetchShop() {
    setLoader(true);
    return async(dispatch,getState)=>{
        try {
           setLoader(true);
           let shops = await  axios.get(`${ApiUrl}get`);
           setLoader(false);
           dispatch({
               type: FETCH_SHOPS,
               payload: shops.data.result
           })
       }
       catch(exp){
           console.log(`fetchShop()=> ${exp.message}`);
           setLoader(true);
       }
    }
}

export function addShop(josnData) {
    setLoader(true);
    return async(dispatch, getState)=>{
        try {
            let results = await axios.post(`${ApiUrl}add`, josnData).then(response => { return response}).catch(errors => console.log(errors));
            if(results.status){
                setLoader(false);
                dispatch({
                    type: ADD_SHOP,
                    payload: josnData
                });
                return results;
            }
        } catch (e) {
            console.log(`addShop()=> ${e.message}`);
            setLoader(true);
        }
    }
}

export function removeShop(shopId){
    return async(dispatch, getState)=>{
        setLoader(true);
        try {
            let results = await axios.get(`${ApiUrl}delete/${shopId}`).then(response => { return response}).catch(errors => console.log(errors));
            if(results.status){
                dispatch({
                    type: DELETE_SHOP,
                    payload: shopId
                });
                setLoader(false);
                console.log("deleted result==>",results)
                return results;
            }
        } catch (e) {
            console.log(`removeShop()=> ${e.message}`);
            setLoader(true);
        }
    }
}

export function updateShop(josnData){
    setLoader(true);
    return async(dispatch, getState)=>{
        try {
            const results = await axios.post(`${ApiUrl}update`, josnData).then(response => { return response}).catch(errors => console.log(errors));
            if(results.data.status){
                setLoader(false);
                dispatch({
                    type: UPDATE_SHOP,
                    payload: josnData
                });
                return results;
            }
        } catch (e) {
            console.log(`updateShop()=> ${e.message}`);
            setLoader(true);
        }
    }
}