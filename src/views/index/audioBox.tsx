import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Img from '@/components/Image';
import { ListsType, RouterProps } from '@/type';
import { PlatformPressable } from '@react-navigation/elements';
import { AntDesign } from '@/icon/index';
import storage from '@/storage';
interface AudioBoxProps {
  data: ListsType;
  navigation: RouterProps['navigation'];
  onConfirm: () => void;
}
const AudioBox: React.FC<AudioBoxProps> = ({ data, navigation, onConfirm }) => {
  const [show, setShow] = useState(false);
  const toDetail = (id: string) => {
    // console.log(id);
    navigation.navigate('detail', { id });
  };
  //确认
  const confirm = async () => {
    console.log(data.id);
    // await storage.remove({ key: `${data.id}` });
    const res: ListsType[] = await storage.load({ key: 'lists' });
    const newArray = res.filter(item => item.id !== data.id);
    await storage.save({ key: 'lists', data: newArray });
    onConfirm();
  };
  return (
    <PlatformPressable
      style={[audio.box, audio.flex_ver]}
      onPress={() => toDetail(data.id)}>
      <View style={audio.flex_ver}>
        <Img style={audio.container} uri={data.picurl} />
        <View>
          <Text style={audio.font1}>{data.title}</Text>
          <Text style={audio.font2}>{data.num}首</Text>
        </View>
      </View>
      <AntDesign
        name="delete"
        size={20}
        color="#000"
        onPress={() => setShow(true)}
      />
      <Modal
        visible={show}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShow(false)}
        statusBarTranslucent={true}>
        <View style={audio.modalBox}>
          <View style={audio.modalContain}>
            <Text style={{ color: '#000', fontSize: 16 }}>是否删除?</Text>
            <View style={audio.modalBtn}>
              <TouchableHighlight
                style={[audio.Touchable]}
                activeOpacity={1}
                underlayColor="rgba(255, 255, 255, 0.45)"
                onPress={() => setShow(false)}>
                <Text style={audio.TouchableFont}>取消</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[audio.Touchable, { backgroundColor: '#555555' }]}
                activeOpacity={1}
                underlayColor="rgba(0, 0, 0, 0.45)"
                onPress={confirm}>
                <Text style={(audio.TouchableFont, { color: '#fff' })}>
                  确认
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </PlatformPressable>
  );
};
const audio = StyleSheet.create({
  box: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  flex_ver: { flexDirection: 'row', alignItems: 'center' },
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
    justifyContent: 'center',
  },
  TouchableFont: {
    color: '#000',
  },
  modalBtn: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
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
export default AudioBox;
