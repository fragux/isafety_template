import React, { Component } from "react";
//import { ProgressBar } from "react-bootstrap";
//import { Dropdown, Tabs, Tab } from "react-bootstrap";
//import { Line, Bar } from "react-chartjs-2";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import Mapa from "../Mapa/Mapa.js";
import api from "../../Services/api";
import Score from "../Score/Score.js";
//import { useLocation } from 'react-router-dom';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loja: [{}],
      riscoAlto: 0,
      riscoModerado: 0,
      riscoBaixo: 0,
      nAlto: 0,
      nMedio: 0,
      nBaixo: 0
    };
    this.getLoja = this.getLoja.bind(this);   
  }

  
  handleRisco = (alto, moderado, baixo, countAlto, countMedio, countBaixo) => {
    this.setState({ riscoAlto: alto });
    this.setState({ riscoModerado: moderado });
    this.setState({ riscoBaixo: baixo });
    this.setState({ nAlto: countAlto });
    this.setState({ nMedio: countMedio });
    this.setState({ nBaixo: countBaixo });
    console.log("Risco que vem do mapa: ", alto, moderado, baixo);
  };


  async componentDidMount() {
    this.getLoja();
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getLoja();
    }
  }

  async getLoja() {
    let rotaApi = "/app";
    const location = this.props.location;
    console.log("Rota pelo menu: ", location.pathname);

    await api.get(rotaApi + location.pathname).then((response) => {
      //console.log("Retorno do servidor:", response.data);
      this.setState({ loja: response.data });
    });
  }

  render() {
    return (
      <>
        <div>
          <div className="row " style={{ marginRight: "0rem" }}>
            <div
              className="col-xl-5 col-lg-12 col-sm-12 grid-margin stretch-card"
              style={{ marginRight: "0rem" }}
            >
              <div className="card rounded">
                {console.log("Estado da loja:", this.state.loja)}
                <Mapa
                  loja={this.state.loja}
                  mapaToDashboard = {this.handleRisco}
                  
                />
              </div>
            </div>

            <div className="col-xl-7" style={{ border: "0px solid blue" }}>
              <div className="row">
                <div className="card col-xl-4" style={{ padding: 0 }}>
                  <div className="card">
                    <div className="card-body text-center">
                      <h6 className="mb-2 text-dark font-weight-normal">
                        Risco Elevado
                      </h6>
                      <h2 className="mb-4 text-dark font-weight-bold">{this.state.nAlto}</h2>
                      <div className="px-6 d-flex align-items-center">
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
                          value={this.state.riscoAlto*100}
                        >
                          <div>
                            <b>{(this.state.riscoAlto*100).toFixed(1)}%</b>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                      <p className="mt-4 mb-0">Baixou</p>
                      <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                        25%
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card col-xl-4" style={{ padding: 0 }}>
                  <div className="card-body text-center">
                    <h6 className="mb-2 text-dark font-weight-normal">
                      Risco Médio
                    </h6>
                    <h2 className="mb-4 text-dark font-weight-bold">{this.state.nMedio}</h2>
                    <div className="px-6 d-flex align-items-center">
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
                        value={this.state.riscoModerado*100}
                      >
                        <div>
                          <b>{(this.state.riscoModerado*100).toFixed(1)}%</b>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <p className="mt-4 mb-0">Aumentou</p>
                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                      35%
                    </h3>
                  </div>
                </div>
                <div className="card col-xl-4" style={{ padding: 0 }}>
                  <div className="card-body text-center">
                    <h6 className="mb-2 text-dark font-weight-normal">
                      Risco Baixo
                    </h6>
                    <h2 className="mb-4 text-dark font-weight-bold">{this.state.nBaixo}</h2>
                    <div className="px-6 d-flex align-items-center">
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
                        value={this.state.riscoBaixo*100}
                      >
                        <div>
                          <b>{(this.state.riscoBaixo*100).toFixed(1)}%</b>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <p className="mt-4 mb-0">Aumentou </p>
                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                    {(this.state.riscoBaixo*100).toFixed(1)}%
                    </h3>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "0.5rem" }}>
                <div className="col-xl-12" style={{ padding: 0 }}>
                  <div className="card col-xl-12" style={{ padding: 0 }}>
                    <Score loja={this.state.loja} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
