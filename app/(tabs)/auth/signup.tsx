import ImagePicker from "@/components/global/AvatarPicker";
import InputEmail from "@/components/global/InputEmail";
import InputPassword from "@/components/global/InputPassword";
import InputPhoneNumber from "@/components/global/InputPhoneNumber";
import InputText from "@/components/global/InputText";
import InputUsername from "@/components/global/InputUsername";
import { useSignup } from "@/hooks/user/useSignup";
import { useToast } from "@/hooks/useToast";
import { useForm } from "react-hook-form";
import {
	Pressable,
	ScrollView,
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

export default function SignupScreen() {
	const {
		username,
		setUsername,
		email,
		setEmail,
		telephoneNumber,
		setTelephoneNumber,
		billingAccountKey,
		setBillingAccountKey,
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
		setFile,
		handleSubmit: handleSignUp,
	} = useSignup();
	const toaster = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm<FormData>({
		defaultValues: { username, email, telephoneNumber, billingAccountKey, password, confirmPassword },
	});

	const handleInvalid = () => {
		toaster.showToast({
			type: "warning",
			message: "All fields are required",
		});
	}

	return (
		<View style={styles.container}>
			<ScrollView key={'scrollview'} keyboardShouldPersistTaps="handled">
				<View style={styles.form}>
					<ImagePicker setValue={setFile} />
					<InputUsername
						icon={true}
						label="Username"
						placeholder="Username"
						value={username}
						setValue={setUsername}
						control={control}
						error={errors.username}
					/>
					<InputEmail
						label="Email"
						placeholder="Email"
						value={email}
						setValue={setEmail}
						control={control}
						error={errors.email}
					/>
					<InputPhoneNumber
						label="Telephone Number"
						placeholder="Telephone Number"
						value={telephoneNumber}
						setValue={setTelephoneNumber}
						control={control}
						error={errors.telephoneNumber}
					/>
					<InputText
						placeholder={'Chave PIX'}
						setValue={setBillingAccountKey}
						value={billingAccountKey}
					/>
					<InputPassword
						label="Password"
						placeholder="Password"
						value={password}
						setValue={setPassword}
						control={control}
						error={errors.password}
					/>
					<InputPassword
						label="Confirm Password"
						placeholder="Confirm Password"
						value={confirmPassword}
						setValue={setConfirmPassword}
						control={control}
						error={errors.confirmPassword}
					/>
				</View>
			</ScrollView>

			<Pressable
				style={{
					...styles.button,
					backgroundColor: isDirty ? "black" : "gray",
				}}
				onPress={handleSubmit(handleSignUp, handleInvalid)}
			>
				<Text style={{ color: "white" }}>Sign Up</Text>
			</Pressable>
		</View>
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
		maxHeight: "60%",
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
