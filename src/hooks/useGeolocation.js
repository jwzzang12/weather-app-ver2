import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lon: 0 },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
      code: 1,
      message: '',
    });
  };

  const onError = () => {
    setLocation({
      loaded: true,
      coordinates: { lat: 0, lon: 0 },
      code: 0,
      message: 'Geolocation is not allowed. Please change the setting.',
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
