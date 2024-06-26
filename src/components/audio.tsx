import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PlatformPressable } from '@react-navigation/elements';
import TrackPlayer, {
  Event,
  PlaybackState,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Img from './Image';
import { useAppDispatch, useAppSelector } from '../store/index';
import { setPlay, setSongLists } from '../store/module/songState';
import { getSongUrl } from '../api';
import { MusicDataType } from '../type';
import { listType } from '../type/detail';
export const androidRipple = {
  borderless: true,
  foreground: Platform.OS === 'android' && Platform.Version >= 23,
  radius: 30,
};
type AudioProp = {
  showToast: Function;
  hideToast: Function;
};
const Audio: React.FC<AudioProp> = ({ showToast, hideToast }) => {
  console.log('Audio');
  const dispatch = useAppDispatch();
  const play = useAppSelector(state => state.songState.status);
  const ls = useAppSelector(state => state.songState.songList);
  const index = useAppSelector(state => state.songState.currentIndex);
  const [songDetail, setSongDetail] = useState<Track>();
  const playSong = () => {
    dispatch(setPlay(false));
    TrackPlayer.play();
  };
  const pauseSong = () => {
    dispatch(setPlay(true));
    TrackPlayer.pause();
  };
  const imgRef = useRef(new Animated.Value(0)).current;

  const rotate = imgRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getDetail = async () => {
    const lsIndex = index + 1;
    const msg = ls[lsIndex].songname + ls[lsIndex].singer[0].name;
    TrackPlayer.reset();
    showToast();
    const params = {
      msg,
      n: '1',
      type: 'json',
    };
    const res = await getSongUrl(params);
    const song: MusicDataType = {
      url: res.data.src,
      album: '',
      artist: res.data.name,
      title: res.data.songname,
      artwork: res.data.cover,
    };
    TrackPlayer.add(song);
    TrackPlayer.play();
    TrackPlayer.seekTo(165);
    hideToast();
    dispatch(setSongLists({ index: lsIndex }));
  };
  useTrackPlayerEvents([Event.PlaybackState], async event => {
    console.log(event, 'useTrackPlayerEvents');

    switch (event.state) {
      case 'buffering':
      case 'loading':
        dispatch(setPlay(true));
        break;
      case 'playing':
        rotateIn();
        const currentSong = await TrackPlayer.getActiveTrack();
        setSongDetail(currentSong);
        dispatch(setPlay(false));

        break;
      case 'paused':
        dispatch(setPlay(true));
        rotateOut();
        break;
      case 'error':
        dispatch(setPlay(true));
        break;
      case 'ended':
        getDetail();
        break;
    }
  });
  //注册监听 //监听播放状态
  //动画效果
  let animatVal = 0;
  const rotateIn = () => {
    imgRef.setValue(animatVal);

    Animated.loop(
      Animated.timing(imgRef, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };
  const rotateOut = () => {
    imgRef.stopAnimation(val => {
      animatVal = val;
    });
  };
  useEffect(() => {
    TrackPlayer.setupPlayer();
  }, []);

  return (
    <View style={className.box}>
      <View style={className.contain}>
        <Animated.View style={[{ transform: [{ rotate: rotate }] }]}>
          <Img style={[className.pic]} uri={songDetail?.artwork ?? null} />
        </Animated.View>
        <Text style={className.songName} numberOfLines={1}>
          {songDetail?.title ?? '未知歌曲'}-{songDetail?.artist ?? '未知歌曲'}
        </Text>
      </View>
      <View style={className.contain}>
        {play ? (
          <AudioBtn name="playcircleo" onClick={playSong} />
        ) : (
          <AudioBtn name="pausecircleo" onClick={pauseSong} />
        )}
      </View>
    </View>
  );
};
interface AudioBtnProps {
  name: string;
  onClick: () => void;
}
const AudioBtn = (prop: AudioBtnProps) => {
  return (
    <PlatformPressable onPress={prop.onClick} android_ripple={androidRipple}>
      <AntDesign name={prop.name} size={30} color="#000" />
    </PlatformPressable>
  );
};
const className = StyleSheet.create({
  box: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 8,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 8, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 48,
  },

  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    width: 50,
    height: 50,
    // border
    borderRadius: 50,
  },
  songName: {
    marginLeft: 20,
    width: 200,
  },
});
export default Audio;
