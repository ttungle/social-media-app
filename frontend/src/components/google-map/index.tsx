import { GoogleMap, GoogleMapProps, useJsApiLoader } from '@react-google-maps/api';
import * as React from 'react';

export interface GoogleMapWrapperProps extends GoogleMapProps {
  children: React.ReactNode;
}

export function GoogleMapWrapper({ children, ...props }: GoogleMapWrapperProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  return <GoogleMap {...props}>{children}</GoogleMap>;
}
