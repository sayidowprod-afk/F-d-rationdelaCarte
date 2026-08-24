"use client";

import "leaflet/dist/leaflet.css";
import { DivIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { memberDisplayName, type Member } from "@/lib/types";

const markerIcon = new DivIcon({
  className: "",
  html: '<div style="width:14px;height:14px;border-radius:9999px;background:#c8102e;border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,.2)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export default function MembersMap({ members }: { members: Member[] }) {
  return (
    <MapContainer
      center={[46.6, 2.4]}
      zoom={5}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {members.map((m) => (
        <Marker
          key={m.id}
          position={[m.latitude!, m.longitude!]}
          icon={markerIcon}
        >
          <Popup>
            <strong>{memberDisplayName(m)}</strong>
            <br />
            {m.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
