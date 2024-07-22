import React from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableHighlight,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import storage from '@/storage/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { PlatformPressable } from '@react-navigation/elements';
import { AntDesign, Ionicons } from '@/icon/index';
import { ToastProp, ListsType } from '@/type';
import AudioBox from './audioBox';
import { guid } from '@/tool/tool';
import MemoAudio from '@/components/audio';
import { mkdir, ExternalDirectoryPath } from 'react-native-fs';

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
      id: guid(),
      picurl: null,
      num: 0,
      title: songListsName,
    };

    setQQLists([...qqLists, lists]);
    setModalShow(false);
    setSongListsName('');
    storage.save({
      key: 'lists',
      data: [...qqLists, lists],
    });
    storage.save({
      key: String(filterList.length),
      data: [],
    });
  };
  //刷新列表
  const Refresh = async () => {
    try {
      const res: ListsType[] = await storage.load({
        key: 'lists',
      });
      setQQLists(res);
    } catch (error) {
      //初始化创建
      await storage.save({ key: 'lists', data: [] });
      await storage.save({
        key: 'current',
        data: {
          id: '',
          url: '',
          artist: '未知',
          title: '未知',
          artwork: null,
          album: '',
        },
      });
    }
  };
  //创建文件
  const createDownload = async () => {
    await mkdir(ExternalDirectoryPath + '/downLoad');
  };
  useEffect(() => {
    console.log('Index');
    createDownload();
    PermissionsAndroid.request('android.permission.READ_MEDIA_AUDIO');
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Refresh();
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
              placeholder="请输入..."
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
                style={[modalStyle.Touchable, { backgroundColor: '#555555' }]}
                activeOpacity={1}
                underlayColor="rgba(0, 0, 0, 0.45)"
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
        <AntDesign
          name="menuunfold"
          size={26}
          color={'#000'}
          onPress={() => navigation.openDrawer()}
        />
        <AntDesign
          size={26}
          name="search1"
          color={'#000'}
          style={style.search}
          onPress={() => navigation.navigate('search')}
        />
      </View>
      <View style={style.btnBox}>
        {/* <TouchableHighlight
          style={[style.localFile]}
          activeOpacity={1}
          underlayColor="rgba(245,245,245,0.45)"
          onPress={() => navigation.navigate('setting')}>
          <Text style={style.localFileFont}>最近</Text>
        </TouchableHighlight> */}
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
        style={[style.box, { marginTop: 20 }]}
        onPress={() => navigation.navigate('importSong')}>
        <View style={style.picBG}>
          <Ionicons name="add" size={50} />
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text style={style.font1}>导入外部歌单</Text>
        </View>
      </PlatformPressable>
      <FlatList
        data={qqLists}
        renderItem={({ item }) => (
          <AudioBox data={item} navigation={navigation} onConfirm={Refresh} />
        )}
        keyExtractor={item => String(item.id)}
      />
      <View style={{ height: 70 }} />
      <MemoAudio showToast={showToast} hideToast={hideToast} />
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
    borderRadius: 10,
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
    borderRadius: 5,
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
    borderRadius: 5,
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
  font1: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Index;
