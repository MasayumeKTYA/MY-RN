import Fetch from '../tool/index';
const axios = new Fetch();
//搜索歌曲
export function searchSong<T>(data: T) {
  return axios.get('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', data);
}
//获取个人歌单
export function getPersonLists<T>(data: T) {
  return axios.get(
    'https://c6.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg',
    data,
    true,
  );
}
//获取歌单详情
export function getsongDetail<T>(data: T) {
  return axios.get(
    'https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    data,
    true,
  );
}
//获取url
export function getSongUrl<T>(data: T) {
  return axios.get('http://ovoa.cc/api/QQmusic.php', data);
}
