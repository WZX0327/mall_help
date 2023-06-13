import instance from "./axios";
const addhelpcate=(data)=>{
  return instance.request({
       url:'/mall/cms-help-category/add', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'post',
       data,
   })
}
const addhelp=(data)=>{
  return instance.request({
       url:'/mall/cms-help/add', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'post',
       data,
   })
}
const queryName=(data)=>{
  return instance.request({
       url:'/mall/cms-help-category/query/'+data, //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'get',
       data,
   })
}
const helppage=(data)=>{
  return instance.request({
       url:'/mall/cms-help/page', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'post',
       data,
   })
}
const query=(data)=>{
  return instance.request({
       url:'/mall/cms-help/query', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'post',
       data,
   })
}
const getCmsHelps=(data)=>{
  return instance.request({
       url:'/mall/cms-help/getCmsHelps/'+data, //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'get',
       data,
   })
}
const helpedit=(data)=>{
  return instance.request({
       url:'/mall/cms-help/edit', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'post',
       data,
   })
}
const helpedel=(data)=>{
  return instance.request({
       url:'/mall/cms-help/del/'+data, //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'get',
       data,
   })
}
const getone=(data)=>{
  return instance.request({
       url:'/mall/cms-help/one/'+data, //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'get',
       data,
   })
}
const getall=(data)=>{
  return instance.request({
       url:'/mall/cms-help-category/page', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
       method:'post',
       data,
   })
}
export{
addhelpcate,
addhelp,
queryName,
helppage,
query,
getCmsHelps,
helpedit,
helpedel,
getone,
getall
}