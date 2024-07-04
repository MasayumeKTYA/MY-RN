import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';

import { Header, HeaderBackButton } from '@react-navigation/elements';

import Input from './headerTitle';
import { useEffect, useState } from 'react';
import HeaderRight from './headerRight';
import { getSongUrlSearch, searchSong } from '../../api/index';
import { PlatformPressable } from '@react-navigation/elements';
import { QQListsType, searchListType } from '../../type/api';
import { MusicDataType, ToastProp } from '../../type';
import TrackPlayer from 'react-native-track-player';
import { setNetPlay } from '../../store/module/songState';
import { useAppDispatch } from '../../store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '../../storage';
import ModalAudio from './modalBox';
function Search(prop: ToastProp) {
  const { navigation, Toast } = prop;
  const [searchVal, setSearchVal] = useState('');
  const [lists, setLists] = useState<searchListType[]>([]);

  const TextChange = (val: string) => {
    setSearchVal(val);
  };
  let inputRef: React.RefObject<TextInput> | null = null;
  //搜索
  const clickSearch = async () => {
    Toast.showToast();
    const res = await searchSong(searchVal);
    setLists(res);
    Toast.hideToast();
    inputRef?.current?.blur();
  };
  //播放 获取url
  const dispatch = useAppDispatch();
  const getUrl = async (id: string) => {
    await TrackPlayer.reset();
    await TrackPlayer.pause();
    Toast.showToast();
    const res = await getSongUrlSearch(id);
    const song: MusicDataType = {
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    };
    dispatch(setNetPlay(true));
    TrackPlayer.add(song);

    TrackPlayer.play();
    Toast.hideToast();
  };
  //编辑弹出
  const [toastShow, setToastShow] = useState(false);
  const [songLists, setSongLists] = useState<QQListsType[]>([]);
  let [currentSong, setCurrentSong] = useState<MusicDataType | null>(null);
  const showEdit = async (id: string) => {
    setToastShow(true);
    const res = await getSongUrlSearch(id);
    setCurrentSong({
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    });
  };
  const requestClose = () => {
    setToastShow(false);
  };
  //选择当前歌单
  const saveSong = async (id: number) => {
    console.log(currentSong);

    if (currentSong === null) return;
    const songs: MusicDataType[] = await storage.load({ key: String(id) });
    const lists: QQListsType[] = await storage.load({ key: 'lists' });
    const index = lists.findIndex(item => item.id === id);
    lists[index].num += 1;
    songs.push(currentSong);
    setToastShow(false);
    currentSong = null;
    console.log(lists[index]);
    console.log([...songs]);

    await storage.save({ key: String(id), data: [...songs] });
    await storage.save({ key: 'lists', data: [...lists] });
  };
  const getBlur = (Ref: React.RefObject<TextInput>) => {
    inputRef = Ref;
  };
  useEffect(() => {
    storage
      .load({
        key: 'lists',
      })
      .then((res: QQListsType[]) => {
        setSongLists(res);
      });
  }, []);
  return (
    <KeyboardAvoidingView style={css.box}>
      <Header
        headerLeft={() => (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        )}
        title=""
        headerTitle={() => (
          <Input
            value={searchVal}
            onInput={TextChange}
            onKeyPress={clickSearch}
            onBlur={getBlur}
          />
        )}
        headerRight={() => <HeaderRight onSearch={clickSearch} />}
      />
      <Modal
        visible={toastShow}
        onRequestClose={requestClose}
        animationType="fade"
        transparent={true}>
        <View style={css.modalBox}>
          <View style={css.modalFlatList}>
            <FlatList
              data={songLists}
              renderItem={({ item }) => (
                // <View style={{ paddingVertical: 20 }}>   </View>
                <ModalAudio data={item} onPress={saveSong} />
              )}
              keyExtractor={item => String(item.id)}
            />
          </View>
        </View>
      </Modal>
      <View style={css.lists}>
        <FlatList
          data={lists}
          renderItem={({ item, index }) => (
            <ListsItem
              data={item}
              index={index}
              onPress={getUrl}
              onEdit={showEdit}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{ height: 70 }}></View>
    </KeyboardAvoidingView>
  );
}
const css = StyleSheet.create({
  box: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  header: {},
  lists: {
    flex: 1,
  },
  modalBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  modalFlatList: {
    backgroundColor: '#fff',
    height: 400,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderRadius: 10,
  },
});
type ListsItemProps = {
  data: searchListType;
  index: number;
  onPress: (id: string) => void;
  onEdit: (data: string) => void;
};
const ListsItem: React.FC<ListsItemProps> = prop => {
  const { data, index, onPress, onEdit } = prop;

  return (
    <PlatformPressable style={itemStyle.box} onPress={() => onPress(data.id)}>
      <View style={itemStyle.outer}>
        <Text style={itemStyle.index}>{index + 1}</Text>
        <View style={itemStyle.fontBox}>
          <Text style={itemStyle.title} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={itemStyle.subtitle} numberOfLines={1}>
            {data.artist}
          </Text>
        </View>
      </View>
      <PlatformPressable
        style={itemStyle.outerPic}
        onPress={() => onEdit(data.id)}>
        <Ionicons
          name="ellipsis-vertical-sharp"
          size={20}
          style={itemStyle.pic}
        />
      </PlatformPressable>
    </PlatformPressable>
  );
};
const itemStyle = StyleSheet.create({
  box: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  outer: {
    flexDirection: 'row',
  },
  outerPic: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    marginLeft: 20,
  },
  fontBox: {
    marginLeft: 30,
    width: 190,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 5,
  },
  pic: {},
});
export default Search;
