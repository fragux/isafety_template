import React, { Component } from "react";
import { Dropdown, ButtonGroup, Accordion } from "react-bootstrap";
import Frescos from "./area_icone.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./loja.css";
import { GiConsoleController } from "react-icons/gi";

function RenderSeccao({ seccao, rotan, probSeccao }) {
  return seccao.map(({ Area, Sections }, index) => {
    console.log(
      "Dados das Secções: ",
      Sections.map(({ Data }) => Data)
    );
    console.log("indice do array", index);
    const total = Sections.reduce(
      (total, currentItem) =>
        isNaN(currentItem.Data.Average)
          ? (total = total + 0)
          : (total = total + currentItem.Data.Average),
      0
    );
    return (
      <div className="col-md-4 grid-margin mt-2">
        <div
          className="card"
          style={
            index % 2 === 0
              ? {
                  backgroundColor: "#335675",
                  textAlign: "center",
                  borderRadius: 8,
                }
              : {
                  backgroundColor: "lightgrey",
                  textAlign: "center",
                  borderRadius: 8,
                }
          }
        >
          <Link
            to={`/${Area}` + rotan}
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
                {Area}
              </h3>

              <p
                className="textoCartoes"
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: "#F2F3F8",
                }}
              >
                Nivel de risco nas últimas horas
              </p>

              <h1
                style={
                  total <= 0.3 && total >= 0
                    ? {
                        fontSize: 25,
                        height: 40,
                        marginBottom: 0,
                        borderRadius: 8,
                        color: "#F2F3F8",
                        backgroundColor: "green",
                      }
                    : total > 0.3 && total <= 0.8
                    ? {
                        fontSize: 25,
                        height: 40,
                        marginBottom: 0,
                        borderRadius: 8,
                        color: "#F2F3F8",
                        backgroundColor: "#ffc107",
                      }
                    : {
                        fontSize: 25,
                        height: 40,
                        marginBottom: 0,
                        borderRadius: 8,
                        color: "#F2F3F8",
                        backgroundColor: "green",
                      }
                }
              >
                {isNaN(total) ? 0 : total.toFixed(2) * 100}%
              </h1>
            </div>
          </Link>
        </div>
      </div>
    );
  });
}

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

  arrayArea(array) {
    const area = [
      {
        Area: "Frescos",
        Sections: [
          {
            Nome: "Padaria",
            Data: array[6],
          },
          {
            Nome: "Talho",
            Data: array[7],
          },
          {
            Nome: "Peixaria",
            Data: array[13],
          },
          {
            Nome: "Charcutaria",
            Data: array[11],
          },
          {
            Nome: "Frutas",
            Data: array[4],
          },
          {
            Nome: "Takeaway",
            Data: array[5],
          },
        ],
      },
      {
        Area: "Suporte",
        Sections: [
          {
            Nome: "Decoração",
            Data: array[9],
          },
          {
            Nome: "Manutenção",
            Data: "",
          },
          {
            Nome: "Gestor Loja",
            Data: array[1],
          },
        ],
      },
      {
        Area: "Caixas",
        Sections: [
          {
            Nome: "Caixas",
            Data: array[12],
          },
          {
            Nome: "Têxtil",
            Data: array[14],
          },
        ],
      },
      {
        Area: "Alimentar",
        Sections: [
          {
            Nome: "Alimentar",
            Data: array[0],
          },
        ],
      },
    ];
    return area;
  }

  weekday(day) {
    switch (day) {
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
      case 7:
        return "Domingo";
      default:
        break;
    }
  }

  gradiente(value) {
    if (value <= 0.3)
        return (
          <div className="px-4 d-flex align-items-center">
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="progress-visitors"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#b4ec51" />
                  <stop offset="100%" stopColor="#429321" />
                </linearGradient>
              </defs>
            </svg>
            <CircularProgressbarWithChildren
              className="progress-visitors"
              value={value * 100}
            >
              <div>
                <b>{(value * 100).toFixed(1)}%</b>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        );
  if(value > 0.6)
        return (
          <div className="px-4 d-flex align-items-center">
            <svg width="0" height="0">
              <defs>
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
              </defs>
            </svg>
            <CircularProgressbarWithChildren
              className="progress-followers"
              value={value * 100}
            >
              <div>
                <b>{(value * 100).toFixed(1)}%</b>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        );

    if (value > 0.3 && value <= 0.6)
        return (
          <div className="px-4 d-flex align-items-center">
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="progress-impressions"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#fad961" />
                  <stop offset="100%" stopColor="#f76b1c" />
                </linearGradient>
              </defs>
            </svg>
            <CircularProgressbarWithChildren
              className="progress-impressions"
              value={value * 100}
            >
              <div>
                <b>{(value * 100).toFixed(1)}%</b>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        );
    
  }

  render() {
    const probSeccao = this.calculoSeccao();
    const seccao = this.arrayArea(probSeccao);
    var today = new Date().getDay();
    console.log(
      "Objeto do algoritmo com probabilidade por secção: ",
      probSeccao
    );
    console.log("Loja por área e secção: ", this.arrayArea(probSeccao));
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
      <><div className="row">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4
                className="card-title"
                style={{
                  fontSize: 25,
                  fontstyle: "normal",
                  fontfamily: "Rubik",
                  color: "#335675",
                  textAlign: "center",
                }}
              >
                Áreas
              </h4>
              <div className="row" style={{ marginTop: 40 }}>
                {RenderSeccao({ seccao, rotan, probSeccao })}
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
      </div><div className="row" >
          <div className="col-md-12 d-flex grid-margin stretch-card">
            <div className="card" style={{ paddingBottom: "2rem" }}>
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
                  <img className="variaveis" style={{ width: 18 }}></img> Nível
                  de risco geral
                </h2>
              </div>
              <div className="row" >
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
                      {this.gradiente(this.averageLoja(probSeccao))}
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
                      {this.gradiente(this.averageLoja(probSeccao) * 1.2)}
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
                        {this.weekday(today + 2)}
                      </h3>
                      {this.gradiente(this.averageLoja(probSeccao) * 2.2)}
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
                        {this.weekday(today + 3)}
                      </h3>
                      {this.gradiente(this.averageLoja(probSeccao) * 3.2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></>
     // </div>
    );
  }
}

export default Loja;
