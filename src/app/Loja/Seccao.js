import React, {Component  } from 'react';
import { Dropdown, ButtonGroup , Accordion } from 'react-bootstrap';
import Frescos from "./area_icone.png";
import Alimentar from "./area2.png";
import NAlimentar from "./area3.png";
import Suporte from "./area4.png";
import Caixas from "./area5.png";
import Textil from "./area6.png";
import location2 from "./location.png";
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
     algoritmo:[{}]
  }
}
  async componentDidMount() {
    const location = this.props.location;
    const rota= location.pathname;
    const rotan=rota.substring(rota.length-25,rota.length,rota.length);
    const nome=rota.substring(1,33,rota.length)
   const nomefinal=nome.substring(0,nome.length-25,nome.length)
    console.log("id:", rota)
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
               


               
                  var teste=res.data[0].SaidaAlgoritmo
                  var teste3=res.data[0].SaidaAlgoritmo.length
                  this.setState({algoritmo:teste})
                  console.log("ola de novo",{algoritmo:teste});
                  console.log("get2",res.data[0].SaidaAlgoritmo.length)
                 
                 /*
                         var sum=[];
                         var name=[];
                         if(("/Frescos"+ rotan)== rota ){
                             name=['Padaria','Talho','Peixaria','Charcutaria','Frutas e Legumes','Take away']
                             sum=[probSeccao[6].Average, media8, media14, media12, media5, media6]
                            
                             
                         }

                         const listaareas=name.map(
                            (c,i) =>
                            <p key={i}>{c}</p>
                         ) 

                         const listasum=sum.map(
                            (c,i) =>
                            <p key={i}>{c}</p>
                         )  
                        // console.log(media1)

                      //  console.log("fds121" ,(teste2.length));
                  if(("/Frescos"+ rotan)== rota ){
    const sum=[
                        {name:"Padaria", sum:(probSeccao[6].Average).toFixed(2)*100} 
                         
                             //name=['Padaria','Talho','Peixaria','Charcutaria','Frutas e Legumes','Take away']
                             //sum=[probSeccao[6].Average, media8, media14, media12, media5, media6]
                            
                             
                         

                         ]}
                      
                    */
                    
                       
                     
                      })
                
                 
             
             
          
       
                    
}
calculoSeccao(){
    const location = this.props.location;
    const rota= location.pathname;
    const rotan=rota.substring(rota.length-25,rota.length,rota.length);
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
    for (let i=1; i<=16; i++){
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
      for (let i=1; i<=16; i++){

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
    for (let i=1; i<=16; i++){
      numeroColabAcidente[i] = average[i].length;
    filterSectionAc(average[i], (s) => s === 1);
    }
    const averageAcidente = average;
    for (let j=1; j<=16; j++){
       averageAcidente[j] = averageAcidente[j].filter((element) => {
        if (Object.keys(element).length !== 0) {
          return true;
        }

        return false;
      });
      //console.log( "Resultado colaboradores em risco de acidente: ", j,  averageAcidente); 
    }
    console.log("Prob. Acidente Colaborador = 1:", average);
    const averageresult = [] ;
    for(let i = 1; i<average.length; i++){
        averageresult[i-1]= {
         "Section" : i,
         "ColaboradoresAcidente": (average[i].length),
         "Colaboradores": (numeroColabAcidente[i]),
         "Average" : parseFloat(average[i].length / numeroColabAcidente[i])
        }
    } 
    console.log("Risco de acidente por secção:", averageresult);
    //setData(averageresult);
    return averageresult
  }

  averageLoja(algoritmo){
    
    let resultado = 0;
    let count = 1;
    for(let i = 0; i < algoritmo.length; i++ ){
      if(isNaN(algoritmo[i].Average) === false && algoritmo[i].Average!==0){
      resultado = resultado + algoritmo[i].Average;  
      console.log("averageLoja: ", i, algoritmo[i].Average );
      count++; 
      }                       
    }
    console.log("Média loja:", resultado/count)
   
    
                         return resultado/count
  }
  arrayArea(array) {
    const area = [{
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
        ]},
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
          }
        ]},
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
          }
        ]},{
        
        Area: "Alimentar",
        Sections: [
          {
            Nome: "Alimentar",
            Data: array[0],
          },
         
        ]
      }];
      return area;
    }

    search(){

    }

  render() {
    const probSeccao = this.calculoSeccao();
    const seccao = this.arrayArea(probSeccao);
    console.log("Objeto do algoritmo com probabilidade por secção: ", probSeccao);  
    const location = this.props.location;
    const rota= location.pathname;
    const rotan=rota.substring(rota.length-25,rota.length,rota.length); 
    console.log("Objeto ", rota);  


    const {Nome, Cadeia,Insignia,DOP, Distrito, Freguesia, Morada, CodigoPost, Localidade,CodigoLoja,Nivel_risco, listaareas, listasum} = this.state;
    const sum=[];
    const name=[];
    /*if(("/Frescos"+ rotan)== rota ){
   
                          //  {name:"Padaria", sum:(probSeccao[6].Average).toFixed(2)*100} 
                             
                                // name=['Padaria','Talho','Peixaria','Charcutaria','Frutas e Legumes','Take away']
                                 //sum=[probSeccao[6].Average, media8, media14, media12, media5, media6]
                                
                              
                             
    
                            
                             }*/

    return (
    
          
       
          <div  className="row">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card" >
              <div className="card-body">
                <h4 className="card-title" style={{ fontSize: 30,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675",  textAlign:'center'}}>Secção</h4>
                <div className="row"  style={{  marginTop: 40}}>
                    
           {
            seccao.map(({Sections, Area}) => {
                if(Area==="Frescos"  && rota===("/Frescos" + rotan)){
                    console.log("teste1233333333333333",Sections)
                    return(
            Sections.map(({Nome,Data}, index) => {
                    console.log("teste1233333333333333",Nome)
                    const total = Sections.reduce(
      (total, currentItem) => isNaN(currentItem.Data.Average) ? (total = total + 0) :  (total = total + currentItem.Data.Average),

      0
    );
                return(
                    <div  className="col-md-4 grid-margin ">
                   <div
          className="card"
          style={
            (index % 2 === 0) ?
            {
            backgroundColor: "#335675",
            textAlign: "center",
            borderRadius: 8,
            color:"#FFFFFF"
          }: 
          {
            backgroundColor: "lightgrey",
            textAlign: "center",
            borderRadius: 8,
            color:"#335675"
          }
        }
        >
                    
                    <div className="box1" style={{ textAlign:'center'}}>
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10,}} className="textoCartoes"> {Nome}</h3>
                 
                    <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas </p>
                    <h1     style={
                  Data.Average <= 0.3 && Data.Average >=0
                    ? {
                        fontSize: 25,
                        height: 40,
                        marginBottom: 0,
                        borderRadius: 8,
                        color: "#F2F3F8",
                        backgroundColor: "green",
                      }
                    : Data.Average > 0.3 && Data.Average <0.8
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
                        backgroundColor: "grey",
                      }
                } className="textoCartoes">
                    {isNaN(Data.Average) ? 0 : Data.Average.toFixed(2) * 100}%
                    
           </h1>


           
                       
                        </div>
                        </div>
</div>
                     
);
                }) 
                    ); 
            }    
       
                  
                                                        
     
            if(Area==="Suporte"  && rota===("/Suporte" + rotan)){
                return(
                    Sections.map(({Nome,Data}, index) => {
                            console.log("teste1233333333333333",Nome)
                            
                        return(
                            <div  className="col-md-4 grid-margin ">
                           <div
                  className="card"
                  style={
                    (index % 2 === 0) ?
                    {
                    backgroundColor: "#335675",
                    textAlign: "center",
                    borderRadius: 8,
                    color:"#FFFFFF"
                  }: 
                  {
                    backgroundColor: "lightgrey",
                    textAlign: "center",
                    borderRadius: 8,
                    color:"#335675"
                  }
                }
                >
                            
                            <div className="box1" style={{ textAlign:'center'}}>
                            <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                            
                            <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10,}} className="textoCartoes"> {Nome}</h3>
                         
                            <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas </p>
                            <h1     style={
                          Data.Average <= 0.3
                            ? {
                                fontSize: 25,
                                height: 40,
                                marginBottom: 0,
                                borderRadius: 8,
                                color: "#F2F3F8",
                                backgroundColor: "green",
                              }
                            : Data.Average < 0.6
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
                                backgroundColor: "grey",
                              }
                        } className="textoCartoes">
                                          {isNaN(Data.Average) ? 0 : Data.Average.toFixed(2) * 100}%

                            
                   </h1>
        
        
                   
                               
                                </div>
                                </div>
        </div>
                             
        );
                        }) 
                            ); 
                            
                    }   
                    if(Area==="Caixas"  && rota===("/Caixas" + rotan)){
                        return(
                            Sections.map(({Nome,Data}, index) => {
                                    console.log("teste1233333333333333",Nome)
                                    
                                return(
                                    <div  className="col-md-4 grid-margin ">
                                   <div
                          className="card"
                          style={
                            (index % 2 === 0) ?
                            {
                            backgroundColor: "#335675",
                            textAlign: "center",
                            borderRadius: 8,
                            color:"#FFFFFF"
                          }: 
                          {
                            backgroundColor: "lightgrey",
                            textAlign: "center",
                            borderRadius: 8,
                            color:"#335675"
                          }
                        }
                        >
                                    
                                    <div className="box1" style={{ textAlign:'center'}}>
                                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                                    
                                    <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10,}} className="textoCartoes"> {Nome}</h3>
                                 
                                    <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas </p>
                                    <h1     style={
                                  Data.Average <= 0.3
                                    ? {
                                        fontSize: 25,
                                        height: 40,
                                        marginBottom: 0,
                                        borderRadius: 8,
                                        color: "#F2F3F8",
                                        backgroundColor: "green",
                                      }
                                    : Data.Average < 0.6
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
                                        backgroundColor: "grey",
                                      }
                                } className="textoCartoes">
                                    {isNaN(Data.Average) ? 0 : Data.Average.toFixed(2) * 100}%
                                    
                           </h1>
                
                
                           
                                       
                                        </div>
                                        </div>
                </div>
                                     
                );
            }) 
            );   
    } 
    if(Area==="Alimentar"  && rota===("/Alimentar" + rotan)){
        return(
            Sections.map(({Nome,Data}, index) => {
                    console.log("teste1233333333333333",Nome)
                    
                return(
                    <div  className="col-md-4 grid-margin ">
                   <div
          className="card"
          style={
            (index % 2 === 0) ?
            {
            backgroundColor: "#335675",
            textAlign: "center",
            borderRadius: 8,
            color:"#FFFFFF"
          }: 
          {
            backgroundColor: "lightgrey",
            textAlign: "center",
            borderRadius: 8,
            color:"#335675"
          }
        }
        >
                    
                    <div className="box1" style={{ textAlign:'center'}}>
                    <img className="imgCartoes" src={Frescos} alt="" style={{ height:70, marginTop: -30}}/>
                    
                    <h3  style={{ fontSize: 20, textAlign:'center', marginTop:10,}} className="textoCartoes"> {Nome}</h3>
                 
                    <p className="textoCartoes" style={{  fontSize: 12,  textAlign:'center'}} >Nivel de risco nas últimas horas </p>
                    <h1     style={
                  Data.Average <= 0.3
                    ? {
                        fontSize: 25,
                        height: 40,
                        marginBottom: 0,
                        borderRadius: 8,
                        color: "#F2F3F8",
                        backgroundColor: "green",
                      }
                    : Data.Average < 0.6
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
                        backgroundColor: "grey",
                      }
                } className="textoCartoes">
                                 {isNaN(Data.Average) ? 0 : Data.Average.toFixed(2) * 100}%

                    
           </h1>


           
                       
                        </div>
                        </div>
</div>
                     
);
}) 
); 
}             
}         
            
            )
                                            
}
     
     


     

               </div>
              </div>
            </div>
          </div>




          
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h2  style={{ fontSize: 20,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675"}}> 
              <img className="variaveis"  src={location2} style={{width: 18}}  ></img> {Nome}</h2>
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
 
                );
}
 

  }    

export default Loja;