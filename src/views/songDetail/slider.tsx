import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';
import { rpx } from '../../tool/rpx';
import TrackPlayer, { useProgress } from 'react-native-track-player';
type SliderProps = {
  onValChange: (val: number) => void;
};
const SliderComponent = () => {
  let { position, buffered, duration } = useProgress();

  const timeStart = String(Math.floor(duration / 60)).padStart(2, '0');
  const timeEnd = String(Math.floor(duration % 60)).padStart(2, '0');
  let time: string = timeStart + ':' + timeEnd;
  const posStart = String(Math.floor(position / 60)).padStart(2, '0');
  const posEnd = String(Math.floor(position % 60)).padStart(2, '0');
  let start = posStart + ':' + posEnd;

  return (
    <View style={style.slider}>
      <Text style={style.time}>{start}</Text>
      <Slider
        style={{ width: rpx(580), height: 40 }}
        minimumTrackTintColor={'#000'}
        maximumTrackTintColor={'#444'}
        thumbTintColor={'#000'}
        maximumValue={duration}
        minimumValue={0}
        value={position}
        onSlidingComplete={val => TrackPlayer.seekTo(Math.floor(val))}
      />
      <Text style={style.time}>{time}</Text>
    </View>
  );
};
const style = StyleSheet.create({
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
});
export default SliderComponent;
