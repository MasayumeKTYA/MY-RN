/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer, { Event } from 'react-native-track-player';
const playbackService = async () => {
    // TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    // TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    
    // TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    //     const track = await TrackPlayer.getCurrentTrack()
    //     if (track == 1) {
    //         TrackPlayer.skipToPrevious()
    //     }
    // })
    // TrackPlayer.addEventListener(Event.RemoteJumpForward, async ({ interval }) => {
    //     const position = await TrackPlayer.getPosition()
    //     await TrackPlayer.seekTo(position + interval)
    // })
    // TrackPlayer.addEventListener(Event.RemoteJumpBackward, async ({ interval }) => {
    //     const position = await TrackPlayer.getPosition()
    //     await TrackPlayer.seekTo(position - interval)
    // })
  };
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);