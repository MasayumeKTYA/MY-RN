import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
} from 'react-native';
import { changeShow } from '../../store/module/songState';
import { useAppDispatch } from '../../store/index';
import { useEffect, useState } from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';
import { RouterProps } from '../../type';
import Img from '../../components/Image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Nav from './nav';
import { rpx } from '../../tool/rpx';
const StatusBarHeight = StatusBar.currentHeight;
const SongDetail: React.FC<RouterProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  //获取当前播放歌曲

  const [songDetail, setSongDetail] = useState<Track>();
  // const [source, setSource] = useState<any>();
  const setCurrent = async () => {
    const currentSong = await TrackPlayer.getActiveTrack();
    setSongDetail(currentSong);
  };
  const obj: any = route.params;

  const source = obj.artwork
    ? { uri: obj?.artwork }
    : require('../../assest/text.jpg');
  console.log(source);

  useEffect(() => {
    dispatch(changeShow(false));
    setSongDetail(obj);
    return () => {
      dispatch(changeShow(true));
    };
  }, []);
  return (
    <>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={style.background}
        blurRadius={30}>
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
          <Ionicons name="arrow-down" size={20} color="#fff" />
          <Ionicons name="ellipsis-vertical-sharp" size={20} color="#fff" />
        </View>
        <View style={style.slider}>
          <Text style={style.time}>00:00</Text>
          <Slider
            style={{ width: rpx(580), height: 40 }}
            minimumTrackTintColor={'#cccccc'}
            maximumTrackTintColor={'#999999'}
            thumbTintColor={'#dddddd'}
            minimumValue={0}
          />
          <Text style={style.time}>00:00</Text>
        </View>
        <View style={style.playBar}>
          <Ionicons name="play-skip-back-sharp" size={30} color="#fff" />
          <Ionicons name="caret-forward-circle-sharp" size={50} color="#fff" />
          <Ionicons name="play-skip-forward" size={30} color="#fff" />
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
    color: '#fff',
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
