import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import InputEmail from "@/components/global/InputEmail";
import InputPassword from "@/components/global/InputPassword";
import InputPhoneNumber from "@/components/global/InputPhoneNumber";
import InputUsername from "@/components/global/InputUsername";
import { useSignup } from "@/hooks/user/useSignup";
import { useForm } from "react-hook-form";
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
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
		handleSubmit: handleSignUp,
	} = useSignup();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm<FormData>({
		defaultValues: { username, email, telephoneNumber, password, confirmPassword },
	});

	return (
		<View style={styles.container}>
			<CustomTitle title="Sign Up" />
			<CustomSubTitle subtitle="Welcome! Please sign up to continue." />

			<View style={styles.form}>
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

			<Pressable
				style={{
					...styles.button,
					backgroundColor: isDirty ? "black" : "gray",
				}}
				onPress={handleSubmit(handleSignUp)}
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
	},
});
