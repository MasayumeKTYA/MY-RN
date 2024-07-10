import React from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import storage from '../../storage/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Img from '../../components/Image';
import TrackPlayer from 'react-native-track-player';
import MemoAudio from '../../components/audio';
import { ToastProp, ListsType } from '../../type';

const Index: React.FC<ToastProp> = ({ navigation, Toast }) => {
  const { showToast, hideToast } = Toast;
  const [qqLists, setQQLists] = useState<ListsType[]>([]);

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
    const lists: ListsType = {
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
    console.log('Index');

    // storage.remove({ key: 'lists' });
    PermissionsAndroid.request('android.permission.READ_MEDIA_AUDIO');
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      storage
        .load({
          key: 'lists',
        })
        .then((res: ListsType[]) => {
          setQQLists(res);
        });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal
        visible={modalShow}
        onRequestClose={requestClose}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}>
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
      <View style={style.searchBox}>
        <View />
        <AntDesign
          size={26}
          name="search1"
          style={style.search}
          onPress={() => navigation.navigate('search')}
        />
      </View>
      <View style={style.btnBox}>
        <TouchableHighlight
          style={[style.localFile]}
          activeOpacity={1}
          underlayColor="rgba(245,245,245,0.45)"
          onPress={() => navigation.navigate('setting')}>
          <Text style={style.localFileFont}>最近</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[style.localFile]}
          activeOpacity={1}
          underlayColor="rgba(245,245,245,0.45)"
          onPress={createLocalList}>
          <Text style={style.localFileFont}>创建歌单</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[style.localFile]}
          activeOpacity={1}
          underlayColor="rgba(245,245,245,0.45)"
          onPress={() => navigation.navigate('localFile')}>
          <Text style={style.localFileFont}>本地音乐</Text>
        </TouchableHighlight>
      </View>
      <PlatformPressable
        style={[audio.box, { marginTop: 20 }]}
        onPress={() => navigation.push('importSong')}>
        <View style={audio.picBG}>
          <Ionicons name="add" size={50} />
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text style={audio.font1}>导入外部歌单</Text>
        </View>
      </PlatformPressable>
      <FlatList
        data={qqLists}
        renderItem={({ item }) => (
          <AudioBox data={item} navigation={navigation} />
        )}
        keyExtractor={item => String(item.id)}
      />
      <View style={{ height: 70, width: '100%', zIndex: 10 }} />
    </SafeAreaView>
  );
};
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
  searchBox: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  search: {
    justifyContent: 'flex-end',
  },

  btnBox: {
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  localFile: {
    width: 90,
    backgroundColor: '#F5F5F5',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  localFileFont: {
    color: '#000',
  },
});
interface AudioBoxProps {
  data: ListsType;
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}
const AudioBox = (props: AudioBoxProps) => {
  const { data, navigation } = props;
  const toDetail = (id: number) => {
    // console.log(id);
    navigation.navigate('detail', { id });
  };
  return (
    <PlatformPressable style={audio.box} onPress={() => toDetail(data.id)}>
      <Img style={audio.container} uri={data.picurl} />
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default Index;
