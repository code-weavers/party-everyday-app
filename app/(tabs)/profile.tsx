import ImagePicker from "@/components/global/AvatarPicker";
import CustomTitle from "@/components/global/CustomTitle";
import SafeContainer from "@/components/global/SafeContainer";
import { useAuth } from "@/hooks/auth/useAuth";
import { useUserStore } from "@/hooks/useUserStore";
import { IImagePickerAsset } from "@/interfaces/file.interface";
import { useState } from "react";
import {
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   View
} from "react-native";

type FormData = {
   username: string;
   email: string;
   telephoneNumber: string;
   billingAccountKey: string;
   password: string;
   confirmPassword: string;
};

export default function ProfileScreen() {
   const user = useUserStore();
   const { logout } = useAuth();
   const [file, setFile] = useState<IImagePickerAsset>();

   const username = user.user?.username || '';
   const email = user.user?.email || '';
   const telephoneNumber = user.user?.phoneNumber || '';
   const billingAccountKey = ''

   return (
      <SafeContainer>
         <View style={styles.container}>
            <View style={styles.form}>
               <CustomTitle title="Perfil" />

               <ImagePicker setValue={setFile} uri={user.user?.file?.url} isEnable={false} />

               <TextInput placeholder={username} editable={false} style={styles.input} />
               <TextInput placeholder={email} editable={false} style={styles.input} />
            </View>

            <Pressable
               style={styles.button}
               onPress={() => logout()}
            >
               <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
                  Logout
               </Text>
            </Pressable>
         </View>
      </SafeContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 16,
   },
   form: {
      flex: 1,
      width: "100%",
      top: 10,
   },
   input: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
   },
   button: {
      backgroundColor: "black",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      alignItems: "center",
      bottom: 100,
   },
});

