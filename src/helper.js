
export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const updateObj = (jsonObj,obj) =>{
    for(var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].id === obj.id) {
          jsonObj[i].name = obj.name;
          jsonObj[i].status = obj.status;
          break;
        }
    }
    return jsonObj;
}