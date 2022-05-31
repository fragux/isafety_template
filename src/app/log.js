import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        email: "",
        password: "",
        errors: [],
      };
           
     
}

hasError(key) {
  return this.state.errors.indexOf(key) !== -1;
}

 login = async form => {
  const{email, password} = this.state;
  try {
    let response = await fetch('http://127.0.0.1:3000/login', { 
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'email': email,
          'password': password, 
      })
  });
  let json = await response.json();



} catch(e){
  console.log("Error to Authenticate: " + e);
}
}

togglePasswordVisiblity = () => {
  const { isPasswordShown } = this.state;
  this.setState({ isPasswordShown: !isPasswordShown });
};
  render() {
    const { isPasswordShown } = this.state;
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-center py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../assets/logo/Logo_cores.png")} alt="logo" />
                </div>
               
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Utilizador" size="lg"   name="email"
                                                
                                                onChange={this.handleInputChange}
                                                 className={this.hasError("email")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                            } />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control  
                                                onChange={this.handleInputChange}
                                                className={
                                                        this.hasError("password")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                } 
                                                name="password"
                                                type={isPasswordShown ? "text" : "password"}
                                                placeholder="Palavra-passe" />
                  </Form.Group>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">LOGIN</Link>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    
                  </div>
                
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login