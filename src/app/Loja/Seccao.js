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
    const rotan=rota.substring(rota.length-25,rota.length,rota.length);
    const nome=rota.substring(1,33,rota.length)
   const nomefinal=nome.substring(0,nome.length-25,nome.length)
    console.log("id:", nomefinal)
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
                
                });console.log(loja)
               
            })
            
            axios.get(`http://127.0.0.1:3000/app/algoritmo/saida`+ rotan )
            .then(res => {
                const loja2 = res.data;
                const loja=res.data[0];
                console.log("ola",res.data[0].SaidaAlgoritmo);
                this.setState({loja2});
                var sum=[];
                var name=[];
                if(("Frescos/"+rotan)==nomefinal ){
                    name=["Padaria","Talho","Peixaria","Charcutaria","Frutas e Legumes","t"]
                    sum=[media7,media8,media14,media12,media5,media6]
                }


               
                  var teste=res.data[0].SaidaAlgoritmo
                  var teste3=res.data[0].SaidaAlgoritmo.length
                  console.log("ola de novo",teste);
                  console.log("get2",res.data[0].SaidaAlgoritmo.length)
                  var teste2 = 0;
                  var teste4=0;
                  var teste5 =0;
                  var teste6=0;
                  var teste7=0;
                  var teste8=0;
                  var teste9=0;
                  var teste10=0;
                  var teste11=0;
                  var teste12=0;
                  var teste13=0;
                  var teste14=0;
                  var teste15=0;
                  var teste16=0;
                  var teste17=0;
                  var teste18=0;
                  var teste19=0;
                  var teste20=0;
                  var teste21=0;
                  var teste22=0;
                        for(var i=0;i<teste3;i++){
                          if(teste[i].Seccao==1 && teste[i].Acidente==1){
                           
                            teste2++;
                           
                          }  
                        
                         
                       } 
                      
                        var media1= ((teste2/teste3)*100);
                      

                        for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==2 && teste[i].Acidente==1){
                             
                              teste4++;
                             
                            }  
                          
                           
                         } 
                        
                         var media2= ((teste4/teste3)*100);

                         
                        for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==3 && teste[i].Acidente==1){
                             
                              teste5++;
                             
                            }  
                          
                           
                         } 
                        
                         var media3= ((teste5/teste3)*100);

                             
                        for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==4 && teste[i].Acidente==1){
                             
                              teste6++;
                             
                            }  
                          
                           
                         } 
                        
                         var media4= ((teste6/teste3)*100);

                             
                        for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==5 && teste[i].Acidente==1){
                             
                              teste7++;
                             
                            }  
                          
                           
                         } 
                        
                         var media5= ((teste7/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==6 && teste[i].Acidente==1){
                             
                              teste8++;
                             
                            }  
                          
                           
                         } 
                        
                         var media6= ((teste8/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==7 && teste[i].Acidente==1){
                             
                              teste9++;
                             
                            }  
                          
                           
                         } 
                        
                         var media7= ((teste9/teste3)*100);


                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==8 && teste[i].Acidente==1){
                             
                              teste10++;
                             
                            }  
                          
                           
                         } 
                        
                         var media8= ((teste10/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==9 && teste[i].Acidente==1){
                             
                              teste11++;
                             
                            }  
                          
                           
                         } 
                        
                         var media9= ((teste11/teste3)*100);
                         

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==10 && teste[i].Acidente==1){
                             
                              teste12++;
                             
                            }  
                          
                           
                         } 
                        
                         var media10= ((teste12/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==11 && teste[i].Acidente==1){
                             
                              teste13++;
                             
                            }  
                          
                           
                         } 
                        
                         var media11= ((teste13/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==12 && teste[i].Acidente==1){
                             
                              teste14++;
                             
                            }  
                          
                           
                         } 
                        
                         var media12= ((teste14/teste3)*100);


                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==13 && teste[i].Acidente==1){
                             
                              teste15++;
                             
                            }  
                          
                           
                         } 
                        
                         var media13= ((teste15/teste3)*100);


                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==14 && teste[i].Acidente==1){
                             
                              teste16++;
                             
                            }  
                          
                           
                         } 
                        
                         var media14= ((teste16/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==15 && teste[i].Acidente==1){
                             
                              teste17++;
                             
                            }  
                          
                           
                         } 
                        
                         var media15= ((teste17/teste3)*100);


                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==16 && teste[i].Acidente==1){
                             
                              teste18++;
                             
                            }  
                          
                           
                         } 
                        
                         var media16= ((teste18/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==17 && teste[i].Acidente==1){
                             
                              teste19++;
                             
                            }  
                          
                           
                         } 
                        
                         var media17= ((teste19/teste3)*100);


                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==18 && teste[i].Acidente==1){
                             
                              teste20++;
                             
                            }  
                          
                           
                         } 
                        
                         var media18= ((teste20/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==19 && teste[i].Acidente==1){
                             
                              teste21++;
                             
                            }  
                          
                           
                         } 
                        
                         var media19= ((teste21/teste3)*100);

                         for(var i=0;i<teste3;i++){
                            if(teste[i].Seccao==20 && teste[i].Acidente==1){
                             
                              teste22++;
                             
                            }  
                          
                           
                         } 
                        
                         var media20= ((teste22/teste3)*100);

                      //  console.log("fds121" ,(teste2.length));
                      console.log("fds121333344444444" ,(teste4));
                      
                     var seccao1="Padaria";
                     
                      this.setState({
                        Nivel_risco: loja2[0].Nivel_risco,
                        CodigoLoja:loja2[0].CodigoLoja,
                        seccao1:seccao1,
                        SaidaAlgoritmo:loja2[0].SaidaAlgoritmo, 
                        media1:media1.toFixed(2),
                        
                        media2:media2.toFixed(2)
                        });
                       
                     
                      })
                
                 
             
             
          
       
}



  render() {
    const {Nome, Cadeia,Insignia,DOP, Distrito, Freguesia, Morada, CodigoPost, Localidade, CodigoLoja,Nivel_risco,seccao1 , media1, media2} = this.state;

    return (
     
       
       
          <div className="row">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title" style={{ fontSize: 30,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675",  textAlign:'center'}}>Secção</h4>
                <div className="row"  style={{  marginTop: 40}}>
                    <div className="col-md-4 grid-margin ">
                    <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                    
                    <div className="box1" style={{ textAlign:'center'}}>
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >{seccao1}</h3>
                 
                    <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas </p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             {media1 }%
           </h1>
                       
                        </div>
                        </div>
</div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Não Alimentar</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center',color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             {media2}%
           </h1>
                        </div>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin " >
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center', borderRadius: 8   }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Suporte</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Caixas</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
                        </div>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Têxtil</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
             45%
           </h1>
           </div>
                        </div>
                      
                        </div>
                        <div className="col-md-4 grid-margin">
                        <div className="card" style={{backgroundColor:"#335675", textAlign:'center' , borderRadius: 8  }}>
                        <div className="box1">
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20,  textAlign:'center', marginTop:10, color:"#F2F3F8"}} className="textoCartoes" >Alimentar</h3>
                 
                    <p className="textoCartoes" style={{ fontSize: 12,  textAlign:'center', color:"#F2F3F8"}} >Nivel de risco nas últimas horas</p>
                    <h1 style={{ fontSize: 25, color:"#F2F3F8",backgroundColor:"#CB3130" , height:40 , marginBottom:0, borderRadius: 8,  }} className="textoCartoes">
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
          
                        
                      
  </div>
 

      
    )
  }
}

export default Loja