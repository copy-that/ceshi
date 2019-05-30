import axios from 'axios'
function http(url, method, data, token){
    const hostBase = 'https://api.ximaiwu.com/api'
    // const hostBase = 'http://192.168.1.188:8825/api'
    return new Promise((resolve, reject) => {
        if(method=='get'){
            axios({
                url: hostBase+url,
                method: method,
                params: data,
                headers:{
                    'token': token
                }
                }).then(response=>{
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
        }else{
            axios({
                url: hostBase+url,
                method: method,
                data: data,
                headers:{
                    'token': token
                }
                }).then(response=>{
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
        }
        
    })
}

function validPhone(phone){
    var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
    return myreg.test(phone)
}
export {http,validPhone} 
