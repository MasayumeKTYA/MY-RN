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
import storage from '../../storage/index';
import { PlatformPressable } from '@react-navigation/elements';
import { hidenWin } from '../../store/module/winState';
import { useAppDispatch } from '../../store/index';
import { MusicDataType, RouterProps } from '../../type/index';
import Img from '../../components/Image';
import TrackPlayer from 'react-native-track-player';
import { setSongLists, setNetPlay } from '../../store/module/songState';
import Empty from '../../components/empty';
const LocalFile: React.FC<RouterProps> = ({ navigation }) => {
  // const winState = useAppSelector(state => state.winState.value);
  const dispatch = useAppDispatch();
  const [MusicData, setMusicData] = useState<MusicDataType[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      storage
        .load({
          key: 'storagePath',
        })
        .then((res: MusicDataType[]) => {
          setMusicData(res);
        });
    });

    return unsubscribe;
  }, [navigation]);
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
        <View style={{ marginTop: 100 }}>
          <Empty />
        </View>
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
export default LocalFile;
