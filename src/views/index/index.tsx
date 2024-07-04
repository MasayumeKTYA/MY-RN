import React from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import storage from '../../storage/index';
import { useEffect } from 'react';
import { QQListsType } from '../../type/api';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Img from '../../components/Image';

export const Index = (prop: NativeStackScreenProps<ParamListBase>) => {
  console.log('Index');
  const { navigation } = prop;
  const [qqLists, setQQLists] = useState<QQListsType[]>([]);

  //创建歌单
  const [modalShow, setModalShow] = useState(false);
  const [songListsName, setSongListsName] = useState('');
  const createLocalList = () => {
    setModalShow(true);
  };
  //关闭
  const requestClose = () => {
    setModalShow(false);
  };
  //确认创建
  const confirmCreate = async () => {
    if (songListsName === '') {
      return;
    }
    const filterList = qqLists.filter(item => item.isLocal);
    const lists: QQListsType = {
      isLocal: true,
      id: filterList.length,
      picurl: null,
      num: 0,
      title: songListsName,
    };

    console.log(lists);
    setQQLists([...qqLists, lists]);
    setModalShow(false);
    setSongListsName('');
    console.log(qqLists);

    storage.save({
      key: 'lists',
      data: [...qqLists, lists],
    });
    storage.save({
      key: String(filterList.length),
      data: [],
    });
  };
  useEffect(() => {
    storage
      .load({
        key: 'lists',
      })
      .then((res: QQListsType[]) => {
        setQQLists(res);
      });
    storage
      .load({
        key: '0',
      })
      .then(res => {
        console.log(res);
      });
    // storage.remove({ key: 'lists' });
    PermissionsAndroid.request('android.permission.READ_MEDIA_AUDIO');
  }, []);
  return (
    <SafeAreaView>
      <Modal
        visible={modalShow}
        onRequestClose={requestClose}
        animationType="fade"
        transparent={true}>
        <View style={modalStyle.modalBox}>
          <KeyboardAvoidingView style={modalStyle.modalContain}>
            <Text style={modalStyle.modalFont}>歌单名称</Text>
            <TextInput
              value={songListsName}
              style={modalStyle.modalInput}
              onChangeText={text => setSongListsName(text)}
            />
            <View style={modalStyle.modalBtn}>
              <TouchableHighlight
                style={[modalStyle.Touchable]}
                activeOpacity={1}
                underlayColor="rgba(255, 255, 255, 0.45)"
                onPress={requestClose}>
                <Text style={modalStyle.TouchableFont}>取消</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[modalStyle.Touchable, { backgroundColor: '#6ccf70' }]}
                activeOpacity={1}
                underlayColor="rgba(255, 255, 255, 0.45)"
                onPress={confirmCreate}>
                <Text style={(modalStyle.TouchableFont, { color: '#fff' })}>
                  确认
                </Text>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
          source={require('../../assest/text.jpg')}
          blurRadius={20}
        />
        <View style={style.btnBox}>
          <TouchableHighlight
            style={[style.localFile]}
            activeOpacity={1}
            underlayColor="rgba(255, 255, 255, 0.45)"
            onPress={() => navigation.navigate('setting')}>
            <Text style={style.localFileFont}>最近</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[style.localFile]}
            activeOpacity={1}
            underlayColor="rgba(255, 255, 255, 0.45)"
            onPress={createLocalList}>
            <Text style={style.localFileFont}>创建歌单</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[style.localFile]}
            activeOpacity={1}
            underlayColor="rgba(255, 255, 255, 0.45)"
            onPress={() => navigation.navigate('localFile')}>
            <Text style={style.localFileFont}>本地音乐</Text>
          </TouchableHighlight>
        </View>
        <View style={style.fillBox} />
        <ScrollView style={style.scroll}>
          <PlatformPressable
            style={[audio.box, { marginTop: 20 }]}
            onPress={() => {}}>
            <View style={audio.picBG}>
              <Ionicons name="add" size={50} />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={audio.font1}>导入外部歌单</Text>
            </View>
          </PlatformPressable>
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
const modalStyle = StyleSheet.create({
  modalBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContain: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 150,
    alignItems: 'center',
  },
  modalFont: {
    color: '#000',
    marginTop: 20,
  },
  modalInput: {
    width: '70%',
    backgroundColor: '#efefef',
    borderRadius: 10,
    height: 40,
    marginTop: 10,
  },
  modalBtn: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
  TouchableFont: {
    color: '#000',
  },
  Touchable: {
    marginTop: 20,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 30,
  },
});
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
    // backgroundColor: '#fff',
  },
  btnBox: {
    position: 'absolute',
    top: halfHeight - 80,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  localFile: {
    width: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  localFileFont: {
    color: '#fff',
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
    <PlatformPressable style={audio.box} onPress={() => toDetail(data.id)}>
      <Img style={audio.container} uri={data.picurl} net={true} />
      <View>
        <Text style={audio.font1}>{data.title}</Text>
        <Text style={audio.font2}>{data.num}首</Text>
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
  picBG: {
    backgroundColor: '#efefef',
    width: 50,
    alignItems: 'center',
    borderRadius: 10,
  },
  container: {
    width: 50,
    height: 50,

    marginRight: 20,
  },
  container1: {
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
