import { Platform } from 'react-native';

export const androidRipple = {
  borderless: true,
  foreground: Platform.OS === 'android' && Platform.Version >= 23,
  radius: 20,
};

// <View style={s.box}>
//   <TouchableHighlight
//     underlayColor="#3a8ee6"
//     style={s.button}
//     onPress={() => console.log(2121)}>
//     <View style={s.btn_box}>
//       <FontAwesome6
//         name="file-medical"
//         size={20}
//         color="#fff"
//         style={s.pic}
//       />
//       <Text style={s.font}>自定义搜索</Text>
//     </View>
//   </TouchableHighlight>
// </View>
// const s = StyleSheet.create({
//   box: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     // flexDirection: 'row',
//     flex: 1,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: Platform.OS === 'android' ? '#2196F3' : '#007AFF',
//     padding: 10,
//     width: 300,
//     borderRadius: 20,
//     justifyContent: 'center',
//   },
//   btn_box: {
//     flexDirection: 'row',
//   },
//   font: {
//     color: '#fff',
//     fontWeight: '700',
//   },
//   pic: {
//     marginRight: 20,
//   },
// });
