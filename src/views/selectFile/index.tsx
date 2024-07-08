import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert,
  NativeModules,
  TouchableHighlight,
  Platform,
  Modal,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { PlatformPressable } from '@react-navigation/elements';
import { useState, useEffect } from 'react';
import {
  readDir,
  ExternalStorageDirectoryPath,
  ReadDirItem,
  writeFile,
  ExternalDirectoryPath,
} from 'react-native-fs';
import { androidRipple } from '../../shareVar/index';
import storage from '../../storage/index';
import { MusicDataType, MusicType, ToastProp } from '../../type/index';

const SelectFile: React.FC<ToastProp> = ({ Toast }) => {
  const { showToast, hideToast } = Toast;
  const [fileArr, setFileArr] = useState<ReadDirItem[]>([]);
  const readDirList = async (fileName: string) => {
    try {
      const res = await readDir(fileName);
      const fileItem: ReadDirItem[] = [];
      res.forEach(item => {
        if (item.isDirectory()) {
          fileItem.push(item);
        }
      });

      setFileArr(fileItem);
    } catch (e) {
      Alert.alert('读取文件夹出错,请从试');
    }
  };
  const [currentPath, setCurrentPath] = useState(ExternalStorageDirectoryPath);
  //选择文件
  const selectDir = async (fileName: string) => {
    setCurrentPath(fileName);
    readDirList(fileName);
  };
  //上一级
  const back = () => {
    if (currentPath === '/storage/emulated/0') {
      showToast('已经是根目录啦');
      setTimeout(hideToast, 1000);
      return;
    }
    const pathArray = currentPath.split('/');
    pathArray.shift();
    const lastPath = pathArray.reduce((pre, cur, index) => {
      if (index === pathArray.length - 1) return pre;
      return pre + '/' + cur;
    }, '');
    setCurrentPath(lastPath);
    readDirList(lastPath);
  };
  //选择此路径
  const { Music }: MusicType = NativeModules as MusicType;
  const confirmPath = async () => {
    showToast();
    try {
      console.log(currentPath);

      let pathLists = await readDir(currentPath);
      const res: MusicDataType[] = await storage.load({ key: 'storagePath' });
      const musicRegex = /\.(mp3|ogg)$/i;
      pathLists = pathLists.filter(
        item => item.isFile() && musicRegex.test(item.name),
      );

      pathLists.forEach(async (item, index) => {
        if (!item.isFile()) return;
        if (!musicRegex.test(item.name)) return;

        const soundRespone = await Music.setUrl(item.path, item.size);

        let picPath: string = '';
        if (soundRespone.artwork !== null) {
          picPath = ExternalDirectoryPath + `/${new Date().valueOf()}` + '.png';
          writeFile(picPath, soundRespone.artwork, 'base64');
          soundRespone.artwork = picPath;
        }
        res.push(soundRespone);

        if (index === pathLists.length - 1) {
          setStorage(res);
        }
      });
      if (pathLists.length === 0) {
        hideToast();
      }
    } catch (err) {
      hideToast();
      Alert.alert('报错');
    }
  };
  function setStorage(res: MusicDataType[]) {
    storage.save({ key: 'storagePath', data: res });

    showToast('导入成功');
    setTimeout(hideToast, 1000);
  }
  useEffect(() => {
    readDirList(ExternalStorageDirectoryPath);
  }, []);
  return (
    <View style={style.box}>
      {/* <Toast /> */}
      <View style={style.header}>
        <PlatformPressable onPress={back} android_ripple={androidRipple}>
          <View style={{ width: 40, alignItems: 'center' }}>
            <FontAwesome6 name="angle-left" size={30} color={'#000'} />
          </View>
        </PlatformPressable>
        <Text style={style.headerFont}>{currentPath}</Text>
      </View>
      <FlatList
        style={style.box}
        data={fileArr}
        keyExtractor={item => item.name}
        ListEmptyComponent={() => {
          return (
            <View style={style.empty}>
              <Fontisto name="file-2" color={'#000'} size={60} />
              <Text style={style.emptyFont}>暂无文件~</Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return (
            <PlatformPressable onPress={() => selectDir(item.path)}>
              <View style={style.fileBox}>
                <FontAwesome6
                  name="folder-plus"
                  color="rgb(255,217,110)"
                  size={40}
                  style={style.folder}
                />
                <Text style={style.font}>{item.name}</Text>
              </View>
            </PlatformPressable>
          );
        }}
      />
      <View style={{ height: 70 }} />
      <TouchableHighlight
        underlayColor="#3a8ee6"
        style={style.btn_heghtBox}
        onPress={confirmPath}>
        <View style={style.btn_box}>
          <FontAwesome6
            name="file-medical"
            size={20}
            color="#fff"
            style={style.pic}
          />
          <Text style={style.font1}>选择此路径</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  headerFont: {
    fontSize: 16,
    color: '#000',
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fileBox: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  folder: {
    marginRight: 20,
  },
  font: {
    color: '#000',
    fontSize: 17,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  emptyFont: {
    marginBottom: 10,
    fontSize: 17,
    color: '#000',
  },

  btn_heghtBox: {
    alignItems: 'center',
    backgroundColor: Platform.OS === 'android' ? '#2196F3' : '#007AFF',
    padding: 10,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 120,
    left: '50%',
    transform: [{ translateX: -150 }],
  },
  btn_box: {
    flexDirection: 'row',
  },
  font1: {
    color: '#fff',
    fontWeight: '700',
  },
  pic: {
    marginRight: 20,
  },
});
export default SelectFile;
