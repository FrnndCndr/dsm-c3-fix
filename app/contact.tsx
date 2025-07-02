import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ContactScreen() {
  const coordinates = {
    latitude: -23.678895,
    longitude: -70.409455,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={coordinates}
          title="Copper Bites"
          description="Copper Bites"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});