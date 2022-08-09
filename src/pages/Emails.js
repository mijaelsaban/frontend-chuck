import React, {Component} from "react";
import axios from "axios"
import InputEmail from "../components/InputEmail";

class Emails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emails: [],
            isLoaded: false,
            userName: '',
        }
    }

    async componentDidMount() {
        try {
            const token = localStorage.getItem("user_token");
            const userName = localStorage.getItem("user_name");
            this.setState({
               userName: userName
            });
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                await axios.get(
                    process.env.REACT_APP_BACKEND_BASE_URL + '/api/emails',
                    config
                ).then(response => {
                        console.log(response);
                        this.setState({isLoaded: true})
                    })
            }
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
                <h2>Welcome {this.state.userName.toUpperCase()} !</h2>
                <h2>Chuck Norris Mailer</h2>
                <InputEmail/>
                <div className="mt-5 card">
                    <div className="card-body">
                        <table className="table table-responsive">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>is Sent</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>mijael@ventury.com</td>
                                <td>mijael</td>
                                <td>sasdas</td>
                                <td>No</td>
                                <td>
                                    <span className="btn btn-secondary">Send</span>
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