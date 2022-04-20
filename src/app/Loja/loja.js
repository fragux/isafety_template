import React, {Component  } from 'react';
import { Dropdown, ButtonGroup , Accordion } from 'react-bootstrap';
import Frescos from "./area_icone.png";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import axios from 'axios';



export class Loja extends Component {
  constructor(props){
    super(props);
    this.state={
      lojas: [],
     
  }
}
  async componentDidMount() {
    const location = this.props.location;
    const rota= location.pathname;
    const rotan=rota.substring(10,rota.length);
    const { lojaId } = this.state;

     console.log(rotan)
      axios.get(`http://127.0.0.1:3000/app/dashboard`+ rotan )
          .then(res => {
              const loja = res.data;
              this.setState({loja});
              this.setState({
                DT: loja.DT,
                DTCC: loja.DTCC,
                DTCCFR: loja.DTCCFR,
                Distrito:loja.Distrito,
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
                dataAlgoritmo:loja.dataAlgoritmo,
                })
            })/*
          try{
    let response = await fetch('http://127.0.0.1:3000/app' + rota , {
            method: 'GET',
            headers: {
               
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            
            
        })
   
       
        let json = await response.json();
        this.setState({ 
            loja: json
        });
        console.log(json);
    } catch(e){
        console.log("Error to Get Client: " + e);
        const location = this.props.location;
        console.log("Rota pelo menu: ", rota);
    }
  */
          
        

}
  

  render() {
    const {Nome, Cadeia,Insignia,DOP, Distrito, Freguesia, Morada, CodigoPost, Localidade, loja} = this.state;
    return (
      
       
       
          <div className="row">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Áreas</h4>
                <div className="row">
                    <div className="col-md-4 grid-margin ">
                    <div className="card" style={{backgroundColor:"#3774a9", textAlign:'center'  }}>
                    
                    <div className="box1" style={{ textAlign:'center'}}>
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10}} className="textoCartoes" >Frescos</h3>
                 
                    <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#335675",backgroundColor:"#CB3130"}} className="textoCartoes">
             45%
           </h1>
                       
                        </div>
                        </div>
</div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#3774a9", textAlign:'center'  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10}} className="textoCartoes" >Frescos</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#335675",backgroundColor:"#CB3130" , Align:'End'}} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin " >
                        <div className="card" style={{backgroundColor:"#3774a9", textAlign:'center'  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10}} className="textoCartoes" >Frescos</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#335675",backgroundColor:"#CB3130"}} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#3774a9", textAlign:'center'  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10}} className="textoCartoes" >Frescos</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#335675",backgroundColor:"#CB3130" , Align:'End'}} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </div>
                      
