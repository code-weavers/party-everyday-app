import useCurrentLocation from "@/hooks/useCurrentLocation";
import useMapPickerFocus from "@/hooks/useMapPickerFocus";
import { ICoordinates } from "@/interfaces/coordinates.interface";
import { useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapViewerProps {
	location: ICoordinates;
	setRegion: (region: ICoordinates) => void;
}

export default function MapViewer({ location, setRegion }: MapViewerProps) {
	const { latitude, longitude } = useCurrentLocation();
	const { longDelta, latDelta } = useMapPickerFocus(latitude);
	const { width, height } = Dimensions.get("screen");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const handleChangeComplete = (region: ICoordinates) => {
		setTitle(region.lat.toString());
		setDescription(region.lng.toString());
		setRegion({
			lat: region.lat,
			lng: region.lng,
		});
	};

	return (
		<MapView
			style={{
				flex: 1,
				width: width * 0.9,
				maxHeight: height * 0.67,
				borderRadius: 5,
			}}
			region={{
				latitude: Number(location.lat === "" ? latitude : location.lat),
				longitude: Number(location.lng === "" ? longitude : location.lng),
				latitudeDelta: longDelta,
				longitudeDelta: latDelta,
			}}
			showsUserLocation={true}
			onRegionChangeComplete={(region) => {
				handleChangeComplete({
					lat: String(region.latitude),
					lng: String(region.longitude),
				});
			}}
			onLongPress={(event) => {
				handleChangeComplete({
					lat: String(event.nativeEvent.coordinate.latitude),
					lng: String(event.nativeEvent.coordinate.longitude),
				});
			}}
		>
			<Marker
				coordinate={{
					latitude: Number(location.lat),
					longitude: Number(location.lng),
				}}
				title={title}
				description={description}
			/>
		</MapView>
	);
}
