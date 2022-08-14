import React, {Component} from "react";
import axios from "axios"
import InputEmail from "../components/InputEmail";
import TableHeader from "../components/TableHeader";


class Emails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emails: [],
            userName: '',
            isLoaded: false,
            showSuccess: false,
            sortingDesc: true,
            defaultColumns: [
                {name: 'id', sortDirection: false},
                {name: 'email', sortDirection: false},
                {name: 'name', sortDirection: 'desc'},
                {name: 'domain', sortDirection: false},
                {name: 'action', sortDirection: false}
            ]
        }
    }

    async componentDidMount() {
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
        this.setState({showSuccess: false})
    }

    handleFetch = () => {
        console.log('fetching data')
        const token = localStorage.getItem("user_token");
        if (token) {
            const config = {
                headers: {Authorization: `Bearer ${token}`}
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
            axios.put(
                process.env.REACT_APP_BACKEND_BASE_URL + '/api/emails/' + id,
                '',
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            ).then(response => {
                console.log(response)
            })
        }
    }

    handleSortDesc = (columnName) => {
        this.setState(prevState => ({
            defaultColumns: prevState.defaultColumns
                .map(function (each) {
                    if (columnName === each.name) {
                        if (each.sortDirection === 'desc') {
                            return {...each, sortDirection: 'asc'}
                        } else {
                            return {...each, sortDirection: 'desc'}
                        }
                    } else {
                        return {...each, sortDirection: false}
                    }
                })
        }))
    }

        render()
        {
            if (!this.state.isLoaded) {
                return (
                    <div></div>
                )
            }
            return (
                <div>
                    {this.state.showSuccess === true ?
                        <div className="float-end w-50 alert alert-success d-flex justify-content-between">
                            <div>Success</div>
                            <div className="icon-close-success" onClick={this.handleHideSuccess}>x</div>
                        </div>
                        : ''
                    }
                    <h2>Welcome {this.state.userName.toUpperCase()} !</h2>
                    <h2>Chuck Norris Mailer</h2>
                    <InputEmail
                        onFetch={this.handleFetch}
                        onShowSuccess={this.handleOnShowSuccess}
                    />
                    <div className="mt-5 card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    {
                                        this.state.defaultColumns.map((column) => (
                                            <TableHeader
                                                key={column.name}
                                                value={column.name}
                                                sortDirection={column.sortDirection}
                                                onHeaderClick={this.handleSortDesc}
                                            />
                                        ))
                                    }
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
                                            <td>
                                                <button onClick={() => this.handleSend(email.id)}
                                                        className="btn btn-secondary">
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

    export
    default
    Emails;