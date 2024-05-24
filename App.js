import { Image, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar"
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as Imagepicker from "expo-image-picker";
import {useState} from "react";
const PlaceholderImage = require("./assets/images/background-image.png");
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(true);
  const [pickedEmoji, setPickedEmoji] = useState(null);


  const pickImageAsync = async() => {
    let res = await Imagepicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if(!res.canceled){
      setSelectedImage(res.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  }
  const onReset = () => {
    setShowAppOptions(false);
  }
  const onAddSticker = () => {
    setIsModalVisible(true);
  }
  const onSaveImageAsync = async() => {

  }
  

  return (
    <View style={styles.container}>   
        <View style={styles.imageContainer}>
          <ImageViewer PlaceholderImage={PlaceholderImage} selectedImage={selectedImage}/>
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
          {/* <ImageViewer PlaceholderImage={PlaceholderImage} selectedImage={selectedImage}/> */}
        </View>
        <View style={styles.footerContainer}>
          {
            showAppOptions ? (
            <View style={styles.OptionsContainer}>
              <View style={styles.OptionsRow}>
                <IconButton icon="refresh" onPress={onReset}/>
                <CircleButton onPress={onAddSticker}/>
                <IconButton icon="save-alt" onPress={onSaveImageAsync}/>
              </View>
            </View>
            ) 
            : 
            (
              <View>
                <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
                <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
              </View>
            ) 
          }
        </View>
        <EmojiPicker isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={() => setIsModalVisible(false)}/>
        </EmojiPicker>
      <StatusBar style="auto"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  imageContainer: {
    flex:1,
    paddingTop:58
  },
  footerContainer: {
    flex: 1/3,
    alignItems: "center",
  },
  OptionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  OptionsRow: {
    flexDirection: "row",
    alignItems: "center",
  }
});