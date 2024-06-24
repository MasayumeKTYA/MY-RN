import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { setSongLists } from '../store/module/songState';
import { listType } from '../type/detail';
// msg=偶像
interface singerType {
  id: number;
  mid: string;
  name: string;
}
const sleep = (time: number) =>
  new Promise(resolve => setTimeout(() => resolve(1), time));
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

    setLists(res.cdlist[0].songlist);
    setLoading(false);
  };

  const clickItem = async (msg: string, index: number) => {
    TrackPlayer.reset();
    TrackPlayer.pause();
    Toast.showToast();
    // const params = {
    //   msg,
    //   n: '1',
    //   type: 'json',
    // };
    // const res = await getSongUrl(params);
    await sleep(1000);
    const data = {
      cover: 'https://img1.kuwo.cn/star/albumcover/300/32/88/1567952196.jpg',
      songname: '周杰伦',
      name: '夜曲',
      url: 'http://lx.sycdn.kuwo.cn/c92c767e8aa57c6db12565bb9627d9fd/66797688/resource/n2/33/17/316735568.mp3',
    };
    const song: MusicDataType = {
      // url: res.data.src,
      album: '',
      // artist: res.data.name,
      // title: res.data.songname,
      // artwork: res.data.cover,
      url: data.url,
      artist: data.name,
      title: data.songname,
      artwork: data.cover,
    };

    dispatch(setSongLists({ list: lists, index }));
    TrackPlayer.add(song);

    // const index = queue.length;

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
      onPress={() => getTitle(data.songname + data.singer[0].name)}>
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
