import React, { Component, useState } from "react";
import logo from './../logo.svg';
import axios from 'axios'
import {Link} from "react-router-dom";

class Register extends Component
{
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
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
            await axios.post(process.env.REACT_APP_BACKEND_BASE_URL + '/register', this.state)
                .then(function (response) {
                    const status = response.status;
                    if (status === 200) {
                        localStorage.setItem('user_token', response.data.token)
                        localStorage.setItem('user_name', response.data.user.name)
                        window.location = '/emails'
                    }
                });
        } catch (e) {
            console.log(e)
            if (e.code === "ERR_NETWORK") {
                alert('Error. Please Check your internet connection.')
            }

            if (e.code === "ERR_BAD_RESPONSE") {
                alert('Error. Please Check your database connection.')
            }
        }
    }

    render() {
        return (
            <div className="container py-5">
                <div className="text-center py-2">
                    <h1>Register</h1>
                    <img src={logo} className="w-25 App-logo" alt="logo"/>
                </div>
                <form onSubmit={this.handleLogin}>
                    <div className="form-outline mb-4">
                        <input onChange={this.handleInput} name='name' value={this.state.name} type="text" id="name" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example1">Name</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={this.handleInput} name='email' value={this.state.email} type="email" id="email" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={this.handleInput} name='password' value={this.state.password} type="password" id="password" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={this.handleInput} name='password_confirmation' value={this.state.password_confirmation} type="password" id="password_confirmation" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example2">Password Confirmation</label>
                    </div>

                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                        </div>
                    </div>

                    <div className="text-center">
                        <p>Are you a member? <Link to={"/"}>Login</Link></p>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                </form>
            </div>
        );
    }
}

export default Register