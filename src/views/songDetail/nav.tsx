import { View, StyleSheet, Text, Platform } from 'react-native';
import { RouterProps } from '../../type';
import { HeaderBackButton } from '@react-navigation/elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
type NavProp = RouterProps & {
  title: string;
};
const Nav: React.FC<NavProp> = ({ navigation, title }) => {
  return (
    <View style={DetailNav.box}>
      <Ionicons
        name="arrow-down"
        size={25}
        color="#000"
        onPress={() => navigation.goBack()}
        style={{ marginHorizontal: 11 }}
      />
      <View style={{ width: 150, alignItems: 'center' }}>
        <Text style={Font.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <HeaderBackButton style={{ opacity: 0 }} />
    </View>
  );
};
const DetailNav = StyleSheet.create({
  box: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
const Font = StyleSheet.create({
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: '600',
    },
    android: {
      fontSize: 20,
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
      color: '#000',
    },
    default: {
      fontSize: 18,
      fontWeight: '500',
    },
  }),
});
export default Nav;
