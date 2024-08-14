import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import InputEmail from "@/components/global/InputEmail";
import InputPassword from "@/components/global/InputPassword";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FormData = {
	email: string;
	password: string;
};

export default function SigninScreen() {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<FormData>({
		defaultValues: { email, password },
	});
	const handleSignIn = () => {
		login({ email, password });
	};

	return (
		<View style={styles.container}>
			<CustomTitle title="Sign In" />
			<CustomSubTitle subtitle="Welcome back!" />

			<View style={styles.form}>
				<InputEmail
					label="Email"
					placeholder="Email"
					value={email}
					setValue={setEmail}
					control={control}
					error={errors.email}
				/>
				<InputPassword
					label="Password"
					placeholder="Password"
					value={password}
					setValue={setPassword}
					control={control}
					error={errors.password}
				/>
			</View>

			<Pressable
				style={{
					...styles.button,
					backgroundColor: isDirty ? "black" : "gray",
				}}
				onPress={handleSubmit(handleSignIn)}
			>
				<Text style={{ color: "white" }}>Sign In</Text>
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
