import { Button, StyleSheet, TextInput, View } from 'react-native';
import { RouterProps } from '../../type/music';
import { useState } from 'react';
import { UrlFetch } from '../../api';

const ImportSong: React.FC<RouterProps> = () => {
  const [url, SetUrl] = useState('');
  const UrlRequest = async () => {
    const res = await UrlFetch(url);
    console.log(res);
  };
  return (
    <View style={ImportCss.box}>
      <TextInput
        value={url}
        onChangeText={text => SetUrl(text)}
        style={ImportCss.Text}
        placeholder="输入歌单url"
        multiline={true}
        numberOfLines={8}
      />
      <View style={ImportCss.btn}>
        <Button title="确定" onPress={UrlRequest} />
      </View>
    </View>
  );
};
const ImportCss = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Text: {
    marginTop: 20,
    width: '80%',
    // backgroundColor: 'red',
    textAlignVertical: 'top',
    borderRadius: 10,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    width: 200,
    marginTop: 100,
  },
});
export default ImportSong;
