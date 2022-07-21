import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY": "fc3d05ce-3d25-42f8-8f10-c89bb4848d9a"
    }
});
export const authAPI ={
    me(){
        return instance.get('/auth/me')
    },
    getCaptcha(){
        return instance.get('/security/get-captcha-url')
    },
    postLogin(email,password,rememberMe=false,captcha=''){
        return instance.post(`/auth/login`,{email,password,rememberMe,captcha})
    },
    deleteLogin(){
        return instance.delete('/auth/login')
    }
}

export const profileAPI ={
    getProfile(userId){
        return instance.get(`/profile/${userId}`)
    },
    getFollow(userId){
        return instance.get(`follow/${userId}`)
    },
    getStatus(userId){
        return instance.get(`/profile/status/${userId}`)
    },
    putStatus(status){
        debugger
        return instance.put(`/profile/status`,{status:status})
    },
    postProfilePhoto(photoFile){
        let formData = new FormData()
        formData.append('image',photoFile)
        return instance.put(`profile/photo`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    putProfile(profile){
        return instance.put(`/profile/`,profile)
    }
}
export const usersAPI = {
    getUsers(page=1,count=10,term='',friend=false){
        return instance.get(`/users?page=${page}&count=${count}&term=${term}&friend=${friend}`)
    },
    postFollow(users){
        return instance.post(`follow/${users}`)
    },
    deleteFollow(users){
        return instance.delete(`follow/${users}`)
    }
}


