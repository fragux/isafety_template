import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

import Sonae from '../../assets/logo/_sonae_s.png';
import Continente from '../../assets/logo/_continente_c.png';
import ContinenteM from '../../assets/logo/_continente_m.png';
import ContinenteBD from '../../assets/logo/_continente_bd.png';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/dashboard', state: 'appsMenuOpen'},
      {path:'/dashboard/continente', state: 'basicUiMenuOpen'},
      {path:'/dashboard/modelo', state: 'iconsMenuOpen'},
      {path:'/dashboard/bomdia', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-category"> Geral </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="icon-bg"><img src={Sonae} style={{width: "25px"}} alt = "logo"/></span>
              <span className="menu-title"> SONAE </span>
            </Link>
          </li>
          <li className="nav-item nav-category"> Ins??gnia </li>
          <li className={ this.isPathActive('/continente') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><img src={Continente} style={{width: "25px"}} alt = "logo"/></span>
              <span className="menu-title"> Continente </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/continente/cntnorte') ? 'nav-link active' : 'nav-link' } to="/dashboard/continente/cntnorte"> CNT Norte </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/continente/cntcentro') ? 'nav-link active' : 'nav-link' } to="/dashboard/continente/cntcentro"> CNT Centro </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/continente/cntsul') ? 'nav-link active' : 'nav-link' } to="/dashboard/continente/cntsul"> CNT Sul </Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/modelo') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><img src={ContinenteM} style={{width: "25px"}} alt = "logo"/></span>
              <span className="menu-title"> Modelo </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/modelo/cmnorte') ? 'nav-link active' : 'nav-link' } to="/dashboard/modelo/cmnorte"> CM Norte </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/modelo/cmcentro') ? 'nav-link active' : 'nav-link' } to="/dashboard/modelo/cmcentro"> CM Centro </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/modelo/cmsul') ? 'nav-link active' : 'nav-link' } to="/dashboard/modelo/cmsul"> CM Sul </Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/bomdia') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><img src={ContinenteBD} style={{width: "25px"}} alt = "logo"/></span>
              <span className="menu-title"> Bom Dia </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.formElementsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/bomdia/cbdnorte') ? 'nav-link active' : 'nav-link' } to="/dashboard/bomdia/cbdnorte"> CBD Norte </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/bomdia/cbdcentro') ? 'nav-link active' : 'nav-link' } to="/dashboard/bomdia/cbdcentro"> CBD Centro </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/dashboard/bomdia/cbdsul') ? 'nav-link active' : 'nav-link' } to="/dashboard/bomdia/cbdsul"> CBD Sul </Link></li>
              </ul>
            </Collapse>
          </li>
          {/*<li className="nav-item nav-category"> Data Representation </li>
          <li className={ this.isPathActive('/charts') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('chartsMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><i className="mdi mdi-chart-bar menu-icon"></i></span>
              <span className="menu-title"> Charts </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.chartsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } to="/charts/chart-js"> Chart Js </Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/tables') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><i className="mdi mdi-table-large menu-icon"></i></span>
              <span className="menu-title"> Tables </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.tablesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link' } to="/tables/basic-table"> Basic Table </Link></li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item nav-category">Sample Pages</li>
          <li className={ this.isPathActive('/user-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><i className="mdi mdi-lock menu-icon"></i></span>
              <span className="menu-title"> User Pages </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1"> Login </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1"> Register </Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/error-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><i className="mdi mdi-security menu-icon"></i></span>
              <span className="menu-title"> Error pages </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404"> 404 </Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500"> 500 </Link></li>
              </ul>
            </Collapse>
    </li>*/}
    { /*
          <li className="nav-item documentation-link">
           <a className="nav-link" href="http://www.google.com">
              <span className="icon-bg">
                <i className="mdi mdi-file-document-box menu-icon"></i>
              </span>
              <span className="menu-title"> Entrepostos </span>
  </a>
          </li>*/}
          { /*
          <li className="nav-item sidebar-user-actions">
            <div className="user-details">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <div className="sidebar-profile-img">
                      <img src={require("../../assets/logo/_user_abel_pires.jpg")} alt="profile" style={{width: "45px" , borderRadius : "5rem", marginLeft: "-1rem", marginTop: "-0.5rem"}} />
                    </div>
                    <div className="sidebar-profile-text">
                      <p className="mb-1"> Abel Pires </p>
                    </div>
                  </div>
                </div>
                <div className="badge badge-danger">3</div>
              </div>
            </div>
          </li>
          */}
          <li className="nav-item sidebar-user-actions mt-5">
            <div className="sidebar-user-menu">
            <a href="/Risco"  className="nav-link" >{/*<i className="mdi mdi-speedometer menu-icon"></i>*/}
              
                <span className="menu-title"> Hist??rico  </span>
              </a>
            </div>
          </li>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
            <a href="!#" onClick={event => event.preventDefault()} className="nav-link"> {/*<i className="mdi mdi-settings menu-icon"></i>*/}
                <span className="menu-title">  Defini????es</span></a>
            </div>
          </li>
          {/*<li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-logout menu-icon"></i>
                <span className="menu-title"> Sair </span></a>
            </div>
        </li>*/}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);