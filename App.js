// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, Callout, Circle} from 'react-native-maps';
import * as Location from "expo-location"
import * as React from 'react'
import { Dimensions } from 'react-native';

export default function App() {
  const [Pin,setPin] = React.useState({
    latitude: 18.521761780493907,
    longitude: 73.85594520717859, 
  })
  
  React.useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "Granted") {
        setErrorMsg("Permission Denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 18.521761780493907,
        longitude: 73.85594520717859,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    onUserLocationChange = {(e) => {
      console.log("onUserLocationChange: ",e.nativeEvent.coordinate);
      setPin({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      });
    }}
      >
        <Marker coordinate={{latitude: 18.521761780493907, longitude: 73.85594520717859}}
        title="Entered coordinates"
        description="Pin points to the Requested Location coordinates"
        pinColor="gold"
        draggable={true}
        onDragStart={(e) => {
          console.log("drag start", e.nativeEvent.coordinate);
        }}
        onDragEnd={(e) => {
          console.log("drag end", e.nativeEvent.coordinate);

          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          });
       }}
        >
          <Callout>
            <Text>This is Callout</Text>
          </Callout>
        </Marker>
        <Circle center={Pin}
        radius={1000}/>
      </MapView>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
