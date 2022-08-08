import React, {Component} from "react";
import axios from "axios";

class InputEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: []
        }
    }

    handleInput = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("user_token");
            if (token) {
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                }
                await axios.post(
                    process.env.REACT_APP_BACKEND_BASE_URL + '/api/emails',
                    this.state,
                    config
                )
                    .then(function (response) {
                        const status = response.status;
                        if (status === 200) {
                            console.log(response.data.errors)
                        }
                    });
            }
        } catch (e) {
            console.log(e.response.data.errors)
            this.setState({errors: e.response.data.errors});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="card mt-5">
                        <div className="card-body">
                            <div className="card-title">Add an email to the list.</div>
                            <div>
                                <div className="form-outline mb-4">
                                    <input onChange={this.handleInput}
                                           name='email'
                                           value={this.state.email}
                                           type="email"
                                           id="form2Example1"
                                           className="form-control"/>
                                    <label className="form-label"
                                           htmlFor="form2Example1">
                                        Email address
                                    </label>

                                    <div className="invalid-feedback">
                                        Please input an email.
                                    </div>


                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary text-right">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default InputEmail;

