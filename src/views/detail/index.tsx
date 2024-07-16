import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { getSongUrl } from '@/api/index';
import { useEffect, useState } from 'react';
import { PlatformPressable } from '@react-navigation/elements';
import TrackPlayer from 'react-native-track-player';
import { MusicDataType, ToastProp } from '@/type';
import { useAppDispatch } from '@/store/index';
import { setSongLists } from '@/store/module/songState';
import storage from '@/storage';
import { SongBox } from '@/components';
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from 'react-native-gesture-handler';
const Detail: React.FC<ToastProp> = ({ route, Toast, navigation }) => {
  const { showToast, hideToast } = Toast;
  const dispatch = useAppDispatch();
  const songID = route.params as { id: number };
  const [lists, setLists] = useState<MusicDataType[]>([]);
  //选择此路径
  const detailInit = async () => {
    try {
      const res = await storage.load({ key: String(songID.id) });
      console.log(res);

      setLists(res);
    } catch (error) {}
  };
  //播放
  const clickItem = async (id: string, index: number) => {
    TrackPlayer.reset();
    TrackPlayer.pause();
    Toast.showToast();
    console.log(id);

    const msg = lists[index].title;
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
          return (
            <SongBox
              data={item}
              index={index}
              onPress={clickItem}
              onEdit={() => {}}
            />
          );
        }}
        keyExtractor={item => item.id}
        maxToRenderPerBatch={11}
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

// const
export default Detail;
