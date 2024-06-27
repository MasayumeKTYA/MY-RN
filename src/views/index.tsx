import React from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  PermissionsAndroid,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import storage from '../storage/index';
import { useEffect } from 'react';
import { MusicDataType } from '../type/index';
import { QQListsType } from '../type/api';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { getPersonLists } from '../api/index';

import { PlatformPressable } from '@react-navigation/elements';
import { setSongId } from '../store/module/songState';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const Index = (prop: NativeStackScreenProps<ParamListBase>) => {
  console.log('Index');
  const { navigation } = prop;
  const [qqLists, setQQLists] = useState<QQListsType[]>([]);

  const getListsHttp = async () => {
    const data = {
      _: '1718372284986',
      cv: '4747474',
      ct: '24',
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: '0',
      platform: 'yqq.json',
      needNewCode: '0',
      uin: '1419965049',
      g_tk_new_20200303: '1573671023',
      g_tk: '1573671023',
      cid: '205360838',
      userid: '1419965049',
      reqfrom: '1',
      reqtype: '0',
      hostUin: '0',
      loginUin: '1419965049',
    };
    const res = await getPersonLists(data);
    if (Object.keys(res.data).length === 0) return;
    setQQLists(res.data.mydiss.list);
  };
  useEffect(() => {
    getListsHttp();
    storage
      .load({
        key: 'storagePath',
      })
      .then((res: MusicDataType[]) => {
        // setMusicLists(res);
      })
      .catch(() => {
        storage.save({
          key: 'storagePath',
          data: [],
        });
      });

    storage.remove({ key: 'storagePath' });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <AntDesign
          size={26}
          name="search1"
          style={style.search}
          onPress={() => {
            console.log(21);
            navigation.navigate('search');
          }}
        />

        <Image
          style={style.headerImg}
          source={require('../assest/text.jpg')}
          blurRadius={10}
        />
        <TouchableHighlight
          style={[style.localFile, { left: 30 }]}
          activeOpacity={1}
          underlayColor="rgba(255, 255, 255, 0.45)"
          onPress={() => {}}>
          <Text style={style.localFileFont}>最近</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[style.localFile, { right: 30 }]}
          activeOpacity={1}
          underlayColor="rgba(255, 255, 255, 0.45)"
          onPress={() => navigation.navigate('localFile')}>
          <Text style={style.localFileFont}>本地音乐</Text>
        </TouchableHighlight>
        <View style={style.fillBox} />
        <ScrollView style={style.scroll}>
          {qqLists.map(item => (
            <AudioBox key={item.title} data={item} navigation={navigation} />
          ))}
          <View style={{ height: 70 }} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
const halfHeight = Dimensions.get('window').height / 2;
const halfWidth = Dimensions.get('window').width / 2;
const style = StyleSheet.create({
  search: {
    position: 'absolute',
    zIndex: 2,
    top: 10,
    right: 20,
    height: 30,
  },

  headerImg: {
    top: 0,
    left: 0,
    zIndex: 0,
    position: 'absolute',
    height: halfHeight,
    width: '100%',
  },
  fillBox: {
    height: halfHeight - 20,
  },
  localFile: {
    position: 'absolute',
    zIndex: 2,
    top: halfHeight - 80,

    width: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localFileFont: {
    color: '#000',
    fontWeight: 'bold',
  },
  scroll: {
    borderRadius: 20,
    backgroundColor: '#fff',
    // flex: 1,
    height: halfHeight,
  },
});
interface AudioBoxProps {
  data: QQListsType;
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}
const AudioBox = (props: AudioBoxProps) => {
  const { data, navigation } = props;

  const toDetail = (id: number) => {
    navigation.navigate('detail', { id });
  };
  return (
    <PlatformPressable style={audio.box} onPress={() => toDetail(data.dissid)}>
      <Image source={{ uri: data.picurl }} style={audio.container} />
      <View>
        <Text style={audio.font1}>{data.title}</Text>
        <Text style={audio.font2}>{data.subtitle}</Text>
      </View>
    </PlatformPressable>
  );
};
const audio = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: 50,
    height: 50,

    marginRight: 20,
  },
  font1: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  font2: {
    fontSize: 12,
  },
});
