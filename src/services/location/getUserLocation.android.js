import { PermissionsAndroid } from 'react-native';

const checkPermissionAlreadyGranted = async () => {
  const isPermissionAlreadyGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return isPermissionAlreadyGranted;
};

const requestLocationPermission = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'WeTrip Location Permission',
      message:
        'WeTrip needs access to your Location so you can see places that are near to you.',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  return result;
};

const getUserLocation = async (navigator) => {
  const isPermissionAlreadyGranted = await checkPermissionAlreadyGranted();

  if (!isPermissionAlreadyGranted) {
    const isGrantedLocationPermission = await requestLocationPermission();

    if (isGrantedLocationPermission === PermissionsAndroid.RESULTS.DENIED) {
      return null;
    }
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 60000,
      },
    );
  });
};

export default getUserLocation;
