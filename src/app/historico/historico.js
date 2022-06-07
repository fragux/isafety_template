import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillTrashFill , BsPlusLg} from "react-icons/bs";
import Frescos from "../../assets/Markers/check.png";
import Info from "../../assets/Markers/info.png";

export class Historico extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            Titulo:'',
            Descricao:'',
            Risco:'',
            Envio:'',
            showModal: false,
           
            showModal2: false,

        };

    }
      handleModal = () => {
        this.setState({ showModal: true });
    }
    handleClose= () => {
      this.setState({ showModal: false });}

    handleModalinfo = () => {
      this.setState({ showModal2: true });
  }
  handleCloseinfo = () => {
    this.setState({ showModal2: false });
}
      handleTitulo = (e) => {
        this.setState({Titulo: e.target.value})
      }

      handleDescricao = (e) => {
        this.setState({Descricao: e.target.value})
      }
      handleRisco = (e) => {
        this.setState({Risco: e.target.value})
      }
      handleEnvio = (e) => {
        this.setState({Envio: e.target.value})
      }
      handleSubmit = (e) => {
    
        e.preventDefault();
      axios.post('http://127.0.0.1:3000/app/sumetealert', {
            Titulo: this.state.Titulo,
            Descricao: this.state.Descricao,
            Risco: this.state.Risco,
            Envio: this.state.Envio,

    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

    alert("Alerta criado com sucesso!");
    window.location.reload();
   
  
}

    modal(){
        const { showModal } = this.state;
       
        return (
            <Modal show={showModal } size='mb' onHide={this.handleClose} animation={true} >
                <Modal.Header closeButton className="close" data-bs-dismiss="modal" aria-label="Close">
               
                
                <Form className="mb-12" style={{ width:500}} onSubmit={this.handleSubmit}>
  <Form.Group className="mb-8" controlId="formBasicEmail" style={{}}>
    
    <Form.Control   type="Text" placeholder="Titulo" required onChange={this.handleTitulo}/>
   
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Control as="textarea" rows={5} placeholder="Descrição do Problema / Sugestão de Soluções" required onChange={this.handleDescricao} />
  
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Label style={{display: 'inline-flex'}}  onChange={this.handleRisco}>Risco</Form.Label>
  
    <Form.Check  type="checkbox" label="Alto" value="Alto"/> 
    <Form.Check  type="checkbox" label="Médio" value="Médio"/>
    <Form.Check type="checkbox" label="Baixo" value="Baixo"/>
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Label  onChange={this.handleEnvio}>Meio de Envio</Form.Label>
    <Form.Check type="checkbox" label="Email" />
    
  </Form.Group>
  
  <Button variant="secondary"  type="submit" style={{ color:"#335675", backgroundColor:"#F2F3F8" ,fontSize:16 }}>
                    Criar
                </Button>
 
  </Form>
  
                <Modal.Footer>
               
                </Modal.Footer>
                </Modal.Header>
            </Modal>
        );
      }
      modalinfo(){
        const { showModal2 } = this.state;
        const {percentage} = 80;
       
        return (
            <Modal show={showModal2 } size='mb' onHide={this.handleCloseinfo}  animation={true} >
                <Modal.Header closeButton className="close" data-bs-dismiss="modal" aria-label="Close">
                <Modal.Body>
                <div style={{width: 170, alignContent:"center", marginLeft:120}}>
                <CircularProgressbar
              value={percentage}
              text={"78%"}
              styles={{ 
                path: {
                stroke:  "#CB3130" ,
               
                },
               
               
              }}
            />
            </div>
            <br />
            

<br />

<h3><strong>Chão Escorregadio</strong></h3>
<br/>
<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at odio dapibus lorem consequat pretium. Pellentesque dapibus augue lorem, ut fermentum massa pulvinar non. Nulla tincidunt a dolor gravida rhoncus. Nam malesuada sapien elit, sit amet tristique massa tempor porta. </h6>
</Modal.Body>
              
                </Modal.Header>
            </Modal>
        );
      }
    render() {
        const { showModal , showModal2} = this.state;
        const percentage = 100;
        return (
<div style={{background:"#FFFFFF"}}>

<div className="col-md-8 grid-margin stretch-card " style={{background:"#FFFFFF"}}>
<div className="card-body">
<h4 className="card-title" style={{ fontSize: 30,  fontstyle: "normal",fontfamily: 'Rubik', color:"#335675",  textAlign:'center'}}>Histórico de Alertas</h4>
<br/>
<Table bordered hover>
  <thead>
    <tr>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      
  
    <td rowSpan="4" style={{width:170, height:10}}><div style={{width: "170px", marginLeft:5}}>
        <CircularProgressbar
              percentage={percentage}
             
              styles={{ marginLeft:70,
                path: {
                stroke: percentage >= 70 ? "#CB3130" : "blue",
                  
                },
               
               
              }}
            />
            </div></td>
      <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td ><strong><h2>78%</h2></strong>
       
      </td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <a  onClick={this.handleModalinfo} ><img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></a>
       { 
                                          showModal2 ?
                                        this.modalinfo()
                                    :
                                        false
                                }</td>
    </tr>
    <tr>
      
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td style={{size:20}}><strong><h2>69%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td style={{size:20}}><strong><h2>88%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td style={{size:20}}><strong><h2>88% </h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
  </tbody>
</Table>
<br />
<nav aria-label="Page navigation example" style={{marginLeft:850}}>
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
<br />
<Table bordered hover>
  <thead>
    <tr>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      
  
    <td rowSpan="4" style={{width:170, height:10}}><div style={{width: "170px", marginLeft:5}}>
        <CircularProgressbar
              percentage={percentage}
             
              styles={{
                path: {
                stroke: percentage >= 70 ? "#F8D36D" : "blue",
                  
                },
               
               
              }}
            />
            </div></td>
      <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>78%</h2></strong>
       
      </td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
      
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>69%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>88%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>88%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
  </tbody>
</Table>
<br />
<nav aria-label="Page navigation example" style={{marginLeft:850}}>
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
<br />
<Table bordered hover>
  <thead>
    <tr>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      
  
    <td rowSpan="4" style={{width:170, height:10}}><div style={{width: "170px", marginLeft:5}}>
        <CircularProgressbar
              percentage={percentage}
             
              styles={{
                path: {
                stroke: percentage >= 70 ? "#5EB6A0" : "blue",
                  
                },
               
               
              }}
            />
            </div></td>
      <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>78%</h2></strong>
       
      </td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
      
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>69%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>88%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
    <tr>
    <td ><strong>Chão Escorregadio</strong>
      <br />
      <br />
      Continente Modelo Bragança                Hoje 00h-06h	</td>
      <td><strong><h2>88%</h2></strong></td>
      <td><img className="imgCartoes" src={Frescos} alt="" style={{ height:20, width:20, marginLeft:10}}/>
       <img className="imgCartoes" src={Info} alt="" style={{ height:20, width:20,marginLeft:30}}/></td>
    </tr>
  </tbody>
</Table>
<br />
<nav aria-label="Page navigation example" style={{marginLeft:850}}>
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
<br/>
<div className="col-md-12  stretch-card "  style={{ background:"#FFFFFF", BorderColor:"#F2F3F8" , borderStyle: "ridge", height:60}}>
<a className="col-md-12 grid-margin stretch-card "  variant="dark"  style={{ color:"#335675",textAlign:"center" , marginTop:20,}} onClick={this.handleModal} >
    + Criar Novo Alerta
  </a>
  { 
                                          showModal ?
                                        this.modal()
                                    :
                                        false
                                }
  </div>
</div>

</div>

 


  
      
</div>
        )
}
        }

        export default Historico