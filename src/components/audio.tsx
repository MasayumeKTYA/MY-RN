import {
  View,
  StyleSheet,
  Text,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useEffect, useRef, useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PlatformPressable } from '@react-navigation/elements';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Img from './Image';
import { useAppDispatch, useAppSelector } from '../store/index';
import { setPlay, setSongLists } from '../store/module/songState';
import { getSongUrl } from '../api';
import { MemoType, MusicDataType } from '../type';
import storage from '../storage';
export const androidRipple = {
  borderless: true,
  foreground: Platform.OS === 'android' && Platform.Version >= 23,
  radius: 30,
};
const Audio: React.FC<MemoType> = ({ showToast, hideToast }) => {
  const dispatch = useAppDispatch();
  const {
    status: play,
    songList: ls,
    currentIndex: index,
    isShow,
  } = useAppSelector(state => state.songState);

  const [songDetail, setSongDetail] = useState<Track>();
  const navigation: any = useNavigation();
  const playSong = () => {
    dispatch(setPlay(false));
    TrackPlayer.play();
  };
  const pauseSong = () => {
    dispatch(setPlay(true));
    TrackPlayer.pause();
  };

  const getDetail = async () => {
    const lsIndex = index + 1;
    const msg = ls[lsIndex].artist + ls[lsIndex].title;
    TrackPlayer.reset();
    showToast();

    const res = await getSongUrl(msg);
    const song: MusicDataType = {
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    };
    TrackPlayer.add(song);
    TrackPlayer.play();
    dispatch(setSongLists({ index: lsIndex }));
    hideToast();
  };
  const readPrePlay = async () => {
    try {
      const res = await storage.load({ key: 'current' });
      await TrackPlayer.add(res);
      await setCurrent();
    } catch (error) {
      console.log(error, 'err');
      await TrackPlayer.setupPlayer();
      readPrePlay();
    }
  };
  const setCurrent = async () => {
    const currentSong = await TrackPlayer.getActiveTrack();
    setSongDetail(currentSong);
  };
  useTrackPlayerEvents([Event.PlaybackState], async event => {
    console.log(event, 'useTrackPlayerEvents');
    switch (event.state) {
      case 'buffering':
      case 'loading':
        dispatch(setPlay(true));
        break;
      case 'playing':
        // rotateIn();
        setCurrent();
        dispatch(setPlay(false));

        break;
      case 'paused':
        dispatch(setPlay(true));
        // rotateOut();
        break;
      case 'error':
        dispatch(setPlay(true));
        break;
      case 'ended':
        getDetail();
        break;
    }
  });

  useEffect(() => {
    console.log('Audio');
    readPrePlay();
  }, []);

  return (
    <>
      {isShow && (
        <PlatformPressable onPress={() => navigation.navigate('SongDetail')}>
          <View style={className.box}>
            <View style={className.contain}>
              {/* style={[{ transform: [{ rotate: rotate }] }]} */}
              <Animated.View>
                <Img
                  style={[className.pic]}
                  uri={songDetail?.artwork ?? null}
                />
              </Animated.View>
              <Text style={className.songName} numberOfLines={1}>
                {songDetail?.title ?? '未知歌曲'}-
                {songDetail?.artist ?? '未知歌曲'}
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
        </PlatformPressable>
      )}
    </>
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
    zIndex: 2,
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
const MemoAudio = memo<MemoType>(
  ({ showToast, hideToast }) => (
    <Audio showToast={showToast} hideToast={hideToast} />
  ),
  () => true,
);
export default MemoAudio;
