import { IImagePickerAsset } from '@/interfaces/file.interface';
import { MaterialIcons } from '@expo/vector-icons';
import {
   ImagePickerAsset,
   MediaTypeOptions,
   launchImageLibraryAsync,
} from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface ImagePickerProps {
   uri?: string;
   setValue: (fileResponse: IImagePickerAsset) => void;
   isEnable?: boolean;
}

export default function ImagePicker({ setValue, uri, isEnable }: ImagePickerProps) {
   const [fileResponse, setFileResponse] = useState<ImagePickerAsset>();

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await launchImageLibraryAsync({
         mediaTypes: MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.canceled) {
         setFileResponse(result.assets[0]);
         setValue(result.assets[0]);
      }
   };

   useEffect(() => { }, [fileResponse]);

   const icon = fileResponse === undefined ? require('../../../assets/images/avatar.png') : { uri: fileResponse.uri };
   const imageUri = uri ? { uri } : icon;

   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image source={imageUri} style={styles.image} ></Image>
         </View>
         <View style={styles.button}>
            <MaterialIcons
               name="add-a-photo"
               size={24}
               color="black"
               onPress={pickImage}
               style={{ display: isEnable ? 'flex' : 'none' }}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      display: 'flex',
      alignItems: 'center',
   },
   imageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      width: 118,
      height: 118,
      borderRadius: 60,
   },
   button: {
      position: 'absolute',
      right: 150,
      bottom: 0,
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 5,
   },
});