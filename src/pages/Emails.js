import React, {Component} from "react";
import axios from "axios"

class Emails extends Component {
    state = {
        email: '',
        emails: [],
        isLoaded: false
    }

    handleInput = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    async componentDidMount() {
        try {
            await axios.get(process.env.REACT_APP_BACKEND_BASE_URL + '/api/emails')
                .then(function (response) {
                    this.setState.emails = response.data.emails
                })
        } catch (e) {
            console.log(e)
            //not authenticated
            window.location = '/'
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div></div>
            )
        }
        return (
            <div>
                <h2>Chuck Norris Mailer</h2>
                <div className="card mt-5">
                    <div className="card-body">
                        <div className="card-title">Add an email to the list.</div>
                        <div>
                            <div className="form-outline mb-4">
                                <input onChange={this.handleInput} name='email' value={this.state.email} type="email"
                                       id="form2Example1" className="form-control"/>
                                <label className="form-label" htmlFor="form2Example1">Email address</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 card">
                    <div className="card-body">
                        <table className="table table-responsive">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>mijael@ventury.com</td>
                                <td>mijael</td>
                                <td>sasdas</td>
                                <td>
                                    <span className="btn btn-primary">Send</span>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Emails;