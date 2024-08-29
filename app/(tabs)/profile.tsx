import ImagePicker from "@/components/global/AvatarPicker";
import CustomTitle from "@/components/global/CustomTitle";
import InputDisplay from "@/components/global/InputDisplay";
import SafeContainer from "@/components/global/SafeContainer";
import { useAuth } from "@/hooks/auth/useAuth";
import { useUpdateAvatar } from "@/hooks/user/useUpdateUserAvatar";
import { useUserStore } from "@/hooks/useUserStore";
import {
   Pressable,
   StyleSheet,
   Text,
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
   const { setFile, handleSubmit } = useUpdateAvatar(user.user?.id || '');

   const username = user.user?.username || '';
   const email = user.user?.email || '';
   const telephoneNumber = user.user?.telephoneNumber || '';
   const billingAccountKey = user.user?.billingAccountKey || '';

   return (
      <SafeContainer>
         <View style={styles.container}>
            <View style={styles.form}>
               <CustomTitle title="Perfil" />

               <ImagePicker setValue={setFile} uri={user.user?.file?.url} handleSubmmit={handleSubmit} />

               <View>
                  <InputDisplay label="Nome" text={username} />
                  <InputDisplay label="E-mail" text={email} />
                  <InputDisplay label="Número de Telefone" text={telephoneNumber} />
                  <InputDisplay label="Chave PIX" text={billingAccountKey} isCopyable={true} />
               </View>
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
   button: {
      backgroundColor: "black",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      alignItems: "center",
      bottom: 100,
   },
});

