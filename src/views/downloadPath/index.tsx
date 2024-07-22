import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { PlatformPressable } from '@react-navigation/elements';
import { useState, useEffect } from 'react';
import {
  readDir,
  ExternalStorageDirectoryPath,
  ReadDirItem,
} from 'react-native-fs';
import { androidRipple } from '@/shareVar/index';
import storage from '@/storage/index';
import { ToastProp } from '@/type/index';
import CheckBox from '@react-native-community/checkbox';
import { setDownload } from '@/store/module/songState';
import { useAppDispatch } from '@/store/index';
const DownloadPath: React.FC<ToastProp> = ({ Toast }) => {
  const { showToast, hideToast } = Toast;
  const [fileArr, setFileArr] = useState<ReadDirItem[]>([]);
  //选中的下标
  const [active, setActive] = useState(-1);
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
      showToast('无法读取文件');
      setTimeout(hideToast, 1000);
    }
  };
  const [currentPath, setCurrentPath] = useState(ExternalStorageDirectoryPath);
  //选择文件
  const selectDir = async (fileName: string) => {
    setCurrentPath(fileName);
    setActive(-1);
    readDirList(fileName);
  };
  //上一级
  const back = () => {
    if (currentPath === '/storage/emulated/0') {
      showToast('已经是根目录啦');
      setTimeout(hideToast, 1000);
      return;
    }
    setActive(-1);
    const pathArray = currentPath.split('/');
    pathArray.shift();
    const lastPath = pathArray.reduce((pre, cur, index) => {
      if (index === pathArray.length - 1) return pre;
      return pre + '/' + cur;
    }, '');
    setCurrentPath(lastPath);
    readDirList(lastPath);
  };
  const dispatch = useAppDispatch();
  //选择路径
  const confirmPath = async () => {
    console.log(fileArr[active].path);
    storage.save({ key: 'savePath', data: fileArr[active].path });
    dispatch(setDownload(fileArr[active].path));
  };

  useEffect(() => {
    readDirList(ExternalStorageDirectoryPath);
  }, []);
  return (
    <View style={style.box}>
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
        initialNumToRender={11}
        maxToRenderPerBatch={11}
        ListEmptyComponent={() => {
          return (
            <View style={style.empty}>
              <Fontisto name="file-2" color={'#000'} size={60} />
              <Text style={style.emptyFont}>暂无文件~</Text>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <PlatformPressable
              onPress={() => selectDir(item.path)}
              style={style.rowBox}>
              <View style={style.fileBox}>
                <FontAwesome6
                  name="folder-plus"
                  color="rgb(255,217,110)"
                  size={40}
                  style={style.folder}
                />
                <Text style={style.font}>{item.name}</Text>
              </View>
              <CheckBox
                value={active === index}
                onChange={() => setActive(index)}
              />
            </PlatformPressable>
          );
        }}
      />
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
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: 50,
    justifyContent: 'center',
    bottom: 0,
    width: '100%',
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
export default DownloadPath;
