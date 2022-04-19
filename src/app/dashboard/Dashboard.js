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
    };
  }

  async componentDidMount() {
    let rotaApi = "/app/loja";
    const location = this.props.location;
    console.log("Rota pelo menu: ", location.pathname);

    await api.get(rotaApi).then((response) => {
      console.log("Retorno do servidor:", response.data);
      this.setState({ loja: response.data });
    });
  }

  render() {
    return (
      <>
        <div>
          
          <div className="row " style={{marginRight: "0rem"}}>
            <div className="col-xl-5 col-lg-12 col-sm-12 grid-margin stretch-card"  style={{marginRight: "0rem"}}>
              <div className="card rounded">
                {console.log("Estado da loja:", this.state.loja)}
                <Mapa loja={this.state.loja} />
              </div>
            </div>

            <div className="col-xl-7" style={{border : "0px solid blue"}}>
              <div className="row">
                <div className="card col-xl-4" style={{"padding": 0}}>
                  <div className="card" >
                    <div className="card-body text-center">
                      <h6 className="mb-2 text-dark font-weight-normal">
                        Risco Elevado
                      </h6>
                      <h2 className="mb-4 text-dark font-weight-bold">2</h2>
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
                          value={25}
                        >
                          <div>
                          <b>25%</b>
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
                <div className="card col-xl-4" style={{"padding": 0}} >
                  <div className="card-body text-center">
                    <h6 className="mb-2 text-dark font-weight-normal">
                      Risco Médio
                    </h6>
                    <h2 className="mb-4 text-dark font-weight-bold">12</h2>
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
                        value={45}
                      >
                        <div>
                        <b>45%</b>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <p className="mt-4 mb-0">Aumentou</p>
                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                      35%
                    </h3>
                  </div>
                </div>
                <div className="card col-xl-4" style={{"padding": 0}}>
                  <div className="card-body text-center">
                    <h6 className="mb-2 text-dark font-weight-normal">
                      Risco Baixo
                    </h6>
                    <h2 className="mb-4 text-dark font-weight-bold">582</h2>
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
                        value={60}
                      >
                        <div>
                          <b>60%</b>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <p className="mt-4 mb-0">Aumentou </p>
                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                      10%
                    </h3>
                  </div>
                </div>
              </div>

              <div className="row" style={{"marginTop": "0.5rem"}}>
            <div className="col-xl-12" style={{padding : 0}}>
                <div className="card col-xl-12" style={{"padding": 0}}>
                  <Score loja = {this.state.loja}/>
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
