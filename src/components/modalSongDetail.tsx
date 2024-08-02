import storage from '@/storage';
import { ListsType, MusicDataType } from '@/type';
import { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import ModalBox2 from './modalBox2';
import ModalBox1 from './modalBox1';
type MdoalSongDetailType = {
  visible1: boolean;
  onClose: Function;
  dialogData: MusicDataType | null;
};
type songSelectType = {
  id: string;
  name: string;
};
const MdoalSongDetail: React.FC<MdoalSongDetailType> = ({
  visible1,
  onClose,
  dialogData,
}) => {
  const [visible2, setVisible2] = useState(false);
  const [songLists, setSongLists] = useState<ListsType[]>([]);
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
  //删除
  const deleteClick = () => {
    console.log(dialogData);

    onClose();
  };
  //下载
  const downloadClick = () => {
    onClose();
  };
  //添加歌单
  const addSonglists = () => {
    onClose();
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
      {visible1 ? (
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
            <ModalBox1 data={'删除'} onClick={deleteClick} />
            <ModalBox1 data={'添加到歌单'} onClick={addSonglists} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible2}
        statusBarTranslucent={true}>
        <View style={css.modalBox}>
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
