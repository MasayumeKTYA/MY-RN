import { AddTrack } from 'react-native-track-player';
import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer'
export type MusicDataType = {
  id: string; //id
  album: string; //专辑
  artist: string | null; //作者
  title: string | null; // 歌曲名称
  duration?: string; //持续时间
  type?: string; // 文件类型
  size?: number; // 大小
  artwork: string | null; //封面
  url: string; // 播放链接
} & AddTrack;

export interface MusicType {
  Music: {
    setUrl: (url: string, size: number) => Promise<MusicDataType>;
    getSongTimer: (urk: string) => Promise<{ duration?: string }>;
  };
}

export interface MemoType {
  showToast: (text?: string) => void;
  hideToast: () => void;
  navigation?: NativeStackNavigationProp<ParamListBase, string, undefined>;
}
export type RouterProps = DrawerScreenProps<ParamListBase>;
export interface ToastProp extends DrawerScreenProps<ParamListBase> {
  Toast: MemoType;
}
