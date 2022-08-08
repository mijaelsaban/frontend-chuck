import React, { Component, useState } from "react";
import logo from './../logo.svg';
import axios from 'axios'


class Login extends Component
{
    state = {
      email: '',
      password: ''
    };

    handleInput = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_BACKEND_BASE_URL + '/login', this.state)
                .then(function (response) {
                    const status = response.status;
                    if (status === 200) {
                        localStorage.setItem('user_token', response.data.token)
                        localStorage.setItem('user_name', response.data.user.name)
                        console.log(response.data)
                        window.location = '/emails'
                    }
                });
        } catch (e) {
            console.log(e)
            if (e.code === "ERR_NETWORK") {
                alert('Error. Please Check your internet connection.')
            }
        }
    }

    render() {
        return (
            <div className="container py-5">
                <div className="text-center py-2">
                    <img src={logo} className="w-25" alt="logo"/>
                </div>
                <form onSubmit={this.handleLogin}>
                    <div className="form-outline mb-4">
                        <input onChange={this.handleInput} name='email' value={this.state.email} type="email" id="form2Example1" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={this.handleInput} name='password' value={this.state.password} type="password" id="form2Example2" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login