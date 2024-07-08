import { searchListType } from '../type/api';
import Fetch from '../tool/index';
const axios = new Fetch();
//搜索歌曲
export async function searchSong(data: string) {
  const respone = await fetch(`http://www.2t58.com/so/${data}.html`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    },
  });
  const html = await respone.text();
  const regex = /\/song\/([^"]+)\.html" target="_mp3">([^<]+)<\/a>/g;
  let match;
  const songs: string[][] = [];
  while ((match = regex.exec(html)) !== null) {
    const songId: string = match[1];
    let songTitle: string = match[2];
    songTitle = songTitle.replace(/&nbsp;/g, ' ');
    songs.push([songId, songTitle]);
  }
  const searchLists: searchListType[] = [];
  songs.forEach(item => {
    const split = item[1].split('-');
    const obj: searchListType = {
      name: split[1],
      id: item[0],
      artist: split[0],
    };
    searchLists.push(obj);
  });
  return searchLists;
}

//歌单获取播放url
export async function getSongUrl(data: string) {
  console.log(data);

  // return axios.get('http://ovoa.cc/api/QQmusic.php', data);
  const respone = await fetch(`http://www.2t58.com/so/${data}.html`);
  const res = await respone.text();
  const regex = /\/song\/([^\/]+)\.html/g;
  const matches = [...res.matchAll(regex)];
  const values = matches.map(match => match[1]);
  const songId = values[0];
  const body = ` id=${songId}&type=music`;

  const resURI = await fetch('http://www.2t58.com/js/play.php', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Referer: `http://www.2t58.com/song/${songId}.html`,
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    },
  });
  const songRes = await resURI.json();
  const songData = {
    src: songRes.url,
    name: songRes.title.split('-')[0],
    songname: songRes.title.split('-')[1],
    pic: songRes.pic,
  };
  return songData;
}
//搜索获取播放url
export async function getSongUrlSearch(songId: string) {
  const body = ` id=${songId}&type=music`;
  const resURI = await fetch('http://www.2t58.com/js/play.php', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Referer: `http://www.2t58.com/song/${songId}.html`,
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    },
  });
  const songRes = await resURI.json();
  const songData = {
    src: songRes.url,
    name: songRes.title.split('-')[0],
    songname: songRes.title.split('-')[1],
    pic: songRes.pic,
  };
  return songData;
}
//导入歌单 qq音乐
export const ImportHttp = async (id: string) => {
  const url = `https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&format=json&disstid=${id}&outCharset=utf-8`;
  const response = await fetch(url, {
    headers: {
      Referer: 'https://y.qq.com/',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    },
  });

  return response.json();
};
