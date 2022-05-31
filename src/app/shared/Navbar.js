import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { AiOutlineLine } from "react-icons/ai";
import './Navbar.css';
class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  render () {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" >
        <div className="text-center navbar-brand-wrapper" style={{backgroundColor:"#3774a9"}}>
          <Link className="navbar-brand brand-logo" to="/"><img src={require('../../assets/logo/_logo_isafety_full.png')} alt="logo" style={{width:150, height:39, marginLeft:"-2.5rem"}}/></Link>
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/logo/_logo_isafety_vector_white.png')} alt="logo"  style={{width:40, height:39}} /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100"  action="#">
              <div className="input-group"  style={{backgroundColor:"#F2F3F8", borderRadius:15 , width: 325, height: 30 }}>
               
                <input type="text" style={{backgroundColor:"#F2F3F8", borderRadius:15 }} className="form-control bg-transparent border-0" />
                <button className="search-btn"> 
                <FiIcons.FiSearch />
            </button>
           
              </div>
              <br/>
              <button style={{backgroundColor:"#FFFFFF", border:0 , color:"#335675", marginLeft:20}} className="filter-btn">
                <FiIcons.FiFilter size={20} className=" fi-rotate-90"/>
            </button>
            </form>
            
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item-nav-profile-d-none-d-xl-flex" style={{  color:"#F2F3F8", rotate:180 , transformrotate:45}}>
            <AiOutlineLine size={30}/>
            </li>
            
           

            <li className="nav-item nav-profile nav-language">
              <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link count-indicator hide-carret">
                  <i className="mdi mdi-bell-outline"></i>
                  <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0 bg-primary text-white py-4"> Notifications </h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="mdi mdi-calendar"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"> Event today </h6>
                      <p className="text-gray ellipsis mb-0">  Just a reminder that you have an event today  </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="mdi mdi-settings"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"> Settings </h6>
                      <p className="text-gray ellipsis mb-0">
                       Update dashboard 
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-link-variant"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"> Launch Admin </h6>
                      <p className="text-gray ellipsis mb-0">
                       New admin wow! 
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                 <a href="/Historico"> <h6 className="p-3 mb-0 text-center cursor-pointer" > See all notifications </h6></a>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            
            <li className="nav-item">
              <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link count-indicator hide-carret">
                  <i className="mdi mdi-email-outline"></i>
                  <span className="count-symbol bg-warning"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <h6 className="p-3 bg-primary text-white py-4 mb-0">Messages</h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={require("../../assets/images/faces/face4.jpg")} alt="user" className="profile-pic"/>
                      
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"> Mark send you a message </h6>
                      <p className="text-gray mb-0">
                        1  Minutes ago 
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={require("../../assets/images/faces/face2.jpg")} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"> Cregh send you a message </h6>
                      <p className="text-gray mb-0">
                        15  Minutes ago 
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={require("../../assets/images/faces/face3.jpg")} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"> Profile picture updated </h6>
                      <p className="text-gray mb-0">
                        18  Minutes ago 
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">4  new messages </h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="nav-item-nav-profile-d-none-d-xl-flex" style={{  color:"#F2F3F8", rotate:180 , transformrotate:45}}>
            <AiOutlineLine size={30}/>
            </li>
            <li className="nav-item">
              <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link count-indicator">
                  <div className="nav-profile-img">
                      <img src={require("../../assets/Markers/User.png")} alt="profile"  style={{width: "35px" , borderRadius : "5rem", marginLeft: "-1rem", marginTop: "-0.5rem"}}/>
                    </div>
                   
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                   {/*
                  <div className="p-3 text-center bg-primary">
                
                    <img className="img-avatar img-avatar48 img-avatar-thumb" src={require("../../assets/Markers/User.png")} alt="" style={{width: "45px" , borderRadius : "5rem", marginLeft: "-1rem", marginTop: "-0.5rem"}} />
    
                    </div>
                    */}
                  <div className="p-2">
                    <h5 className="dropdown-header text-uppercase pl-2 text-dark"> User Options </h5>
                    <Dropdown.Item className="dropdown-item d-flex align-items-center justify-content-between" href="!#" onClick={evt =>evt.preventDefault()}>
                      <span> Inbox </span>
                      <span className="p-0">
                        <span className="badge badge-primary">3</span>
                        <i className="mdi mdi-email-open-outline ml-1"></i>
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item d-flex align-items-center justify-content-between" href="/user-pages/login-1" onClick={evt =>evt.preventDefault()}>
                      <span> Profile </span>
                      <span className="p-0">
                        <span className="badge badge-success">1</span>
                        <i className="mdi mdi-account-outline ml-1"></i>
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item d-flex align-items-center justify-content-between" href="!#" onClick={evt =>evt.preventDefault()}>
                      <span> Settings </span>
                      <i className="mdi mdi-settings"></i>
                    </Dropdown.Item>
                    <div role="separator" className="dropdown-divider"></div>
                    <h5 className="dropdown-header text-uppercase  pl-2 text-dark mt-2"> Actions </h5>
                    <Dropdown.Item className="dropdown-item d-flex align-items-center justify-content-between" href="!#" onClick={evt =>evt.preventDefault()}>
                      <span> Lock Account </span>
                      <i className="mdi mdi-lock ml-1"></i>
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item d-flex align-items-center justify-content-between" href="!#" onClick={evt =>evt.preventDefault()}>
                      <span> Log Out </span>
                      <i className="mdi mdi-logout ml-1"></i>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;