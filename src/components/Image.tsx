import { Image, ImageStyle, StyleProp } from 'react-native';
import { useEffect, useState } from 'react';
interface ImgProps {
  uri: string | null;
  style: StyleProp<ImageStyle>;
  net: boolean;
}
const Img: React.FC<ImgProps> = ({ uri, style, net }) => {
  let [myComponents, setMyComponents] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    if (uri !== null) {
      let url = uri;
      if (!net) {
        url = 'file://' + url;
      }
      setMyComponents(
        // 'file://' +
        <Image source={{ uri: url }} style={style} />,
      );
    } else {
      setMyComponents(
        <Image source={require('../assest/text.jpg')} style={style} />,
      );
    }
  }, [uri]);
  return <>{myComponents}</>;
};
export default Img;
