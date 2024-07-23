import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import Input from './headerTitle';
import { useEffect, useState } from 'react';
import HeaderRight from './headerRight';
import { getSongUrlSearch, searchSong } from '@/api/index';
import { Header, HeaderBackButton } from '@react-navigation/elements';
import { MusicDataType, ToastProp, ListsType } from '@/type';
import TrackPlayer from 'react-native-track-player';
import { useAppDispatch } from '@/store';
import storage from '@/storage';
import ModalAudio from '../../components/modalBox2';
import { SongBox } from '@/components';
import MemoAudio from '@/components/audio';
const Search: React.FC<ToastProp> = ({ navigation, Toast }) => {
  const { showToast, hideToast } = Toast;
  const [searchVal, setSearchVal] = useState('');
  const [lists, setLists] = useState<MusicDataType[]>([]);

  const TextChange = (val: string) => {
    setSearchVal(val);
  };
  let inputRef: React.RefObject<TextInput> | null = null;
  //搜索
  const clickSearch = async () => {
    showToast();
    const res = await searchSong(searchVal);
    setLists(res);
    hideToast();
    inputRef?.current?.blur();
  };
  //播放 获取url
  const dispatch = useAppDispatch();
  const getUrl = async (id: string) => {
    await TrackPlayer.reset();
    await TrackPlayer.pause();
    showToast();
    const res = await getSongUrlSearch(id);
    const song: MusicDataType = {
      id: '',
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    };
    TrackPlayer.add(song);

    TrackPlayer.play();
    hideToast();
  };
  //编辑弹出
  const [toastShow, setToastShow] = useState(false);
  const [songLists, setSongLists] = useState<ListsType[]>([]);
  let [currentSong, setCurrentSong] = useState<MusicDataType | null>(null);
  const showEdit = async (id: string) => {
    setToastShow(true);
    const res = await getSongUrlSearch(id);
    setCurrentSong({
      id: '',
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
  const saveSong = async (id: string) => {
    if (currentSong === null) return;
    const songs: MusicDataType[] = await storage.load({ key: String(id) });
    const lists: ListsType[] = await storage.load({ key: 'lists' });
    const index = lists.findIndex(item => item.id === id);
    lists[index].num += 1;
    songs.push(currentSong);
    setToastShow(false);

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
      .then((res: ListsType[]) => {
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
            <SongBox
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
      <MemoAudio showToast={showToast} hideToast={hideToast} />
    </KeyboardAvoidingView>
  );
};
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
// type ListsItemProps = {
//   data: searchListType;
//   index: number;
//   onPress: (id: string) => void;
//   onEdit: (data: string) => void;
// };
// const ListsItem: React.FC<ListsItemProps> = prop => {
//   const { data, index, onPress, onEdit } = prop;

//   return (
//     <PlatformPressable style={itemStyle.box} onPress={() => onPress(data.id)}>
//       <View style={itemStyle.outer}>
//         <Text style={itemStyle.index}>{index + 1}</Text>
//         <View style={itemStyle.fontBox}>
//           <Text style={itemStyle.title} numberOfLines={1}>
//             {data.name}
//           </Text>
//           <Text style={itemStyle.subtitle} numberOfLines={1}>
//             {data.artist}
//           </Text>
//         </View>
//       </View>
//       <PlatformPressable
//         style={itemStyle.outerPic}
//         onPress={() => onEdit(data.id)}>
//         <Ionicons
//           name="ellipsis-vertical-sharp"
//           size={20}
//           style={itemStyle.pic}
//           color="#000"
//         />
//       </PlatformPressable>
//     </PlatformPressable>
//   );
// };
// const itemStyle = StyleSheet.create({
//   box: {
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//   },
//   outer: {
//     flexDirection: 'row',
//   },
//   outerPic: {
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   index: {
//     marginLeft: 20,
//   },
//   fontBox: {
//     marginLeft: 30,
//     width: 190,
//   },
//   title: {
//     fontSize: 16,
//     color: '#000',
//   },
//   subtitle: {
//     fontSize: 10,
//     marginTop: 5,
//   },
//   pic: {},
// });
export default Search;
