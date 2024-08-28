import { useUserStore } from "@/hooks/useUserStore";
import { useGetUser } from "@/hooks/user/useGetUser";
import AuthenticatedTabs from "../authenticatedTabs";
import UnauthenticatedTabs from "../unauthenticatedTabs";

export default function TabLayout() {
	const { user } = useUserStore();
	const { user: userQuery } = useGetUser();

	const userVerify = user || userQuery;

	return userVerify ? <AuthenticatedTabs /> : <UnauthenticatedTabs />;
}
