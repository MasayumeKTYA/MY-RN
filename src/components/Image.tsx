import { Image, ImageStyle, StyleProp } from 'react-native';
import { useEffect, useState } from 'react';
interface ImgProps {
  uri: string | null;
  style: StyleProp<ImageStyle>;
  blur?: number;
}
const Img: React.FC<ImgProps> = ({ uri, style, blur = 0 }) => {
  let [myComponents, setMyComponents] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    if (uri !== null) {
      let url = uri;
      const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      if (!Expression.test(uri)) {
        url = 'file://' + url;
      }

      setMyComponents(
        <Image source={{ uri: url }} style={style} blurRadius={blur} />,
      );
    } else {
      setMyComponents(
        <Image
          source={require('../assest/text.jpg')}
          style={style}
          blurRadius={blur}
        />,
      );
    }
  }, [uri]);
  return <>{myComponents}</>;
};
export default Img;
