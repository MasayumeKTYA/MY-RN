import { View, StyleSheet, FlatList, InteractionManager } from 'react-native';
import { getSongUrl } from '@/api/index';
import { useCallback, useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import { MusicDataType, ToastProp } from '@/type';
import { useAppDispatch } from '@/store/index';
import { setSongLists } from '@/store/module/songState';
import storage from '@/storage';
import { SongBox } from '@/components';
import MemoAudio from '@/components/audio';
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from 'react-native-gesture-handler';
type renderItemType = { item: MusicDataType; index: number };
const Detail: React.FC<ToastProp> = ({ route, Toast, navigation }) => {
  const { showToast, hideToast } = Toast;
  const dispatch = useAppDispatch();
  const songID = route.params as { id: string };
  const [lists, setLists] = useState<MusicDataType[]>([]);
  //选择此路径
  const detailInit = async () => {
    const res: MusicDataType[] = await storage.load({
      key: songID.id,
    });
    console.log(res);

    setLists(res);
  };
  //播放
  const clickItem = async (id: string, index: number) => {
    TrackPlayer.reset();
    TrackPlayer.pause();
    Toast.showToast();
    console.log(lists);
    try {
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
      console.log(song);

      dispatch(setSongLists({ list: lists, index }));
      TrackPlayer.add(song);

      TrackPlayer.play();
      Toast.hideToast();
      await storage.save({ key: 'current', data: song });
    } catch (error) {
      Toast.hideToast();
    }
  };

  useEffect(() => {
    setTimeout(detailInit, 0);
  }, []);
  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );
  return (
    <View style={css.box}>
      <FlatList
        data={lists}
        renderItem={useCallback(
          ({ item, index }: renderItemType) => {
            return (
              <SongBox
                data={item}
                index={index}
                onPress={clickItem}
                onEdit={() => {}}
              />
            );
          },
          [lists],
        )}
        keyExtractor={keyExtractor}
        initialNumToRender={13}
        updateCellsBatchingPeriod={100}
        maxToRenderPerBatch={26}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
      />

      <View style={{ height: 70 }} />
      <MemoAudio showToast={showToast} hideToast={hideToast} />
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
