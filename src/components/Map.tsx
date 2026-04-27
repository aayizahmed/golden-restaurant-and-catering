"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { business, site } from "@/content/site";

const position = business.position;

const goldIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent() {
  return (
    <MapContainer
      key="golden-restaurant-map"
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className="h-[420px] w-full"
      style={{
        border: "1px solid rgba(212, 175, 55, 0.35)",
        boxShadow:
          "0 0 0 1px rgba(212,175,55,0.18) inset, 0 30px 80px rgba(0,0,0,0.55)",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={goldIcon}>
        <Popup>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 18,
                fontWeight: 700,
                color: "#D4AF37",
              }}
            >
              {site.name}
            </div>
            <div style={{ fontSize: 13, color: "rgba(245,240,230,0.78)" }}>
              {business.category} • ⭐ {business.rating} ({business.reviewsCount})
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "rgba(245,240,230,0.62)",
              }}
            >
              {business.addressLine}
            </div>
            <a
              href={`tel:${business.phoneTel}`}
              style={{
                display: "inline-block",
                marginTop: 10,
                padding: "10px 14px",
                background: "#D4AF37",
                color: "#0A0A0A",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Call {business.phone}
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

