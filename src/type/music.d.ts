import { AddTrack } from 'react-native-track-player';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MusicDataType = {
  album: string;
  artist: string | null;
  title: string | null;
  duration?: string;
  type?: string;
  size?: number;
  artwork: string | null;
  url: string;
} & AddTrack;

export interface MusicType {
  Music: {
    setUrl: (url: string, size: number) => Promise<MusicDataType>;
  };
}

export interface MemoType {
  showToast: () => void;
  hideToast: () => void;
}
export type RouterProps = NativeStackScreenProps<ParamListBase>
export interface ToastProp extends NativeStackScreenProps<ParamListBase> {
  Toast: MemoType;
}
