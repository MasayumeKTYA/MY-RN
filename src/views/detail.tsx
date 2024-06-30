import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { getsongDetail } from '../api/index';
import { useEffect, useState } from 'react';
import { PlatformPressable } from '@react-navigation/elements';
import { getSongUrl } from '../api/index';
import TrackPlayer from 'react-native-track-player';
import { MusicDataType, ToastProp } from '../type';
import { useAppSelector, useAppDispatch } from '../store/index';
import { setSongLists, setNetPlay } from '../store/module/songState';
import { listType } from '../type/detail';

const Detail: React.FC<ToastProp> = prop => {
  const { route, Toast } = prop;
  const preId = useAppSelector(state => state.songState.songId);
  const dispatch = useAppDispatch();
  const rotPar = route.params as { id: number };

  const [lists, setLists] = useState<listType[]>([]);
  const [loading, setLoading] = useState(true);
  const detailInit = async () => {
    const params = {
      disstid: rotPar.id,
      type: '1',
      format: 'json',
      utf8: '1',
    };
    const res = await getsongDetail(params);
    console.log(res.cdlist[0].songlist);

    // setLists(res.cdlist[0].songlist);
    setLoading(false);
  };
  //播放
  const clickItem = async (msg: string, index: number) => {
    TrackPlayer.reset();
    TrackPlayer.pause();
    Toast.showToast();
    const res = await getSongUrl(msg);
    const song: MusicDataType = {
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    };
    console.log(song);

    dispatch(setSongLists({ list: lists, index }));
    dispatch(setNetPlay(true));
    TrackPlayer.add(song);

    TrackPlayer.play();
    Toast.hideToast();
  };
  useEffect(() => {
    detailInit();
  }, []);
  return (
    <View style={css.box}>
      {loading ? (
        <View style={css.loading}>
          <ActivityIndicator size="large" color="pink" />
        </View>
      ) : (
        <FlatList
          data={lists}
          renderItem={({ item, index }) => (
            <ListsItem data={item} index={index} onClick={clickItem} />
          )}
          keyExtractor={item => item.songmid}
        />
      )}

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
  data: listType;
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
    <PlatformPressable
      style={item.box}
      onPress={() => getTitle(data.songname + '-' + data.singer[0].name)}>
      <Text style={item.index}>{index + 1}</Text>
      <View>
        <Text style={item.title} numberOfLines={1}>
          {data.songname}
        </Text>
        <Text style={item.subtitle}>{data.singer[0].name}</Text>
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
