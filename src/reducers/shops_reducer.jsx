import {SET_LOADER, FETCH_SHOPS, ADD_SHOP, DELETE_SHOP, UPDATE_SHOP} from '../actions/types';
import { updateObj } from './../helper';

const  initialState = {
    shops : {
        shopList: []
    }
}

export default function(state = initialState.shops, action) {
    switch (action.type)
    {
        case SET_LOADER:
            return Object.assign({},state,{
                "loader":  action.payload,
            });
        case FETCH_SHOPS:
            return Object.assign({},state, {
                shopList : action.payload
            });
        case ADD_SHOP:
            action.payload.id = Math.max(...state.shopList.map(obj => obj.id))+1;
            state.shopList.unshift(action.payload);
            return Object.assign({},state, {
                shopList : [...state.shopList]
            });
        case DELETE_SHOP:
            let deletedId = action.payload;
            return Object.assign({}, state, {
                shopList: [...state.shopList.filter(item => item.id !== deletedId)],
            });
        case UPDATE_SHOP:
            let newObj = updateObj(state.shopList,action.payload)
            return Object.assign({}, state, {
                usersList: newObj
            });
        default:
            return state;
    }
}