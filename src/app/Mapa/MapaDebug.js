import React, { useState, useEffect, useCallback, useReducer, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvents,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Link, useLocation } from "react-router-dom";
/*import {
  BasemapLayer,
  FeatureLayer,
  TiledMapLayer,
  VectorMapLayer,
} from "react-esri-leaflet";*/
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import api from "../../Services/api";
//import MapBounds from "react-leaflet-bounds";
import markerVerde from "../../assets/Markers/markerVerde.svg";
import markerAmarelo from "../../assets/Markers/markerAmarelo.svg";
import markerVermelho from "../../assets/Markers/markerVermelho.svg";
import markerUnavailable from "../../assets/Markers/markerUnavailable.svg";
import "mapbox-gl/dist/mapbox-gl.css";
import distritos from "../../assets/CoordenadasDistritos/coordendas.json";
//import darkGrayCanvas from"../../Assets/DarkGrayLayer.json";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import { CollectionsOutlined } from "@material-ui/icons";
//import { map } from "leaflet";
//import { marker } from "leaflet";
//import { map } from "leaflet";
//import VectorTileLayer from 'react-esri-leaflet/plugins/VectorTileLayer';

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
      if (Nivel_risco <= 0.3) {
        risco.leve += parseFloat(Nivel_risco);
        count.leve++;
      } else if (Nivel_risco > 0.3 && Nivel_risco <= 0.6) {
        risco.moderado += parseFloat(Nivel_risco);
        count.moderado++;
      } else if (Nivel_risco >= 0.6) {
        risco.alto += parseFloat(Nivel_risco);
        count.alto++;
      }
    });

    if (count.leve === 0) risco.leve = risco.leve / 1;
    else risco.leve = risco.leve / length;
    if (count.moderado === 0) risco.moderado = risco.moderado / 1;
    else risco.moderado = risco.moderado / length;
    if (count.alto === 0) risco.alto = risco.alto / 1;
    else risco.alto = risco.alto / length;
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
        color: "#335675",
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

  //Tracejado caso seja preciso

  // layer.options.dashArray = '3';
};

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [markerSize, setMarkerSize] = useState();
  const map = useMapEvents({
    click(e) {
      map.locate();
      console.log("Latitude e longitude do click do rato: ", e.latlng);
      //getClick(e.latlng);
      map.flyTo(e.latlng, 10);
      if (map.getZoom() > 9) setMarkerSize(10);
      else setMarkerSize(5);
    },
    locationfound(e) {
      setPosition(e.latlng);
      //map.flyTo( e.latlng, 10);
    },
  });
  console.log("Tamanho do marker: ", markerSize);
  return null;
}

const initialState = { loading: false, selectedLoja: "", lojaData: null }

function lojasReducer(state, action) {
  switch (action.type) {
    case "LOJA_SELECTED": {
      return {
        ...state,
        selectedLoja: action.payload
      };
    }
    case "FETCH_LOJA": {
      return {
        ...state,
        loading: true,
        lojaData: null
      };
    }
    case "FETCH_LOJA_SUCESS": {
      return {
        ...state,
        loading: false,
        lojaData: action.payload
      };
    }

    case "RESET": {
      return initialState;
    }

    default:
      throw new Error( `Not supported action ${action.type}` );
  }
}

