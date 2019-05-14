import axios from 'axios';

//封装axios请求
export default function Request(url, params) {
  return axios({
    baseURL: 'https://wd4287664112rfplao.wilddogio.com/',
    url: url,
    method: 'get',//可以从外部修改
    ...params
  });
}
