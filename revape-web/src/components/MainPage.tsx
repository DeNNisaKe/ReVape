import React, { useEffect, useState } from "react";
import backgroundImage from "../wallpaper/landing-page-wallpaper.jpg";
import revapeImage from "../logo/ReVapeLogoPng.png";

interface ExtendedWindow extends Window {
  google?: any;
}

interface Bin {
  name: string;
  coordinates: string;
  capacity: number;
  percentage: number;
}

const handleGetData = async () => {
  const response = await fetch("http://calin122333.go.ro:25565/api", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const AfterLogin = () => {
  const [bin, setBin] = useState<Bin | null>(null);
  const [map, setMap] = useState<any>(null);
  const mapRef = React.useRef<any>(null);
  const infoWindowRef = React.useRef<any>(null);
  const markerRef = React.useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetData();
      setBin(data);
      // Update the InfoWindow content and the marker position if they exist
      if (infoWindowRef.current && markerRef.current && mapRef.current) {
        const binCoordinates = data.coordinates.split(", ");
        const binLocation = {
          lat: Number(binCoordinates[0]),
          lng: Number(binCoordinates[1]),
        };

        const progress = data.percentage;
        const colorClass =
          progress < 60
            ? "bg-green-500"
            : progress < 90
            ? "bg-orange-500"
            : "bg-red-500";

        infoWindowRef.current.setContent(`
    <h2 class="text-xl font-bold">${data.name}</h2>
    <div class="w-full bg-gray-200">
      <div class="h-4 ${colorClass}" style="width: ${progress}%;"></div>
    </div>
    <p class="mt-2">This bin is ${progress}% full</p>
  `);

        markerRef.current.setPosition(binLocation);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!bin) {
      return;
    }

    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAiIWW5nnQomvGqyKZJJfflfKdHrWK-G7M&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        if ((window as ExtendedWindow).google) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              initMap(userLocation);
            });
          }
        }
      };
    };

    const initMap = (userLocation?: { lat: number; lng: number }) => {
      const binCoordinates = bin.coordinates.split(", ");
      const binLocation = {
        lat: Number(binCoordinates[0]),
        lng: Number(binCoordinates[1]),
      };

      if (!mapRef.current) {
        mapRef.current = new (window as ExtendedWindow).google.maps.Map(
          document.getElementById("map"),
          {
            center: userLocation,
            zoom: 14,
          }
        );
      }

      const marker = new (window as ExtendedWindow).google.maps.Marker({
        position: binLocation,
        map: mapRef.current, // Use mapRef.current here
        title: bin.name,
        icon: {
          url: revapeImage,
          scaledSize: new (window as ExtendedWindow).google.maps.Size(50, 50),
        },
      });

      markerRef.current = marker;

      new (window as ExtendedWindow).google.maps.Marker({
        position: userLocation,
        map: mapRef.current, // Use mapRef.current here
        title: "Your Location",
      });

      const progress = bin.percentage;

      const colorClass =
        progress < 60
          ? "bg-green-500"
          : progress < 90
          ? "bg-orange-500"
          : "bg-red-500";

      const infoWindow = new (window as ExtendedWindow).google.maps.InfoWindow({
        content: `
          <h2 class="text-xl font-bold">${bin.name}</h2>
          <div class="w-full bg-gray-200">
            <div class="h-4 ${colorClass}" style="width: ${progress}%;"></div>
          </div>
          <p class="mt-2">This bin is ${progress}% full</p>
        `,
      });

      infoWindowRef.current = infoWindow;

      marker.addListener("mouseover", () => {
        infoWindow.open(map, marker);
      });

      marker.addListener("click", () => {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${binLocation.lat},${binLocation.lng}`
        );
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });

      new (window as ExtendedWindow).google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location",
      });
    };

    if (!(window as ExtendedWindow).google) {
      loadMapScript();
    }
  }, [bin]);

  return (
    <div
      className="bg-cover h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="relative h-[70vh] w-[70vw] rounded-3xl border-2 border-gray-950 overflow-hidden">
        <div id="map" className="h-full w-full rounded-3xl" />
        <p className="text-4xl font-bold text-white p-4 text-center absolute bottom-4 left-4 right-16 z-10 bg-gray-950 rounded-3xl bg-opacity-80">
          See where the containers are, recycle fast, earn rewards and help save
          the planet!
        </p>
      </div>
    </div>
  );
};

export default AfterLogin;
