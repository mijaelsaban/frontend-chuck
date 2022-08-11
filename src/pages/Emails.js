import React, {Component} from "react";
import axios from "axios"
import InputEmail from "../components/InputEmail";
import login from "./Login";

class Emails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emails: [],
            userName: '',
            isLoaded: false,
            showSuccess: false,
        }
    }

    async componentDidMount () {
        try {
            const userName = localStorage.getItem("user_name");
            this.setState({
                userName: userName
            });
            await this.handleFetch()

        } catch (e) {
            console.log('error ' + e)
            //not authenticated
            window.location = '/'
        }
    }

    handleOnShowSuccess = () => {
        this.setState({showSuccess: true})
    }

    handleHideSuccess = () => {
        console.log('sdasdasd')
        this.setState({showSuccess: false})
    }

    handleFetch = () => {
        console.log('fetching data')
        const token = localStorage.getItem("user_token");
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.get(
                process.env.REACT_APP_BACKEND_BASE_URL + '/api/emails',
                config
            ).then(response => {
                this.setState({isLoaded: true})
                this.setState({emails: response.data})
                console.log(this.state.emails)
            })
        }
    }

    handleSend = (id) => {
        console.log(id)
        console.log('sending email')
        const token = localStorage.getItem("user_token");
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.post(
                process.env.REACT_APP_BACKEND_BASE_URL + '/api/messages/' + id,
                config
            ).then(response => {
                console.log(response)
            })
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
                { this.state.showSuccess === true ?
                    <div className="d-flex justify-content-between alert alert-success">
                        <div>Success</div>
                        <div className="icon-close-success" onClick={this.handleHideSuccess}>x</div>
                    </div>
                    : ''
                }
                <h2>Welcome {this.state.userName.toUpperCase()} !</h2>
                <h2>Chuck Norris Mailer</h2>
                <InputEmail onFetch={this.handleFetch} onShowSuccess={this.handleOnShowSuccess}/>
                <div className="mt-5 card">
                    <div className="card-body">
                        <table className="table-responsive">
                            <thead>
                            <tr>
                                <th>Email Id</th>
                                <th>Value</th>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.emails.data.map((email) => {
                                    return <tr key={email.id}>
                                        <td>{email.id}</td>
                                        <td>{email.value}</td>
                                        <td>{email.name}</td>
                                        <td>{email.domain}</td>
                                        <td>{email.created_at}</td>
                                        <td>
                                            <button onClick={ () => this.handleSend(email.id) } className="btn btn-secondary">
                                                Send
                                            </button>
                                        </td>
                                    </tr>

                                })
                            }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Emails;