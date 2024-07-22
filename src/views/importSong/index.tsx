import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ImportHttp } from '@/api';
import storage from '@/storage/index';
import { ListsType, MusicDataType, ToastProp } from '@/type';
import { guid } from '@/tool/tool';
const ImportSong: React.FC<ToastProp> = ({ Toast }) => {
  const { showToast, hideToast } = Toast;
  const [url, SetUrl] = useState('');
  const [type, setType] = useState(1);
  const UrlRequest = async () => {
    showToast();
    if (url === '') {
      showToast('请输入内容');
      setTimeout(hideToast, 1000);
      return;
    }
    let regex: RegExp;
    if (type === 1) {
      regex = /id=(\d+)/;
    } else {
      regex = /id=(\d+)/;
    }

    const match = url.match(regex);

    if (match === null) {
      showToast('链接出错');
      setTimeout(hideToast, 1000);
      return;
    }
    const id = match[1];

    const res = await ImportHttp(id);
    const indexLists: ListsType[] = await storage.load({
      key: 'lists',
    });

    const data = res.cdlist[0];
    const song = data.songlist;

    const createLists: ListsType = {
      id: guid(),
      isLocal: false,
      picurl: data.logo,
      num: data.total_song_num,
      title: data.dissname,
    };
    const storageId = createLists.id;
    indexLists.push(createLists);
    console.log(createLists);

    const musicArray: MusicDataType[] = [];

    song.forEach((item: any, index: number) => {
      const obj: MusicDataType = {
        artwork: '',
        album: item.albumname,
        artist: item.singer[0].name,
        title: item.songorig,
        url: '',
        id: `${index}`,
      };
      musicArray.push(obj);
    });
    await storage.save({ key: 'lists', data: indexLists });
    await storage.save({
      key: storageId,
      data: musicArray,
    });
    showToast(`导入成功,共${musicArray.length}首`);
    setTimeout(hideToast, 1000);
  };
  return (
    <View style={ImportCss.box}>
      <TextInput
        value={url}
        onChangeText={text => SetUrl(text)}
        style={ImportCss.Text}
        placeholder="输入歌单url"
        multiline={true}
        numberOfLines={8}
      />
      <View style={ImportCss.selectBox}>
        <Button
          title="qq音乐"
          color={type === 1 ? '' : '#DCDCDC'}
          onPress={() => setType(1)}
        />
        <Button
          title="网易云"
          color={type === 2 ? '' : '#DCDCDC'}
          onPress={() => setType(2)}
        />
      </View>
      <View style={ImportCss.btn}>
        <Button title="确定" onPress={UrlRequest} />
      </View>
    </View>
  );
};
const ImportCss = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  selectBox: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Text: {
    marginTop: 20,
    width: '80%',
    // backgroundColor: 'red',
    textAlignVertical: 'top',
    borderRadius: 10,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    width: 200,
    marginTop: 100,
  },
});
export default ImportSong;
