import {Image, View, StyleSheet} from "react-native";

const ImageViewer = ({PlaceholderImage, selectedImage}) => {
  return (
    <View style={styles.imageContainer}>
        <Image source={selectedImage ? {uri:selectedImage} : PlaceholderImage} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex:1,
        paddingTop:58
      },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    }
})


export default ImageViewer