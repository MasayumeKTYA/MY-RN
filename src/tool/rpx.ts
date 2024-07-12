import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const minWindowEdge = Math.min(windowHeight, windowWidth);
// const maxWindowEdge = Math.max(windowHeight, windowWidth);
export function rpx(rpx: number) {
  return (rpx / 750) * minWindowEdge;
}