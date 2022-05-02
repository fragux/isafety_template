import React, { useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import {
  AddBox,
  AddCircle,
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

function Score({ loja }) {
  useEffect(() => {
    console.log("O que entra na tabela: ", loja);
  }, [loja]);

  const columns = [
    {
      title: "Cadeia",
      field: "Cadeia",
      validate: (rowData) => rowData.Cadeia === "Maxmat",
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
      defaultSort: "desc",
      //style: { textAlign: "right" },
      render: (rowData) => {
        if (rowData.Nivel_risco > 0.8)
          return (
            <ProgressBar
              variant="danger"
              now={rowData.Nivel_risco * 100}
              label={`${rowData.Nivel_risco * 100}%`}
              style={{ height: "16px" }}
            />
          );
        else if (rowData.Nivel_risco < 0.4)
          return (
            <ProgressBar
              variant="success"
              now={rowData.Nivel_risco * 100}
              label={`${rowData.Nivel_risco * 100}%`}
              style={{ height: "16px" }}
            />
          );
        else if (rowData.Nivel_risco >= 0.4 && rowData.Nivel_risco <= 0.8)
          return (
            <ProgressBar
              variant="warning"
              now={rowData.Nivel_risco * 100}
              label={`${rowData.Nivel_risco * 100}%`}
              style={{ height: "16px" }}
            />
          );
      },
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
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} of {count}",
          },
          toolbar: {
            nRowsSelected: "{0} row(s) selected",
          },
          header: {
            actions: "Ver +",
          },
          body: {
            emptyDataSourceMessage: "No records to display",
            filterRow: {
              filterTooltip: "Filter",
            },
          },
        }}
        style={{ padding: "0 5px", borderRadius: "0.5rem", boxShadow: "none" }}
        minRows={10}
        icons={tableIcons}
        title={<h2>Risco geral</h2>}
        data={loja}
        columns={columns}
        options={{
          maxBodyHeight: "45vh",
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
          sorting: true,

          paging: true,
          search: true,
          //exportButton: true,
          //doubleHorizontalScroll: true
          //addRowPosition: true,
        }}
        actions={[
          (rowData) => ({
            icon: () => (
              <Link to={`/Loja/loja/${rowData._id}`}>
                <AddCircle style={{ color: "dodgerblue" }} />
              </Link>
            ),
            tooltip: <b>Ligação para a loja</b>,
            onClick: (event, rowData) => {
              console.log(" link para a loja: ", rowData._id);
              //window.open(`/Loja/loja/${rowData._id}`).focus()
            },
          }),
        ]}
      />
    </>
  );
}

export default Score;
