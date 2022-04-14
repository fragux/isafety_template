import React, { useEffect, useState, forwardRef, useRef } from "react";
import MaterialTable from "material-table";
import api from "../../Services/api";
import { useLocation } from "react-router-dom";

import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FirstPage,
  LastPage,
  ViewColumn,
  SaveAlt,
  FilterList,
  Search,
  Remove,
} from "@material-ui/icons";
import "./Score.css";

function Score() {
  const [loja, setloja] = useState();
  const location = useLocation();
  const isMountedRef = useRef(true);
  let rotaApi = "";

  useEffect(() => {
    //Atribuicao do endpoint para filtrar as lojas
    //if (location.pathname === "")
    rotaApi = "/app/loja";
    /*else if (location.pathname === "/content/continentes")
          rotaApi = "loja/id/Continente";
        else if (location.pathname === "/content/bomdia")
          rotaApi = "loja/id/ContinenteBomDia"*/
    console.log(location.pathname);
    //axios.get("http://localhost:3000/loja").then((data) => {
    //  setLojas(data.data);
    // });
    //console.table(data.data);
    api.get(rotaApi).then((response) => {
      //setLojas(response.data);
      console.table("Retorno da loja para a tabela: ", response.data);
      if(isMountedRef.current)
      setloja(response.data);
    });
    return () => isMountedRef.current = false;
  }, []);

  const columns = [
    {
      title: "Cadeia",
      field: "Cadeia",
      validate: (rowData) => rowData.Cadeia==="Maxmat"
    },
    {
      title: "Nome",
      field: "Nome",
    },
    {
      title: "DOP",
      field: "DOP",
      
    },
    {
      title: "Distrito",
      field: "Distrito",
    },
    {
      title: "Risco",
      field: "Nivel_risco",
      //style: { textAlign: "right" },
      render: (rowData) => (
        <h2 style={{ width: 50, color: "red" }}>{rowData.Nivel_risco}</h2>
      ),
      validate: (rowData) => rowData.Nivel_risco > 0.0,
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <>
      <MaterialTable
    
        style={{ padding: "0 8px", borderRadius: "0.5rem", boxShadow: "none" }}
        minRows={10}
        icons={tableIcons}
        title={
          <div className="title_table">
            <h2>Risco geral</h2>
          </div>
        }
        data={loja}
        columns={columns}
        options={{
            maxBodyHeight: "41vh",
           // showSelectAllCheckbox: true,
          pageSize: 50,
          pageSizeOptions: [0],
          rowStyle: {
            fontSize: 11,
            textAlign: "left",
            fontSizeAdjust: false,
            height: 10,
          },
          cellStyle: {
            textAlign: "left",
          },
          headerStyle: {
            fontSize: 13,
            fontWeight: "bold",
            textAlign: "left",
            background: "lightgrey",
            color: "white",
          },
         
          paging: true,
          search: true,
          //exportButton: true,
          //doubleHorizontalScroll: true
          //addRowPosition: true,
        }}
        /*actions={[
            {
             title: 'Go To',
              icon: '>',
              tooltip: <b>'Ligação para a loja'</b>,
              onClick: () => window.open('http://localhost:5000/files/blank').focus()
            }
          ]}*/
      />
    </>
  );
}

export default Score;
