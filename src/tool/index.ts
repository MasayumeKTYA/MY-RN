class Fetch {
  async get<T>(url: string, data?: T, isCookie = false) {
    if (data !== undefined) {
      let index = 1;
      for (let keys in data) {
        if (index === 1) {
          url += `?${keys}=${data[keys]}`;
        } else {
          url += `&${keys}=${data[keys]}`;
        }
        index++;
      }
    }
    let res: Response;
    if (isCookie) {
      res = await fetch(url, {
        headers: {
          referer: 'https://y.qq.com/',
          credentials: 'include',
          Cookie:
            'eas_sid=m1W7W1o4i5k6c077F2E6q5u820; RK=MhO5BDzyaV; ptcz=5a2677c7309c13225c0780d0fe575197c59a7041a7f1513ec7512c752a6ce003; pgv_pvid=4999216214; qq_domain_video_guid_verify=0c351f3e175d2eba; _qimei_uuid42=18514140c16100e394d52ca1b60a86c88b1f9bcf65; _qimei_fingerprint=0b464c2df1f78fb9b74d93ae1030ab5c; _qimei_q36=; _qimei_h38=8f953d7994d52ca1b60a86c802000004918514; fqm_pvqid=affdc31b-b661-4e9a-8b4f-257042ae645e; ts_uid=628539984; music_ignore_pskey=202306271436Hn@vBj; tmeLoginType=2; euin=oKv5NKEs7KnPNv**; pac_uid=0_SdBbfhrrCXmj0; suid=0_SdBbfhrrCXmj0; ts_refer=cn.bing.com/; wxopenid=; psrf_qqopenid=C440D8D0EC4BA78FD86A11B11AF80021; psrf_qqrefresh_token=2BAC2E536AF6DD3C4A40528A1D3EA535; psrf_qqaccess_token=898617E12B0358D5D25FF0432B418DB1; wxunionid=; wxrefresh_token=; psrf_qqunionid=5A2479B997C2DE47FD3EFBC6B7D53A30; current-city-name=sh; fqm_sessionid=85170567-972d-4f61-87fd-fd2519b69b89; pgv_info=ssid=s4844319503; _qpsvr_localtk=0.9787382602934962; login_type=1; qqmusic_key=Q_H_L_63k3N5Xo-PlF8EHZOO1fLtD8jZbZYP2wvw2UqjoYrbJw7u5tJaQHiyfYzXI34Ilzg0QG5470qmw; uin=1419965049; psrf_musickey_createtime=1719581925; qm_keyst=Q_H_L_63k3N5Xo-PlF8EHZOO1fLtD8jZbZYP2wvw2UqjoYrbJw7u5tJaQHiyfYzXI34Ilzg0QG5470qmw; psrf_access_token_expiresAt=1727357925; ts_last=y.qq.com/',
        },
      });
    } else {
      res = await fetch(url);
    }

    const response = await res.json();
    return response;
  }
  async post<T>(url: string, data?: T) {
    const option: RequestInit = {
      method: 'post',
    };
    if (data !== undefined) {
      option.body = JSON.stringify(data);
    }
    const res = await fetch(url, option);
    return await res.json();
  }
}
export default Fetch;
