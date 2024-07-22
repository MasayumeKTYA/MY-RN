import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
} from 'react-native';
import { changeShow, setPlay, setSongLists } from '@/store/module/songState';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { useEffect, useState } from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';
import { MusicDataType, ToastProp } from '@/type';
import Img from '@/components/Image';
import { Ionicons, AntDesign, defaultIcon } from '@/icon/index';
import Nav from './nav';
import { getSongUrl } from '@/api';
import SliderComponent from './slider';
import { downloadFile } from 'react-native-fs';
const StatusBarHeight = StatusBar.currentHeight;
const SongDetail: React.FC<ToastProp> = ({ navigation, route, Toast }) => {
  const dispatch = useAppDispatch();
  const { showToast, hideToast } = Toast;
  //获取当前播放歌曲
  const {
    status: play,
    songList,
    currentIndex,
    savePath,
  } = useAppSelector(state => state.songState);
  const [songDetail, setSongDetail] = useState<Track>();
  const [source, setSource] = useState<any>(defaultIcon);

  //1 下一首 2 上一首
  const nextOrPreview = async (type: 'next' | 'pre') => {
    let playIndex = 0;
    const map = {
      next: () => {
        if (currentIndex === songList.length - 1) {
          playIndex = 0;
        } else {
          playIndex = currentIndex + 1;
        }
      },
      pre: () => {
        if (currentIndex === 0) {
          playIndex = songList.length - 1;
        } else {
          playIndex = currentIndex - 1;
        }
      },
    };
    map[type]();
    const msg = songList[playIndex].title;
    TrackPlayer.reset();
    showToast();
    const res = await getSongUrl(msg);
    const song: MusicDataType = {
      id: '',
      url: res.src,
      artist: res.name,
      title: res.songname,
      artwork: res.pic,
      album: '',
    };
    setSongDetail(song);
    setSource(song.artwork ? { uri: song?.artwork } : defaultIcon);
    TrackPlayer.add(song);
    TrackPlayer.play();
    dispatch(setSongLists({ index: playIndex }));
    hideToast();
  };
  const setCurrent = async () => {
    const currentSong = await TrackPlayer.getActiveTrack();
    setSongDetail(currentSong);
    if (!currentSong?.artwork) {
      setSource(defaultIcon);
      return;
    }
    let uri = currentSong.artwork;
    const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    if (!Expression.test(uri)) {
      uri = 'file://' + uri;
    }
    setSource({ uri });
  };
  //下载歌曲
  const downFn = async () => {
    if (songDetail?.url === undefined) return;

    try {
      await downloadFile({
        fromUrl: songDetail?.url,
        toFile: `${savePath}/${songDetail.title}.mp3`,
      }).promise;
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(changeShow(false));
    return () => {
      dispatch(changeShow(true));
    };
  }, []);
  useEffect(() => {
    setCurrent();
  }, [currentIndex]);
  return (
    <>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={style.background}
        blurRadius={50}>
        <View style={{ height: StatusBarHeight }} />
        <Nav
          navigation={navigation}
          route={route}
          title={songDetail?.title ?? '未知歌曲'}
        />
        <View style={style.picBox}>
          <Img uri={songDetail?.artwork ?? null} style={style.pic} />
        </View>
        <View style={style.layOne}>
          <Ionicons name="arrow-down" size={20} color="#000" onPress={downFn} />
          <Ionicons name="ellipsis-vertical-sharp" size={20} color="#000" />
        </View>
        <SliderComponent />
        <View style={style.playBar}>
          <Ionicons
            name="play-skip-back-sharp"
            size={30}
            color="#000"
            onPress={() => nextOrPreview('pre')}
          />

          {play ? (
            <AntDesign
              name="play"
              size={50}
              color="#000"
              onPress={() => {
                dispatch(setPlay(false));
                TrackPlayer.play();
              }}
            />
          ) : (
            <AntDesign
              name="pausecircle"
              size={50}
              color="#000"
              onPress={() => {
                dispatch(setPlay(true));
                TrackPlayer.pause();
              }}
            />
          )}
          <Ionicons
            name="play-skip-forward"
            size={30}
            color="#000"
            onPress={() => nextOrPreview('next')}
          />
        </View>
      </ImageBackground>
    </>
  );
};
const style = StyleSheet.create({
  box: { flex: 1, width: '100%' },
  background: {
    width: '100%',
    height: '100%',
  },
  picBox: {
    height: '70%',
    justifyContent: 'center',
    // width: 100,
    // height: 100,
    alignItems: 'center',
  },
  pic: { width: 200, height: 200 },
  layOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  slider: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  time: {
    color: '#000',
    fontSize: 12,
  },
  playBar: {
    marginTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default SongDetail;
