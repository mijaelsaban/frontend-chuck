import React, {Component} from "react";
import axios from "axios";

class InputEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {
                email: ''
            }
        }
    }

    handleFetch = () => {
        this.props.onFetch();
    }

    handleInput = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            errors: {
                email: ''
            }
        })
        try {
            await this.storeEmail()
            this.setState({
                email: ''
            })
            this.handleFetch()
        } catch (e) {
            console.log(e)
            this.setState({errors: e.response.data.errors.email[0]});
            this.setState({
                errors: {
                    email: e.response.data.errors.email[0]
                }
            })
        }
    }

    async storeEmail () {
        const token = localStorage.getItem("user_token");
        if (token) {
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            await axios.post(
                process.env.REACT_APP_BACKEND_BASE_URL + '/api/emails',
                this.state,
                config
            ).then(function (response) {
                console.log('stored email')
            });
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
                                           className={"form-control " + (this.state.errors.email.length > 1 ? "border border-danger" : '') }/>
                                    <label className="form-label"
                                           htmlFor="form2Example1">
                                        Email address
                                    </label>
                                    <p className="text-danger">{this.state.errors.email}</p>

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

