import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { getSongUrl } from '../../api/index';
import { useEffect, useState, memo } from 'react';
import { PlatformPressable } from '@react-navigation/elements';
import TrackPlayer from 'react-native-track-player';
import { MusicDataType, ToastProp } from '../../type';
import { useAppDispatch } from '../../store/index';
import { setSongLists } from '../../store/module/songState';
import storage from '../../storage';
const Detail: React.FC<ToastProp> = ({ route, Toast, navigation }) => {
  const { showToast, hideToast } = Toast;
  const dispatch = useAppDispatch();
  const songID = route.params as { id: number };
  const [lists, setLists] = useState<MusicDataType[]>([]);

  const detailInit = async () => {
    try {
      const res = await storage.load({ key: String(songID.id) });
      console.log(res);

      setLists(res);
    } catch (error) {
      console.log(error);
    }
  };
  //播放
  const clickItem = async (msg: string, index: number) => {
    TrackPlayer.reset();
    TrackPlayer.pause();
    Toast.showToast();
    const res = await getSongUrl(msg);
    const song: MusicDataType = {
      id: '',
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    };

    dispatch(setSongLists({ list: lists, index }));
    TrackPlayer.add(song);

    TrackPlayer.play();
    Toast.hideToast();
    await storage.save({ key: 'current', data: song });
  };

  useEffect(() => {
    detailInit();
  }, []);
  return (
    <View style={css.box}>
      <FlatList
        data={lists}
        renderItem={({ item, index }) => {
          return <ListsItem data={item} index={index} onClick={clickItem} />;
        }}
        keyExtractor={item => item.id}
        maxToRenderPerBatch={2}
        initialNumToRender={11}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
      />

      <View style={{ height: 70 }} />
    </View>
  );
};
const css = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface ItemProps {
  data: MusicDataType;
  index: number;
  onClick: (str: string, index: number) => void;
}
//主内容
const ListsItem: React.FC<ItemProps> = props => {
  const { data, index, onClick } = props;
  const getTitle = async (msg: string) => {
    onClick(msg, index);
  };
  return (
    <PlatformPressable style={item.box} onPress={() => getTitle(data.title)}>
      <Text style={item.index}>{index + 1}</Text>
      <View>
        <Text style={item.title} numberOfLines={1}>
          {data.title}
        </Text>
        <Text style={item.subtitle}>{data.artist}</Text>
      </View>
    </PlatformPressable>
  );
};
const width = Dimensions.get('window').width;

const item = StyleSheet.create({
  box: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  index: {
    marginHorizontal: 20,
  },
  title: {
    color: '#000',
    width: width - 100,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 12,
  },
});

// const
export default Detail;
