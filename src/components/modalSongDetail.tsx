import storage from '@/storage';
import { ListsType, MemoType, MusicDataType } from '@/type';
import { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import ModalBox2 from './modalBox2';
import ModalBox1 from './modalBox1';
import { downloadFile } from 'react-native-fs';
import { getSongUrl } from '@/api/index';
import { useAppSelector } from '@/store';
type MdoalSongDetailType = {
  visible1: boolean;
  onClose: () => void;
  onDelete: () => void;
  dialogData: MusicDataType | null;
  Toast: MemoType;
};

const MdoalSongDetail: React.FC<MdoalSongDetailType> = ({
  visible1,
  onClose,
  onDelete,
  dialogData,
  Toast,
}) => {
  const { showToast, hideToast } = Toast;
  const [visible2, setVisible2] = useState(false);
  const [songLists, setSongLists] = useState<ListsType[]>([]);
  const { savePath } = useAppSelector(state => state.songState);
  //选择当前歌单
  const saveSong = async (id: string) => {
    if (dialogData === null) return;
    const songs: MusicDataType[] = await storage.load({ key: String(id) });
    const lists: ListsType[] = await storage.load({ key: 'lists' });
    const index = lists.findIndex(item => item.id === id);
    lists[index].num += 1;
    songs.push(dialogData);
    setVisible2(false);
    await storage.save({ key: String(id), data: [...songs] });
    await storage.save({ key: 'lists', data: [...lists] });
  };

  //下载
  const downloadClick = async () => {
    //下载歌曲
    const responseURL = await getSongUrl(dialogData!.title);
    if (responseURL.src === undefined) return;
    showToast('添加至下载队列');
    setTimeout(hideToast, 1000);
    try {
      await downloadFile({
        fromUrl: responseURL.src,
        toFile: `${savePath}/${responseURL.songname}.mp3`,
      }).promise;
      onClose();
    } catch (error) {}
  };
  //添加歌单
  const addSonglists = () => {
    onClose();
    setTimeout(() => setVisible2(true), 400);
  };
  useEffect(() => {
    storage
      .load({
        key: 'lists',
      })
      .then((res: ListsType[]) => {
        setSongLists(res);
      });
  }, []);
  return (
    <>
      {visible1 || visible2 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            position: 'absolute',
          }}
        />
      ) : (
        ''
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible1}
        statusBarTranslucent={true}
        onRequestClose={() => onClose()}>
        <View style={css.modalBox}>
          <View style={css.modalTop} onTouchEndCapture={() => onClose()} />
          <View style={css.modalFlatList}>
            <ModalBox1 data={'专辑：' + dialogData?.album} />
            <ModalBox1 data={'歌手：' + dialogData?.artist} />
            <ModalBox1 data={'歌曲：' + dialogData?.title} />
            <ModalBox1 data={'下载'} onClick={downloadClick} />
            <ModalBox1 data={'删除'} onClick={onDelete} />
            <ModalBox1 data={'添加到歌单'} onClick={addSonglists} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible2}
        statusBarTranslucent={true}
        onRequestClose={() => setVisible2(false)}>
        <View style={css.modalBox}>
          <View
            style={css.modalTop}
            onTouchEndCapture={() => setVisible2(false)}
          />
          <View style={css.modalFlatList}>
            <FlatList
              data={songLists}
              renderItem={({ item }) => (
                // <View style={{ paddingVertical: 20 }}>   </View>
                <ModalBox2 data={item} onPress={saveSong} />
              )}
              keyExtractor={item => String(item.id)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
const css = StyleSheet.create({
  modalBox: {
    width: '100%',
    height: '100%',
  },
  modalTop: {
    height: '50%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalFlatList: {
    backgroundColor: '#fff',
    height: '50%',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderRadius: 10,
  },
});
export default MdoalSongDetail;
