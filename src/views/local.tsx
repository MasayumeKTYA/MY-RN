import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import storage from '../storage/index';
import { PlatformPressable } from '@react-navigation/elements';
import { hidenWin } from '../store/module/winState';
import { useAppDispatch } from '../store/index';
import { MusicDataType } from '../type/index';
import Img from '../components/Image';
import TrackPlayer from 'react-native-track-player';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { setSongLists, setNetPlay } from '../store/module/songState';
export const LocalFile = () => {
  // const winState = useAppSelector(state => state.winState.value);
  const dispatch = useAppDispatch();
  const [MusicData, setMusicData] = useState<MusicDataType[]>([]);
  useEffect(() => {
    storage
      .load({
        key: 'storagePath',
      })
      .then((res: MusicDataType[]) => {
        setMusicData(res);
      });
  }, []);
  const songPlay = async (index: number) => {
    await TrackPlayer.reset();
    await TrackPlayer.pause();

    dispatch(setSongLists({ list: MusicData, index }));
    dispatch(setNetPlay(false));
    TrackPlayer.add(MusicData[index]);
    TrackPlayer.play();
  };
  return (
    <Pressable style={s.contain} onPress={() => dispatch(hidenWin())}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {MusicData.length === 0 ? (
        <Empty />
      ) : (
        <FlatList
          data={MusicData}
          renderItem={item => <AudioBox {...item} onPress={songPlay} />}
          keyExtractor={(item, index) => String(index)}
        />
      )}
      <View style={{ height: 70 }} />
    </Pressable>
  );
};

const s = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
interface AudioBoxProps {
  item: MusicDataType;
  index: number;
  onPress: (index: number) => void;
}
const AudioBox: React.FC<AudioBoxProps> = ({ item, index, onPress }) => {
  return (
    <PlatformPressable onPress={() => onPress(index)}>
      <View style={audio.box}>
        <Img style={audio.container} uri={item.artwork} net={false} />
        <View style={audio.fontBox}>
          <Text style={audio.font1} numberOfLines={1}>
            {item.title ?? '未知歌曲'}
          </Text>
          <Text style={audio.font2} numberOfLines={1}>
            {item.artist ?? '未知歌手'}
          </Text>
        </View>
      </View>
    </PlatformPressable>
  );
};
const AudioFontBox = Dimensions.get('window').width;
const audio = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: 50,
    height: 50,
    // backgroundColor: 'red',
    marginRight: 10,
    borderRadius: 50,
  },
  fontBox: {
    width: (AudioFontBox / 100) * 60,
  },
  font1: {
    color: '#000',
  },
  font2: {
    fontSize: 12,
  },
});

const Empty = () => {
  return (
    <View style={emp.empty}>
      <Fontisto name="file-2" color={'#000'} size={60} />
      <Text style={emp.emptyFont}>暂无文件~</Text>
    </View>
  );
};
const emp = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyFont: {
    marginTop: 10,
    fontSize: 17,
    color: '#000',
  },
});
