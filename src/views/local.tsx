import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import storage from '../storage/index';
import { PlatformPressable } from '@react-navigation/elements';
import { hidenWin } from '../store/module/winState';
import { useAppDispatch } from '../store/index';
import { MusicDataType } from '../type/index';
import Img from '../components/Image';
import TrackPlayer from 'react-native-track-player';
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
  return (
    <Pressable style={s.contain} onPress={() => dispatch(hidenWin())}>
      <FlatList
        data={MusicData}
        renderItem={item => <AudioBox {...item} />}
        keyExtractor={(item, index) => String(index)}
      />
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
}
const AudioBox: React.FC<AudioBoxProps> = ({ item, index }) => {
  const MedioPlay = () => {
    TrackPlayer.skip(index);
    TrackPlayer.play();
  };
  return (
    <PlatformPressable onPress={MedioPlay}>
      <View style={audio.box}>
        <Img style={audio.container} uri={item.artwork} />
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
