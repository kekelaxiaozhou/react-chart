import axios from 'axios';
import Qs from "qs";
import { message } from 'antd';

let hideLoadingDom = () => {
    let loadingDom = window.document.getElementById("loadingDom");
    if(loadingDom){
        loadingDom.style.display = "none";
    }
}

let showloadingDom = () => {
    let loadingDom = window.document.getElementById("loadingDom");
    if(loadingDom){
        loadingDom.style.display = "flex";
    }
}

//请求 头contentTpye类型
const contentTpyeArrs = [
    "application/json",
	"application/x-www-form-urlencoded;charset=UTF-8"
]

//基本设置
let options = {
    baseURL: "",
    timeout: 10000,
    headers: {
        post: {
            'Content-Type': contentTpyeArrs[0]
        }
    }
}

// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            
const ajax = axios.create(options);

let reqNumer = 0; // 发起请求的数量, 只要大于0,显示loading动画(前提是num = 0);请勿改动;
let showloading = true; // 定义全局变量用于控制loading局部的使用;请勿改动;
let defaultContentType = contentTpyeArrs[0]; // 默认的请求头信息,根据实际情况可做更改

ajax.interceptors.request.use((config) => {  //在请求发出之前进行一些操作
    //在请求发出之前进行一些操作, 比如加载动画
	if (showloading) {
        reqNumer++;
    };
    if (reqNumer > 0) {
        // 显示加载动画
        showloadingDom();
    }
    
    return config;
},(err) => {
    //Do something with request error
    return Promise.reject(err);
})

ajax.interceptors.response.use((response) => {  // 接受请求后reqNumer--，判断请求所有请求是否完成
    if (showloading) {
        reqNumer--;
    };
    if (reqNumer <= 0) {
        reqNumer = 0;
        // 隐藏加载动画
        hideLoadingDom();
    } else {
        showloadingDom();
    }
    //统一处理返回数据
    const useResponse = response.data;
    if (useResponse.success) {
        return { "success": true, "obj": useResponse["obj"] };
    } else {
        if (useResponse.errorCode === 5) {//未登录过期，重定向
            window.localStorage.clear();
            window.location.href = `http://${window.location.host}`;
            hideLoadingDom();
            return { "success": false };
        } else {
            return { "success": false, "obj": useResponse["msg"] };
        }
    }
}, function (error) {
    // 对响应错误做点什么
    if (error && error.response) {
        message.warn(error.response.statusText);
        // break;
        reqNumer--;
        if (reqNumer <= 0) {
            hideLoadingDom();
        }
        return Promise.reject(error);

    } else {
        message.warn("请求超时");
        reqNumer--;
        if (reqNumer <= 0) {
            hideLoadingDom();
        }
        return Promise.reject(error);
    }
})

const getAction = function (url, data={}, isShowloading) {

    // 判断当前请求是否显示loading, 默认显示
	if (isShowloading && isShowloading === 1){ 
		showloading = false // 不显示loading
	} else {
		showloading = true // 显示
	}

    return ajax.get(url, {
        params: data
    });
}

const postAction = function (url, data={}, isShowloading, contentTpyeIndex=0) {
    // 判断当前请求是否显示loading, 默认显示,isShowloading===1为不显示，contentTpyeIndex=0为contentTpyeArrs索引，默认为0
	if (isShowloading && isShowloading === 1){ 
		showloading = false // 不显示loading
	} else {
		showloading = true // 显示
	}
	
	// 判断当前请求类型，确定向后端传递数据的方式,前后端沟通后按约定改动
    let _contentTpye = contentTpyeArrs[contentTpyeIndex] || defaultContentType;
    
    let _data;
	
	if (_contentTpye === contentTpyeArrs[1]) {
        _data = Qs.stringify(data)
	} else if (_contentTpye === contentTpyeArrs[0]){
        _data = JSON.stringify(data)
	}
    return ajax.post(url, _data, {
        headers: {
            'Content-Type': _contentTpye
        }
    });
}

export {
    getAction,
    postAction
}