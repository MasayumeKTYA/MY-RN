import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import { Header, HeaderBackButton } from '@react-navigation/elements';

import Input from './headerTitle';
import { useState } from 'react';
import HeaderRight from './headerRight';
import { getSongUrlSearch, searchSong } from '../../api/index';
import { PlatformPressable } from '@react-navigation/elements';
import { searchListType } from '../../type/api';
import { MusicDataType, ToastProp } from '../../type';
import TrackPlayer from 'react-native-track-player';
import { setNetPlay } from '../../store/module/songState';
import { useAppDispatch } from '../../store';
function Search(prop: ToastProp) {
  const { navigation, Toast } = prop;
  const [searchVal, setSearchVal] = useState('');
  const [lists, setLists] = useState<searchListType[]>([]);

  const TextChange = (val: string) => {
    setSearchVal(val);
  };
  //搜索
  const clickSearch = async () => {
    Toast.showToast();
    const res = await searchSong(searchVal);
    setLists(res);
    Toast.hideToast();
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
  return (
    <KeyboardAvoidingView style={css.box}>
      {/* <View style={[css.header, { height }]}></View> */}
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
          />
        )}
        headerRight={() => <HeaderRight onSearch={clickSearch} />}
      />
      <View style={css.lists}>
        <FlatList
          data={lists}
          renderItem={({ item, index }) => (
            <ListsItem data={item} index={index} onPress={getUrl} />
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
});
type ListsItemProps = {
  data: searchListType;
  index: number;
  onPress: (id: string) => void;
};
const ListsItem: React.FC<ListsItemProps> = prop => {
  const { data, index, onPress } = prop;

  return (
    <PlatformPressable style={itemStyle.box} onPress={() => onPress(data.id)}>
      <Text style={itemStyle.index}>{index + 1}</Text>
      <View style={itemStyle.fontBox}>
        <Text style={itemStyle.title} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={itemStyle.subtitle} numberOfLines={1}>
          {data.artist}
        </Text>
      </View>
    </PlatformPressable>
  );
};
const itemStyle = StyleSheet.create({
  box: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  index: {
    marginLeft: 20,
  },
  fontBox: {
    marginLeft: 30,
    width: 250,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 5,
  },
});
export default Search;