                        </div>
               </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h2  style={{ fontSize: 20,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675"}}> <img className="variaveis"  style={{width: 18}}  ></img> {Nome}</h2>
                <div className="row">
                  <div className="col-12">
                   
                    <p style={{fontStyle:"bold"}}>Cadeia: <strong>{Cadeia}</strong></p>
                    <p style={{fontStyle:"bold"}}>Insignia: <strong>{Insignia} </strong> </p>
                    <p style={{fontStyle:"bold"}}>Dop: <strong>{DOP} </strong> </p>
                    <p style={{fontStyle:"bold"}}>Distrito:<strong>{Distrito}</strong>  </p>
                    <p style={{fontStyle:"bold"}}>Freguesia:<strong>{Freguesia}</strong> </p>
                    <p style={{fontStyle:"bold"}}>Morada:<strong>{Morada}</strong>  </p>
                    <p style={{fontStyle:"bold"}}>Código Postal:<strong>{CodigoPost}</strong>  </p>
                    <p style={{fontStyle:"bold"}}>Localidade:<strong>{Localidade}</strong>  </p>
            
                  </div>
                </div>
               
               
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-md-11 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h2  style={{ fontSize: 20,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675"}}> <img className="variaveis"  style={{width: 18}}  ></img> Nivel de risco geral</h2>
              </div>
              <div className="row">
              <div className="col-md-2  " style={{borderColor:"#1133dd" ,textAlign:'center' , border:"1px solid #F2F3F8" , marginLeft:60 }} data-bs-toggle="collapse" >
                        <div className="card"  >
                        <div className="box1" >
                        <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#335675"}} className="textoCartoes" >Hoje</h3>
                        <svg width="0" height="0">
                                      
                                        <linearGradient id="progress-followers" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#f5515f"/>
                                          <stop offset="100%" stopColor="#9f041b"/>
                                        </linearGradient>
                                      
                                    </svg>
                                    <CircularProgressbarWithChildren className="progress-followers"
                                    value={45}>
                                      <div>
                                        <i className="tt" style={{color:"#335675", fontfamily: 'Rubik',
fontstyle: 'normal', textSizeAdjust:20}}>45%</i>
                                      </div>
                                    </CircularProgressbarWithChildren>
                                  </div> 
                                          
                 
                                  


                        </div>
                        
                      
  </div>
  <div  className="col-md-2"  style={{borderColor:"#1133dd" ,textAlign:'center' , border:"1px solid #F2F3F8" }} data-bs-toggle="collapse">
                          
                          <div className="card"  >
                        <div className="box1" >
                        <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#335675"}} className="textoCartoes">Amanhã</h3>
                        <svg width="0" height="0">
                                      
                                        <linearGradient id="progress-followers" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#f5515f"/>
                                          <stop offset="100%" stopColor="#9f041b"/>
                                        </linearGradient>
                                      
                                    </svg>
                                    <CircularProgressbarWithChildren className="progress-followers"
                                    value={25}>
                                      <div>
                                        <i className="tt" style={{color:"#335675", fontfamily: 'Rubik',
fontstyle: 'normal', textSizeAdjust:20}}>25%</i>
                                      </div>
                                    </CircularProgressbarWithChildren>
                                  </div> 
                                          
                 
                   
                                  <a data-toggle="collapse" href="/Loja/lojateste">Collapsible list group</a>


                        </div>
                          </div>

  <div  className="col-md-2"  style={{borderColor:"#1133dd" ,textAlign:'center' , border:"1px solid #F2F3F8" }} data-bs-toggle="collapse">
                          
                          <div className="card"  >
                        <div className="box1" >
                        <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#335675"}} className="textoCartoes">Amanhã</h3>
                        <svg width="0" height="0">
                                      
                                        <linearGradient id="progress-followers" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#f5515f"/>
                                          <stop offset="100%" stopColor="#9f041b"/>
                                        </linearGradient>
                                      
                                    </svg>
                                    <CircularProgressbarWithChildren className="progress-followers"
                                    value={25}>
                                      <div>
                                        <i className="tt" style={{color:"#335675", fontfamily: 'Rubik',
fontstyle: 'normal', textSizeAdjust:20}}>25%</i>
                                      </div>
                                    </CircularProgressbarWithChildren>
                                  </div> 
                                          
                 
                   
                                  <a data-toggle="collapse" href="/Loja/lojateste">Collapsible list group</a>


                        </div>
                          </div>

                          <div  className="col-md-2"  style={{borderColor:"#1133dd" ,textAlign:'center' , border:"1px solid #F2F3F8" }} data-bs-toggle="collapse">
                          
                          <div className="card"  >
                        <div className="box1" >
                        <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#335675"}} className="textoCartoes">Amanhã</h3>
                        <svg width="0" height="0">
                                      
                                        <linearGradient id="progress-followers" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#f5515f"/>
                                          <stop offset="100%" stopColor="#9f041b"/>
                                        </linearGradient>
                                      
                                    </svg>
                                    <CircularProgressbarWithChildren className="progress-followers"
                                    value={25}>
                                      <div>
                                        <i className="tt" style={{color:"#335675", fontfamily: 'Rubik',
fontstyle: 'normal', textSizeAdjust:20}}>25%</i>
                                      </div>
                                    </CircularProgressbarWithChildren>
                                  </div> 
                                          
                 
                   
                                  <a data-toggle="collapse" href="/Loja/lojateste">Collapsible list group</a>


                        </div>
                          </div>
</div>

</div>
</div>
  </div>
  
  </div>
      
    )
  }
}

export default Loja