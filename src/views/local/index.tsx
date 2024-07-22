import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import storage from '@/storage/index';
import { hidenWin } from '@/store/module/winState';
import { useAppDispatch } from '@/store/index';
import { MusicDataType, ToastProp } from '@/type/index';
import TrackPlayer from 'react-native-track-player';
import { setSongLists } from '@/store/module/songState';
import { Empty, SongBox } from '@/components';
import Headers from './headerComponent/index.tsx';
import MemoAudio from '@/components/audio.tsx';
const LocalFile: React.FC<ToastProp> = ({ navigation, route, Toast }) => {
  // const winState = useAppSelector(state => state.winState.value);
  const { showToast, hideToast } = Toast;
  const dispatch = useAppDispatch();
  const [MusicData, setMusicData] = useState<MusicDataType[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      storage
        .load({
          key: 'storagePath',
        })
        .then((res: MusicDataType[]) => {
          setTimeout(() => setMusicData(res), 350);
        });
    });
    return unsubscribe;
  }, [navigation]);
  const songPlay = async (id: string, index: number) => {
    console.log(id);

    await TrackPlayer.reset();
    await TrackPlayer.pause();
    dispatch(setSongLists({ list: MusicData, index }));
    TrackPlayer.add(MusicData[index]);
    TrackPlayer.play();
    await storage.save({ key: 'current', data: MusicData[index] });
  };
  const showEdit = () => {};
  return (
    <Pressable style={s.contain} onPress={() => dispatch(hidenWin())}>
      <Headers
        options={{
          headerTitle: '本地',
          headerTitleAlign: 'center',
        }}
        route={route}
        navigation={navigation}
      />
      {MusicData.length === 0 ? (
        <View style={{ marginTop: 100 }}>
          <Empty />
        </View>
      ) : (
        <FlatList
          data={MusicData}
          initialNumToRender={13}
          maxToRenderPerBatch={26}
          getItemLayout={(data, index) => ({
            length: 60,
            offset: 60 * index,
            index,
          })}
          legacyImplementation={true}
          renderItem={({ item, index }) => (
            <SongBox
              data={item}
              index={index}
              onEdit={showEdit}
              onPress={songPlay}
            />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      )}
      <View style={{ height: 70 }} />
      <MemoAudio showToast={showToast} hideToast={hideToast} />
    </Pressable>
  );
};

const s = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default LocalFile;
