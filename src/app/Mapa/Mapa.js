import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Circle,
  Tooltip
} from "react-leaflet";
//import MarkerClusterGroup from "react-leaflet-markercluster";
import { Link, useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import "./Mapa.css";
import api from "../../Services/api";

import markerVerde from "../../assets/Markers/markerVerde.png";
import markerAmarelo from "../../assets/Markers/markerAmarelo.png";
import markerVermelho from "../../assets/Markers/markerVermelho.png";
import markerUnavailable from "../../assets/Markers/markerUnavailable.png";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

import distritos from "../../assets/CoordenadasDistritos/coordendas.json";

function getIcon(risco, disponibilidade) {
  let marker;
  let markerSize;
  let numero = 0;
  if (!risco) {
    numero += numero;
    //console.log("Risco indisponível:", numero);
    marker = markerUnavailable;
    markerSize = 4;
  } else if (risco <= 0.3) {
    console.log("Risco <0.5 : ", risco);
    marker = markerVerde;
    markerSize = 10;
  } else if (risco <= 0.88 && risco > 0.3) {
    console.log("Risco <0.88 : ", risco);
    marker = markerAmarelo;
    markerSize = 14;
  } else {
    console.log("Risco >0.88 : ", risco);
    marker = markerVermelho;
    markerSize = 18;
  }
  //const map = L.map('map').setView([37.75, -122.45], 12);
  //L.esri.Vector.layer('19fe843fc7b142548208fd5baf951979').addTo(map);

  return L.icon({
    iconUrl: marker,
    iconSize: markerSize,
    popupAnchor: [0, -20], // move o popup [direita, baixo],
  });
}

function getIconOver(risco, zoomValue) {
  let marker;
  let markerSize;
  if (risco < 0.5) {
    console.log("Risco <0.5 : ", risco);
    marker = markerVerde;
    if (zoomValue > 9) markerSize = 20;
    else markerSize = 12;
  } else if (risco < 0.88) {
    console.log("Risco <0.88 : ", risco);
    marker = markerAmarelo;
    markerSize = 16;
  } else {
    console.log("Risco >0.88 : ", risco);
    marker = markerVermelho;
    markerSize = 20;
  }
  //const map = L.map('map').setView([37.75, -122.45], 12);
  //L.esri.Vector.layer('19fe843fc7b142548208fd5baf951979').addTo(map);

  return L.icon({
    iconUrl: marker,
    iconSize: markerSize,
    popupAnchor: [0, -20], // move o popup [direita, baixo],
  });
}

/*const createClusterCustomIcon = function (cluster) {
  //Falta criar aqui uma forma de alterar a cor com base no interior do cluster
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: L.point(40, 40, true),
  });
};

function getMapBounds(bounds) {
  console.log("Valor de MarkerBounds a ser passado para o mapa: ", bounds);
  return bounds;
}

/*const zoomToFeature = ((e) => {
  // update this to work with react-leaflet 3 and functional react components
  e.fitBounds(e.target.getBounds());
})*/

function calculoRisco(lojas) {
  let resultado = 0;
  let length = lojas.length;
  if (length !== 0) {
    lojas.forEach(({ Nivel_risco }) => (resultado += parseFloat(Nivel_risco)));
    console.log("Valor do resultado:", resultado / length);
    return resultado / length;
  } else return 0;
}

function calculoRiscoLoja(lojas) {
  const risco = {
    alto: 0,
    moderado: 0,
    leve: 0,
  };
  const count = {
    alto: 0,
    moderado: 0,
    leve: 0,
  };

  let length = lojas.length;
  if (length !== 0) {
    lojas.forEach(({ Nivel_risco }) => {
      if (parseFloat(Nivel_risco) <= 0.3) {
        risco.leve++;
        count.leve++;
      } else if (
        parseFloat(Nivel_risco) > 0.3 &&
        parseFloat(Nivel_risco) <= 0.6
      ) {
        risco.moderado++;
        count.moderado++;
      } else if (parseFloat(Nivel_risco) > 0.6) {
        risco.alto++;
        count.alto++;
      }
    });
    let total = count.leve + count.moderado + count.alto;
    if (count.leve === 0) risco.leve = risco.leve / 1;
    else risco.leve = risco.leve / total;
    if (count.moderado === 0) risco.moderado = risco.moderado / 1;
    else risco.moderado = risco.moderado / total;
    if (count.alto === 0) risco.alto = risco.alto / 1;
    else risco.alto = risco.alto / total;
    console.log("Valor do resultado:", risco);
    return risco;
  } else return risco;
}

const paraCadaUm = (distrito, layer) => {
  //const NomeDistrito = distrito.nome;
  //const map = this.mapRef.current;
  //var group = new L.featureGroup([L.marker(distrito)]);
  //layer.bindPopup(NomeDistrito); // Cria o popup quando se clica no distrito
  // Muda a cor dos distritos

  layer.options.fillColor = "lightgrey";
  layer.options.fillOpacity = 0.75; // Opacidade
  layer.options.weight = 0.5; // Espessura da linha dos distritos
  layer.options.color = "white";
  layer.interactive = true;
  layer.on({
    mouseover: (event) => {
      event.target.setStyle({
        //color: "#335675",
        fillColor: "white",
        fillOpacity: 0.6,
      });
    },
    mouseout: (event) => {
      if (event.target.name === distrito.name) {
      }
      event.target.setStyle({
        color: "white",
        fillColor: "lightgrey",
        fillOpacity: 0.9,
      });
    },
    click: (event) => {
      if (event.target.name === distrito.name) {
        console.log("Distrito de: ", distrito.nome);
        var markerBounds = L.latLngBounds(distrito.coordinates[0]);
        console.log("Marker Bounds: ", markerBounds);

        //getMapBounds(markerBounds);
        //zoomToFeature();
        //   var map = L.map('map');
        // L.map.fitBounds(markerBounds);

        // if (map) map.leafletElement.fitBounds(distrito.getBounds());
        // this.refs.map.distrito.coordinates[0].fitBounds(event.target.getBounds());
      }
    },
  });
};

function Mapa({ loja }) {
  const [lojas, setLojas] = useState([]);
  const location = useLocation();
  let rotaApi = "";

  useEffect(() => {
    console.log("O que vem da dashboard", loja);
  }, [loja]);

  return (
    <>
      <MapContainer
        center={[39.6, -8]}
        zoom={7}
        scrollWheelZoom={true}
        minZoom={7}
        doubleClickZoom={false}
        className="leaflet-container"
        key={new Date().getTime()}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        <GeoJSON data={distritos.features} onEachFeature={paraCadaUm} />
        {
          <VectorBasemapLayer
            //ID do Vector Map Customizado no ArcGIS
            name="19fe843fc7b142548208fd5baf951979"
            //API Key da conta criada no ArcGIS
            token="AAPKdc8bb8b75a65473e95cfbe85039aeb61DcaDPgSoDzPGo3FEGAf-Gpn9ADerBD_sukHa4uNLN1VH_33OugxT_xwAdtwu1rPj"
          />
        }
        
        {loja.map((continente,i) => {
          if (continente.Insignia === "ContinenteBomDia" || continente.Insignia === "Continente" || continente.Insignia === "ContinenteModelo")
          return(<Marker
          key = {i}
            position={[
              parseFloat(continente.Lat.replace(",", ".")),
              parseFloat(continente.Long.replace(",", ".")),
            ]}
            icon={getIcon(
              parseFloat(continente.Nivel_risco),
              continente.Disponivel
            )}
            // icon={getIcon(parseFloat(continente.Nivel_risco.replace(",", ".")), continente.Disponivel)} // Este nao funciona porque a maioria nao tem o risco para fazer replace
            interactive={i}
          >
            <Popup>
              <h3>{continente.Nome}</h3>
              <p>
                Lat: {parseFloat(continente.Lat.replace(",", "."))}
                <br />
                Long: {parseFloat(continente.Long.replace(",", "."))}
                <br />
                Nivel de Risco: {continente.Nivel_risco}
              </p>
              <Link to={`/dashboard/loja/:${continente._id}`}>Ver Mais</Link>
            </Popup>
          </Marker>)
        })
           
              }
        {loja?.map((elem, i) => {
          if (elem.Insignia === "Continente" && elem.Insignia !== null )
          <Marker position={[
            parseFloat(elem.Lat.replace(",", ".")),
            parseFloat(elem.Long.replace(",", ".")),
          ]}></Marker>
            {/*<Marker
              position={[
                parseFloat(elem.Lat.replace(",", ".")),
                parseFloat(elem.Long.replace(",", ".")),
              ]}
              icon={getIcon(parseFloat(elem.Nivel_risco), elem.Disponivel)}
              // icon={getIcon(parseFloat(continente.Nivel_risco.replace(",", ".")), continente.Disponivel)} // Este nao funciona porque a maioria nao tem o risco para fazer replace
              interactive={true}
              riseOnHover={true}
              bubblingMouseEvents={true}

              key = {i}
            >
              
              <Circle 
                  center={{lat:elem.Lat.replace(",", "."), lng: elem.Long.replace(",", ".")}}
                  fillColor="blue" 
                  radius={50}/>
            </Marker>*/}
          
        })}
      </MapContainer>
    </>
  );
}

export default Mapa;
