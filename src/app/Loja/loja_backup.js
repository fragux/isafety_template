import React, { Component } from "react";
import { Dropdown, ButtonGroup, Accordion } from "react-bootstrap";
import Frescos from "./area_icone.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import axios from "axios";
import { Link } from "react-router-dom";

export class Loja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lojas: [],
      loja2: [],
      algoritmo: [{}],
    };
  }
  async componentDidMount() {
    const location = this.props.location;
    const rota = location.pathname;
    const rotan = rota.substring(10, rota.length);
    const { lojaId } = this.state;

    console.log(rotan);
    axios.get(`http://127.0.0.1:3000/app/dashboard` + rotan).then((res) => {
      const loja = res.data;
      this.setState({ loja });
      this.setState({
        Id: loja._id,
        DT: loja.DT,
        DTCC: loja.DTCC,
        DTCCFR: loja.DTCCFR,
        Distrito: loja.Distrito,
        Concelho: loja.Concelho,
        Freguesia: loja.Freguesia,
        Morada: loja.Morada,
        CodigoPost: loja.CodigoPost,
        Localidade: loja.Localidade,
        Cadeia: loja.Cadeia,
        Insignia: loja.Insignia,
        DOP: loja.DOP,
        Nome: loja.Nome,
        CodigoLoja: loja.CodigoLoja,
        AreaVenda: loja.AreaVenda,
        AnoAbertur: loja.AnoAbertur,
        Lat: loja.Lat,
        Long: loja.Long,
        Disponivel: loja.Disponivel,
        Nivel_risco: loja.Nivel_risco,
        dataAlgoritmo: loja.dataAlgoritmo,
      });
      console.log(loja);
    });

    axios
      .get(`http://127.0.0.1:3000/app/algoritmo/saida` + rotan)
      .then((res) => {
        const loja2 = res.data;
        console.log("ola", res.data[0].SaidaAlgoritmo);
        this.setState({ loja2 });

        this.setState({
          //   Nivel_risco2: loja2.Nivel_risco2,
          //   CodigoLoja:loja2.CodigoLoja,

          //   SaidaAlgoritmo:loja2.SaidaAlgoritmo,
          Seccao: res.data[0].SaidaAlgoritmo.Seccao,
        });

        // console.log("adeus",res.data[0].SaidaAlgoritmo.length)

        var teste = res.data[0].SaidaAlgoritmo;
        var teste3 = res.data[0].SaidaAlgoritmo.length;
        console.log("ola de novo", teste);
        this.setState({ algoritmo: teste });
        console.log("get2", teste[0].Seccao);
        var teste2 = 0;

        for (var i = 0; i < teste3; i++) {
          if (teste[i].Seccao == 1 && teste[i].Acidente == 1) {
            teste2++;
          }

          console.log("fds1213333", teste2);
        }

        var media = (teste2 / teste3) * 100;
        //  console.log("fds121" ,(teste2.length));
        console.log("fds121333344444444", teste2);
        console.log("media", media);
        return media;
      });
  }

  calculoSeccao() {
    let copiedLoja = Object.assign([{}], this.state.algoritmo);
    let tamanho = copiedLoja.length;
    const numeroColabAcidente = [];
    const deepFilter = (obj, filter) => {
      //iterate the object
      for (let key in obj) {
        const val = obj[key].Seccao;

        //if val is also object (nested)
        if (val === "object") {
          //recur
          deepFilter(val, filter);
        }
        // normal value
        else {
          //current val fails filter condition
          //delete it
          if (filter(val) === false) {
            obj[key] = obj[key];
          }
        }

        //if value is empty obj
        //delete it
        if (JSON.stringify(val) === "{}") {
          delete obj[key];
        }
      }
    };
    const results = [];
    for (let i = 1; i <= 16; i++) {
      deepFilter(copiedLoja, (s) => s === i);
      results[i] = copiedLoja.filter((element) => {
        if (Object.keys(element).length !== 0) {
          return true;
        }

        return false;
      });
      // console.log( "Resultado secções: ", i,  results);
    }
    /*const resultado =  loja.filter( filterLoja => {
                        for (let i=0; i< loja.length ; i++)
                        return (filterLoja.Seccao === i)}
                        )*/
    const filterPerSection = (obj, filter) => {
      //iterate the object
      for (let key in obj) {
        const val = obj[key].Seccao;

        //if val is also object (nested)
        if (val === "object") {
          //recur
          filterPerSection(val, filter);
        }
        // normal value
        else {
          //current val fails filter condition
          //delete it
          if (filter(val) === false) {
            delete obj[key];
          }
        }

        //if value is empty obj
        //delete it
        if (JSON.stringify(val) === "{}") {
          delete obj[key];
        }
      }
    };
    const average = [];
    for (let i = 1; i <= 16; i++) {
      filterPerSection(results[i], (s) => s === i);
      average[i] = results[i].filter((element) => {
        if (Object.keys(element).length !== 0) {
          return true;
        }

        return false;
      });
      //console.log( "Resultado secções: ", i,  average);
    }
    const filterSectionAc = (obj, filter) => {
      //iterate the object
      for (let key in obj) {
        const val = obj[key].Acidente;

        //if val is also object (nested)
        if (val === "object") {
          //recur
          filterSectionAc(val, filter);
        }
        // normal value
        else {
          //current val fails filter condition
          //delete it
          if (filter(val) === false) {
            delete obj[key];
          }
        }

        //if value is empty obj
        //delete it
        if (JSON.stringify(val) === "{}") {
          delete obj[key];
        }
      }
    };
    for (let i = 1; i <= 16; i++) {
      numeroColabAcidente[i] = average[i].length;
      filterSectionAc(average[i], (s) => s === 1);
    }
    const averageAcidente = average;
    for (let j = 1; j <= 16; j++) {
      averageAcidente[j] = averageAcidente[j].filter((element) => {
        if (Object.keys(element).length !== 0) {
          return true;
        }

        return false;
      });
      // console.log( "Resultado colaboradores em risco de acidente: ", j,  averageAcidente);
    }
    //console.log("Prob. Acidente Colaborador = 1:", average);
    const averageresult = [];
    for (let i = 1; i < average.length; i++) {
      averageresult[i - 1] = {
        Section: i,
        ColaboradoresAcidente: average[i].length,
        Colaboradores: numeroColabAcidente[i],
        Average: parseFloat(average[i].length / numeroColabAcidente[i]),
      };
    }
    //console.log("Risco de acidente por secção:", averageresult);
    //setData(averageresult);
    return averageresult;
  }

  averageLoja(algoritmo) {
    let resultado = 0;
    let count = 1;
    for (let i = 0; i < algoritmo.length; i++) {
      if (isNaN(algoritmo[i].Average) === false && algoritmo[i].Average !== 0) {
        resultado = resultado + algoritmo[i].Average;
        console.log("SECÇÃO:", i + 1, " MÉDIA -", algoritmo[i].Average);
        count++;
      }
    }
    console.log("Média loja:", resultado / count);
    return resultado / count;
  }

  render() {
    const probSeccao = this.calculoSeccao();
    console.log(
      "Objeto do algoritmo com probabilidade por secção: ",
      probSeccao
    );
    const {
      Nome,
      Cadeia,
      Insignia,
      DOP,
      Distrito,
      Freguesia,
      Morada,
      CodigoPost,
      Localidade,
      CodigoLoja,
      Nivel_risco,
      Seccao,
      lojas,
    } = this.state;
    const location = this.props.location;
    const rota = location.pathname;
    const rotan = rota.substring(10, rota.length);
    return (
      <div className="row">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4
                className="card-title"
                style={{
                  fontSize: 30,
                  fontstyle: "normal",
                  fontfamily: "Rubik",
                  color: "#335675",
                  textAlign: "center",
                }}
              >
                Áreas
              </h4>
              <div className="row" style={{ marginTop: 40 }}>
                <div className="col-md-4 grid-margin ">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#335675",
                      textAlign: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Link
                      to={`/Frescos` + rotan}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <div className="box1" style={{ textAlign: "center" }}>
                        <img
                          className="imgCartoes"
                          src={Frescos}
                          alt=""
                          style={{ height: 70, marginTop: -30 }}
                        />
                        {
                          //<a href="Loja/Seccao" class="textoCartoes"  style={{ fontSize: 20,  fontstyle: "normal", color:"#F2F3F8", marginTop:60}}>Frescos</a>
                        }

                        <h3
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 10,
                            color: "#F2F3F8",
                          }}
                          className="textoCartoes"
                        >
                          Frescos
                        </h3>

                        <p
                          className="textoCartoes"
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#F2F3F8",
                          }}
                        >
                          Nivel de risco nas últimas horas
                        </p>
                        <h1
                          style={{
                            fontSize: 25,
                            color: "#F2F3F8",
                            backgroundColor: "#CB3130",
                            height: 40,
                            marginBottom: 0,
                            borderRadius: 8,
                          }}
                          className="textoCartoes"
                        >
                          {(
                            probSeccao[6].Average +
                            probSeccao[7].Average +
                            probSeccao[13].Average +
                            probSeccao[11].Average +
                            probSeccao[4].Average +
                            probSeccao[4].Average
                          ).toFixed(2) * 100}
                          %
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 grid-margin">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#335675",
                      textAlign: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Link
                      to={`/NAlimentar` + rotan}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <div className="box1">
                        <img
                          className="imgCartoes"
                          src={Frescos}
                          alt=""
                          style={{ height: 70, marginTop: -30 }}
                        />

                        <h3
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 10,
                            color: "#F2F3F8",
                          }}
                          className="textoCartoes"
                        >
                          Não Alimentar
                        </h3>

                        <p
                          className="textoCartoes"
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#F2F3F8",
                          }}
                        >
                          Nivel de risco nas últimas horas
                        </p>
                        <h1
                          style={{
                            fontSize: 25,
                            color: "#F2F3F8",
                            backgroundColor: "#CB3130",
                            height: 40,
                            marginBottom: 0,
                            borderRadius: 8,
                          }}
                          className="textoCartoes"
                        >
                          - %
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 grid-margin ">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#335675",
                      textAlign: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Link
                      to={`/Suporte` + rotan}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <div className="box1">
                        <img
                          className="imgCartoes"
                          src={Frescos}
                          alt=""
                          style={{ height: 70, marginTop: -30 }}
                        />

                        <h3
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 10,
                            color: "#F2F3F8",
                          }}
                          className="textoCartoes"
                        >
                          Suporte
                        </h3>

                        <p
                          className="textoCartoes"
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#F2F3F8",
                          }}
                        >
                          Nivel de risco nas últimas horas
                        </p>
                        <h1
                          style={{
                            fontSize: 25,
                            color: "#F2F3F8",
                            backgroundColor: "#CB3130",
                            height: 40,
                            marginBottom: 0,
                            borderRadius: 8,
                          }}
                          className="textoCartoes"
                        >
                          {(
                            probSeccao[1].Average + probSeccao[9].Average
                          ).toFixed(2) * 100}
                          %
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 grid-margin">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#335675",
                      textAlign: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Link
                      to={`/Caixas` + rotan}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <div className="box1">
                        <img
                          className="imgCartoes"
                          src={Frescos}
                          alt=""
                          style={{ height: 70, marginTop: -30 }}
                        />

                        <h3
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 10,
                            color: "#F2F3F8",
                          }}
                          className="textoCartoes"
                        >
                          Caixas
                        </h3>

                        <p
                          className="textoCartoes"
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#F2F3F8",
                          }}
                        >
                          Nivel de risco nas últimas horas
                        </p>
                        <h1
                          style={{
                            fontSize: 25,
                            color: "#F2F3F8",
                            backgroundColor: "#CB3130",
                            height: 40,
                            marginBottom: 0,
                            borderRadius: 8,
                          }}
                          className="textoCartoes"
                        >
                          {probSeccao[12].Average.toFixed(2) * 100}%
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 grid-margin">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#335675",
                      textAlign: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Link
                      to={`/Textil` + rotan}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <div className="box1">
                        <img
                          className="imgCartoes"
                          src={Frescos}
                          alt=""
                          style={{ height: 70, marginTop: -30 }}
                        />

                        <h3
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 10,
                            color: "#F2F3F8",
                          }}
                          className="textoCartoes"
                        >
                          Têxtil
                        </h3>

                        <p
                          className="textoCartoes"
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#F2F3F8",
                          }}
                        >
                          Nivel de risco nas últimas horas
                        </p>
                        <h1
                          style={{
                            fontSize: 25,
                            color: "#F2F3F8",
                            backgroundColor: "#CB3130",
                            height: 40,
                            marginBottom: 0,
                            borderRadius: 8,
                          }}
                          className="textoCartoes"
                        >
                          {probSeccao[14].Average.toFixed(2) * 100}%
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 grid-margin">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#335675",
                      textAlign: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Link
                      to={`/Alimentar` + rotan}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <div className="box1">
                        <img
                          className="imgCartoes"
                          src={Frescos}
                          alt=""
                          style={{ height: 70, marginTop: -30 }}
                        />

                        <h3
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 10,
                            color: "#F2F3F8",
                          }}
                          className="textoCartoes"
                        >
                          Alimentar
                        </h3>

                        <p
                          className="textoCartoes"
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#F2F3F8",
                          }}
                        >
                          Nivel de risco nas últimas horas
                        </p>
                        <h1
                          style={{
                            fontSize: 25,
                            color: "#F2F3F8",
                            backgroundColor: "#CB3130",
                            height: 40,
                            marginBottom: 0,
                            borderRadius: 8,
                          }}
                          className="textoCartoes"
                        >
                          {probSeccao[0].Average.toFixed(2) * 100}%
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h2
                style={{
                  fontSize: 20,
                  fontstyle: "normal",
                  fontfamily: "Rubik",
                  color: "#335675",
                }}
              >
                {" "}
                <img className="variaveis" style={{ width: 18 }}></img> {Nome}
              </h2>
              <div className="row">
                <div className="col-12">
                  <br />
                  <br />
                  <p style={{ color: "#335675" }}>
                    Cadeia: <strong>{Cadeia}</strong>
                  </p>
                  <p style={{ color: "#335675" }}>
                    Insignia: <strong>{Insignia} </strong>{" "}
                  </p>
                  <p style={{ color: "#335675" }}>
                    Dop: <strong>{DOP} </strong>{" "}
                  </p>
                  <p style={{ color: "#335675" }}>
                    Distrito: <strong>{Distrito}</strong>{" "}
                  </p>
                  <br />
                  <br />
                  <p style={{ color: "#335675" }}>
                    Freguesia: <strong>{Freguesia}</strong>{" "}
                  </p>
                  <p style={{ color: "#335675" }}>
                    Morada: <strong>{Morada}</strong>{" "}
                  </p>
                  <p style={{ color: "#335675" }}>
                    Código Postal: <strong>{CodigoPost}</strong>{" "}
                  </p>
                  <p style={{ color: "#335675" }}>
                    Localidade: <strong>{Localidade}</strong>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ padding: "0 1rem 0 1rem" }}>
          <div className="col-md-12 d-flex grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h2
                  style={{
                    fontSize: 20,
                    fontstyle: "normal",
                    fontfamily: "Rubik",
                    color: "#335675",
                  }}
                >
                  {" "}
                  <img className="variaveis" style={{ width: 18 }}></img> Nivel
                  de risco geral
                </h2>
              </div>
              <div className="row">
                <div
                  className="col-md-2  "
                  style={{
                    borderColor: "#1133dd",
                    textAlign: "center",
                    border: "1px solid #F2F3F8",
                    marginLeft: 60,
                  }}
                  data-bs-toggle="collapse"
                >
                  <div className="card">
                    <div className="box1">
                      <h3
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          marginTop: 10,
                          color: "#335675",
                        }}
                        className="textoCartoes"
                      >
                        Hoje
                      </h3>
                      <svg width="0" height="0">
                        <linearGradient
                          id="progress-followers"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f5515f" />
                          <stop offset="100%" stopColor="#9f041b" />
                        </linearGradient>
                      </svg>
                      <CircularProgressbarWithChildren
                        className="progress-followers"
                        value={45}
                      >
                        <div>
                          <i
                            className="tt"
                            style={{
                              color: "#335675",
                              fontfamily: "Rubik",
                              fontstyle: "normal",
                              textSizeAdjust: 20,
                            }}
                          >
                            {this.averageLoja(probSeccao).toFixed(2) * 100}%
                          </i>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2"
                  style={{
                    borderColor: "#1133dd",
                    textAlign: "center",
                    border: "1px solid #F2F3F8",
                  }}
                  data-bs-toggle="collapse"
                >
                  <div className="card">
                    <div className="box1">
                      <h3
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          marginTop: 10,
                          color: "#335675",
                        }}
                        className="textoCartoes"
                      >
                        Amanhã
                      </h3>
                      <svg width="0" height="0">
                        <linearGradient
                          id="progress-followers"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f5515f" />
                          <stop offset="100%" stopColor="#9f041b" />
                        </linearGradient>
                      </svg>
                      <CircularProgressbarWithChildren
                        className="progress-followers"
                        value={Nivel_risco * 100}
                      >
                        <div>
                          <i
                            className="tt"
                            style={{
                              color: "#335675",
                              fontfamily: "Rubik",
                              fontstyle: "normal",
                              textSizeAdjust: 20,
                            }}
                          >
                            {Nivel_risco * 100}%
                          </i>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>

                    <a data-toggle="collapse" href="/Loja/lojateste">
                      Collapsible list group
                    </a>
                  </div>
                </div>

                <div
                  className="col-md-2"
                  style={{
                    borderColor: "#1133dd",
                    textAlign: "center",
                    border: "1px solid #F2F3F8",
                  }}
                  data-bs-toggle="collapse"
                >
                  <div className="card">
                    <div className="box1">
                      <h3
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          marginTop: 10,
                          color: "#335675",
                        }}
                        className="textoCartoes"
                      >
                        Amanhã
                      </h3>
                      <svg width="0" height="0">
                        <linearGradient
                          id="progress-followers"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f5515f" />
                          <stop offset="100%" stopColor="#9f041b" />
                        </linearGradient>
                      </svg>
                      <CircularProgressbarWithChildren
                        className="progress-followers"
                        value={25}
                      >
                        <div>
                          <i
                            className="tt"
                            style={{
                              color: "#335675",
                              fontfamily: "Rubik",
                              fontstyle: "normal",
                              textSizeAdjust: 20,
                            }}
                          >
                            25%
                          </i>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>

                    <a data-toggle="collapse" href="/Loja/lojateste">
                      Collapsible list group
                    </a>
                  </div>
                </div>

                <div
                  className="col-md-2"
                  style={{
                    borderColor: "#1133dd",
                    textAlign: "center",
                    border: "1px solid #F2F3F8",
                  }}
                  data-bs-toggle="collapse"
                >
                  <div className="card">
                    <div className="box1">
                      <h3
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          marginTop: 10,
                          color: "#335675",
                        }}
                        className="textoCartoes"
                      >
                        Amanhã
                      </h3>
                      <svg width="0" height="0">
                        <linearGradient
                          id="progress-followers"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f5515f" />
                          <stop offset="100%" stopColor="#9f041b" />
                        </linearGradient>
                      </svg>
                      <CircularProgressbarWithChildren
                        className="progress-followers"
                        value={25}
                      >
                        <div>
                          <i
                            className="tt"
                            style={{
                              color: "#335675",
                              fontfamily: "Rubik",
                              fontstyle: "normal",
                              textSizeAdjust: 20,
                            }}
                          >
                            25%
                          </i>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>

                    <a data-toggle="collapse" href="/Loja/lojateste">
                      Collapsible list group
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loja;