const Mapa = (props) => {
  //const [lojas, setLojas] = useState([]);
  const [lojas, dispatch] = useReducer(lojasReducer, initialState);
  const isMountedRef = useRef(true);
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(true);
  //const [menuItem, setMenuItem] = useState(false);
  //const [zoomValue, setZoomValue] = useState();
  //const [data, setData] = useState();
  //const [nivelRisco, setNivelRisco] = useState([]);
  //const [latlng, setLatLong] = useState([]);
  //dataMapa = data;
  let rotaApi = "";
  //let lojasParaMapa = [];
  //lojasParaMapa = props.lojaMapa;
  //console.log("Valores que vêm da APP", lojasParaMapa);
  const [lojinha, setLojinha] = useState();
  
  useEffect(() => {
    //setLojas(lojasParaMapa);
    //Atribuicao do endpoint para filtrar as lojas
    //if (location.pathname === "")
    /*else if (location.pathname === "/content/continentes")
    rotaApi = "loja/id/Continente";
    else if (location.pathname === "/content/bomdia")
    rotaApi = "loja/id/ContinenteBomDia"*/
    //console.log("MenuItem: ", location.pathname);
    //axios.get("http://localhost:3000/loja").then((data) => {
      //  setLojas(data.data);
      // });
      //console.table(data.data);
      //const data = getLojas();
      rotaApi = "/app/loja";
      isMountedRef.current = true;
      //if(lojas){
       // dispatch({ type: "FETCH_LOJA" });     
      api.get(rotaApi).then((response) => {
        if (isMountedRef.current)
        {
          //dispatch({type: "FETCH_LOJA_SUCESS", payload: response})
          return setLojinha(response.data);
        }
        //setLojas(response.data);
        //setLojas(response.data);
        console.log("Qualquer coisa: ", response.data);
        //return response.data
      });
    
      /*if (isMounted) {
        setLojinha (props.lojaMapa);
        console.log("LOJAS PARA FILTRO: ", props.lojaMapa);
        //setLojas(props.lojaMapa);
        
      }*/
      return () => isMountedRef.current = false;
    }, []);
    
    

  //lojas?.map(({ Nivel_risco }) => console.log(Nivel_risco));
   function selectedMenuItem() {
    switch (location.pathname) {
      case "/continente":
        console.log("Continente");
        //setMenuItem(true);
        return "cnt";
      case "/content/cntnorte":
        console.log("CNT Norte");
        //setMenuItem(true);
        return "cnt norte";
      case "/content/cntcentro":
        console.log("CNT Centro");
        //setMenuItem(true);
        return "cnt centro";
      case "/content/cntsul":
        console.log("CNT Sul");
        //setMenuItem(true);
        return "cnt sul";
      case "/continentemodelo":
        console.log("Continente Modelo");
        //setMenuItem(true);
        return "cm";
      case "/continentebomdia":
        console.log("Continente Bom Dia");
        //setMenuItem(true);
        return "cbd";
      case "/content-2/cbdnorte":
        console.log("CBD Norte");
        //setMenuItem(true);
        return "cbdnorte";
      case "/content-2/cbdsul":
        console.log("CBD Sul");
        //setMenuItem(true);
        return "cbdsul";
      case "/entrepostos":
        console.log("Entrepostos");
        //setMenuItem(true);
        return "logistica";
      default:
        return "all";
    }
  }
  

   function layerLojas () {
    let menuItemValue = selectedMenuItem();  
    console.log("Objecto a ser filtrado: ", lojinha);
    console.log("Selected menu item: ", menuItemValue);
    //let arrTexts = [...lojinha]
    let copiedLoja = Object.assign({}, lojinha);
    const asArray = Object.entries(copiedLoja);
   //var map = new Map(Object.entries(lojinha));
   // const asArray = Object.keys(copiedLoja).filter(key => copiedLoja[key].Nome.includes("Continente"));
    //const filtered = Object.keys(lojinha);
    /*
    copiedLoja.map(({Nome})=>{
        console.log("Nome: ", Nome)
    })*/
    //const filtered = asArray.filter(([key, value]) => typeof value === "");
    console.log("Filtrado: ", copiedLoja);
    var arr = [];
    Object.keys(copiedLoja).forEach(function(key) {
      arr.push(copiedLoja[key]);
    });
    //arr.map(item => console.log( item.Nome));
    console.log(arr);
    //setLojas([]);
   // try{
    if (menuItemValue === "logistica") {
      
      const filtro = Array.isArray(arr)?arr.filter((filteredLoja) => {
        return (filteredLoja.Nome.toLowerCase().includes(menuItemValue))
      }
      ):[];
      //console.log("Lojas filtradas: ", filtro);
      return filtro;
    } else {
      //console.log("Lojas a serem filtradas: ", filtro);
      const filtro = Array.isArray(lojas)?lojas.filter((filteredLoja) => {

        return (filteredLoja.DOP.toLowerCase().includes(menuItemValue))
      }
      ):[];

     console.log("Lojas filtradas: ", filtro);
     return filtro;
    }
  //} catch(error) {console.log(error)};
  
} 
  function layerNivelRisco() {
    
    let menuItemValue = selectedMenuItem();
    const filtro = Array.isArray(lojas)?lojas.filter((filteredLoja) => {

      return (filteredLoja.DOP.toLowerCase().includes(menuItemValue) && parseFloat(filteredLoja.Nivel_risco) >= 0.0)
    }
    ):[];
        
    //console.log("Lojas com risco associado: ", filtro);
    //console.log("Objecto com valores de risco:", calculoRiscoLoja(filtro));
    let valor = calculoRisco(filtro);
    const risco = calculoRiscoLoja(filtro);
    console.log("Valor RISCO ----- >", risco.alto);
    if (filtro) {
      props.parentCallback(valor);
      props.callBackNivelRisco(risco.alto, risco.moderado, risco.leve);
    }
    //calculoRisco(filtro);
    //calculoRiscoLoja(filtro);
    return filtro;
  }

  function getClick(event) {
    console.log("Está a clicar", event.latlng.lat);
    const codigo = lojas.find(
      (loja) => parseFloat(loja.Lat.replace(",", ".")) === event.latlng.lat
    );
    console.log("Código da loja clicada: ", codigo.CodigoLoja);
    console.log("ID do objecto da loja clicada: ", codigo._id);
    if (codigo) props.callBackCodigoLoja(codigo._id, codigo.CodigoLoja);
  }
  //console.log(setLojas(lojasParaMapa));
  return (
    <div className="leaflet-container" id="map">
      <MapContainer
        center={[39.6, -8]}
        zoom={7}
        scrollWheelZoom={true}
        minZoom={7}
        doubleClickZoom={false}
      >
        //Layer do mapa
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        //Mapa de Portugal
        <GeoJSON data={distritos.features} onEachFeature={paraCadaUm} />
        {
          <VectorBasemapLayer
            //ID do Vector Map Customizado no ArcGIS
            name="19fe843fc7b142548208fd5baf951979"
            //API Key da conta criada no ArcGIS
            token="AAPKdc8bb8b75a65473e95cfbe85039aeb61DcaDPgSoDzPGo3FEGAf-Gpn9ADerBD_sukHa4uNLN1VH_33OugxT_xwAdtwu1rPj"
          />
        }
        {layerLojas()?.map(
          ({
            CodigoLoja,
            Nome,
            DOP,
            Concelho,
            Lat,
            Long,
            Nivel_risco,
            Disponivel,
          }) => (
            <Marker
              position={[
                parseFloat(Lat.replace(",", ".")),
                parseFloat(Long.replace(",", ".")),
              ]}
              icon={getIcon(parseFloat(Nivel_risco), Disponivel)}
              // icon={getIcon(parseFloat(continente.Nivel_risco.replace(",", ".")), continente.Disponivel)} // Este nao funciona porque a maioria nao tem o risco para fazer replace
              interactive={true}
              riseOnHover={true}
              bubblingMouseEvents={true}

              //key = {CodigoLoja}
            >
              <Tooltip direction="right" offset={[0, -2]} opacity={1}>
                <p>{"Loja" + ": " + CodigoLoja}</p>
                <p>{"Nome" + ": " + Nome}</p>
                <p>{"DOP" + ": " + DOP}</p>
                <p>{"Concelho" + ": " + Concelho}</p>
                <p>
                  {"Nível de Risco" + ": "}
                  <b style={{ color: "red" }}>{Nivel_risco}</b>
                </p>
              </Tooltip>
            </Marker>
          )
        )}
        {layerNivelRisco()?.map(
          ({
            CodigoLoja,
            Nome,
            DOP,
            Concelho,
            Lat,
            Long,
            Nivel_risco,
            Disponivel,
          }) => (
            <Marker
              position={[
                parseFloat(Lat.replace(",", ".")),
                parseFloat(Long.replace(",", ".")),
              ]}
              icon={getIcon(parseFloat(Nivel_risco), Disponivel)}
              // icon={getIcon(parseFloat(continente.Nivel_risco.replace(",", ".")), continente.Disponivel)} // Este nao funciona porque a maioria nao tem o risco para fazer replace
              interactive={true}
              riseOnHover={true}
              bubblingMouseEvents={true}
              key={CodigoLoja}
              eventHandlers={{
                click: (e) => {
                  getClick(e);
                },
              }}
            >
              <Tooltip direction="right" offset={[0, -2]} opacity={1}>
                <p>{"Loja" + ": " + CodigoLoja}</p>
                <p>{"Nome" + ": " + Nome}</p>
                <p>{"DOP" + ": " + DOP}</p>
                <p>{"Concelho" + ": " + Concelho}</p>
                <p>
                  {"Nível de Risco" + ": "}
                  <b style={{ color: "red" }}>{Nivel_risco}</b>
                </p>
              </Tooltip>
            </Marker>
          )
        )}
        {/*<MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        disableClusteringAtZoom={15}
        maxClusterRadius={100}
        animateAddingMarkers={true}
        showCoverageOnHover={false}
      >
        {lojas.map((continente) => (
          <Marker
            position={[
              parseFloat(continente.Lat.replace(",", ".")),
              parseFloat(continente.Long.replace(",", ".")),
            ]}
            icon={getIcon(
              parseFloat(continente.Nivel_risco),
              continente.Disponivel
            )}
            // icon={getIcon(parseFloat(continente.Nivel_risco.replace(",", ".")), continente.Disponivel)} // Este nao funciona porque a maioria nao tem o risco para fazer replace
            interactive={continente.Disponivel}
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
              <Link to={`/content/loja/:${continente._id}`}>Ver Mais</Link>
            </Popup>
          </Marker>
        ))}
            </MarkerClusterGroup>*/}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Mapa;
