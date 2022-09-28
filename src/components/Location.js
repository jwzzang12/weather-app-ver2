import useGeoLocation from "../hooks/useGeolocation";
export default function Location() {
  const location = useGeoLocation();
  return (
    <div className="location" coordinates={JSON.stringify(location.coordinates)}>
      {location.loaded ? JSON.stringify(location) : "Location data not available yet."}
    </div>
  );
}
