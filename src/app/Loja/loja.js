import React, {Component  } from 'react';
import { Dropdown, ButtonGroup , Accordion } from 'react-bootstrap';
import Frescos from "./area_icone.png";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import axios from 'axios';
import { Link } from "react-router-dom";


export class Loja extends Component {
  constructor(props){
    super(props);
    this.state={
      lojas: [],
      loja2:[],
     
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
                Id:loja._id,
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
                
                });console.log(loja)
               
            })
            
            axios.get(`http://127.0.0.1:3000/app/algoritmo/saida`+ rotan )
            .then(res => {
                const loja2 = res.data;
                console.log("ola",res.data[0].SaidaAlgoritmo);
                this.setState({loja2});

                 this.setState({
                //   Nivel_risco2: loja2.Nivel_risco2,
                //   CodigoLoja:loja2.CodigoLoja,

                //   SaidaAlgoritmo:loja2.SaidaAlgoritmo, 
                   Seccao:res.data[0].SaidaAlgoritmo.Seccao,
                   });
                  
                 
                 // console.log("adeus",res.data[0].SaidaAlgoritmo.length)

                  var teste=res.data[0].SaidaAlgoritmo
                  var teste3=res.data[0].SaidaAlgoritmo.length
                  console.log("ola de novo",teste);
                  console.log("get2",teste[0].Seccao)
                  var teste2 = 0;
                 
                  
                    
                        for(var i=0;i<teste3;i++){
                          if(teste[i].Seccao==1 && teste[i].Acidente==1){
                           
                            teste2++;
                           
                          }  
                         
                          console.log("fds1213333" ,(teste2));
                          
                       } 
                      
                        var media= ((teste2/teste3)*100);
                      //  console.log("fds121" ,(teste2.length));
                      console.log("fds121333344444444" ,(teste2));
                      console.log("media" ,(media));
                       return media;
                     
                      })
                
                 
             
             
          
       
}



  render() {
    const {Nome, Cadeia,Insignia,DOP, Distrito, Freguesia, Morada, CodigoPost, Localidade, CodigoLoja,Nivel_risco,Seccao , lojas} = this.state;
    const location = this.props.location;
    const rota= location.pathname;
    const rotan=rota.substring(10,rota.length);
    return (
      
       
       
          <div className="row">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h4 className="card-title" style={{ fontSize: 30,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675",  textAlign:'center'}}>Áreas</h4>
                <div className="row"  style={{  marginTop: 40}}>
                    <div className="col-md-4 grid-margin ">
                    <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                    <Link
                        to={`/Frescos`+ rotan}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                    <div className="box1" style={{ textAlign:'center'}}>
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    {//<a href="Loja/Seccao" class="textoCartoes"  style={{ fontSize: 20,  fontstyle: "normal", color:"#F2F3F8", marginTop:60}}>Frescos</a>
                    }
                    
                      
                    <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Frescos</h3>
                 
                    <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             {Nivel_risco }
           </h1>
          
                        </div>
                        </Link>
                        </div>
</div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <Link
                         to={`/NAlimentar`+ rotan}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Não Alimentar</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center',color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </Link>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin " >
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center', borderRadius: 8   }}>
                        <Link
                        to={`/Suporte`+ rotan}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Suporte</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </Link>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <Link
                         to={`/Caixas`+ rotan}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Caixas</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </Link>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <Link
                         to={`/Textil`+ rotan}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Têxtil</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
           </div>
           </Link>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <Link
                         to={`/Alimentar`+ rotan}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Alimentar</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
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
              <h2  style={{ fontSize: 20,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675"}}> <img className="variaveis"  style={{width: 18}}  ></img> {Nome}</h2>
                <div className="row">
                  <div className="col-12">
                  <br/><br/>
                    <p style={{color:"#335675"}}>Cadeia: <strong>{Cadeia}</strong></p>
                    <p style={{color:"#335675"}}>Insignia: <strong>{Insignia} </strong> </p>
                    <p style={{color:"#335675"}}>Dop: <strong>{DOP} </strong> </p>
                    <p style={{color:"#335675"}}>Distrito: <strong>{Distrito}</strong>  </p>
                    <br/><br/>
                    <p style={{color:"#335675"}}>Freguesia: <strong>{Freguesia}</strong> </p>
                    <p style={{color:"#335675"}}>Morada: <strong>{Morada}</strong>  </p>
                    <p style={{color:"#335675"}}>Código Postal: <strong>{CodigoPost}</strong>  </p>
                    <p style={{color:"#335675"}}>Localidade: <strong>{Localidade}</strong>  </p>
                    
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
                                    value={Nivel_risco*100}>
                                      <div>
                                        <i className="tt" style={{color:"#335675", fontfamily: 'Rubik',
fontstyle: 'normal', textSizeAdjust:20}}>{Nivel_risco*100}%</i>
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