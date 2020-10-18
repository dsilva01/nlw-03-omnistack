import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface OrphanageItem {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {
  const [location, setLocation] = useState({latitude:0, longitude:0});
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    }, [])
);
  
  useEffect(() => handleLocation() , []);
  
  const navigation = useNavigation();
  
  function handleLocation() {
    navigator.geolocation.getCurrentPosition((latlog) => {
      let latitude = latlog.coords.latitude;
      let longitude = latlog.coords.longitude;
      setLocation({latitude, longitude});
    });
  }
  
  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }
  
  function handleNavigateCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  if(location.latitude === 0) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage =>{
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
                /*latitude: location.latitude,
                longitude: location.longitude,*/
              }}
            >
              <Callout
                tooltip onPress={() => { handleNavigateToOrphanageDetails(orphanage.id)}}
              >
                <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer} >
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b4'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});
