import React, {Component} from "react";
import axios from "axios"
import InputEmail from "../components/InputEmail";
import TableHeader from "../components/TableHeader";
import Pagination from "../components/Pagination";

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
                {name: 'value', sortDirection: false},
                {name: 'name', sortDirection: 'desc'},
                {name: 'domain', sortDirection: false},
                {name: 'action', sortDirection: false}
            ],
            current_page: '',
            first_page_url: '',
            last_page: '',
            last_page_url: '',
            links: [],
            next_page_url: '',
            per_page: 0,
            total: 0,
            currentSort:''
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

    handleFetch = (pageNumber = 'page=1') => {
        console.log('fetching data')
        const token = localStorage.getItem("user_token");
        if (token) {
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            console.log(this.state.currentSort)
            axios.get(
                process.env.REACT_APP_BACKEND_BASE_URL +
                '/api/emails?' +
                pageNumber  +
                '&' +
                this.state.currentSort,
                config
            ).then(response => {
                this.setState({isLoaded: true})
                this.setState({emails: response.data})
                this.setState({links: response.data.links})
                // console.log(response.data)
            })
        } else {
            window.location = '/'
        }
    }

    handleLogOut = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_name');
        window.location = '/'
    }

    handleSend = (id) => {
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
                this.handleOnShowSuccess()
                console.log(response)
            })
        }
    }

    handleSortDesc = (columnName, pageNumber = 1) => {
        console.log(columnName, pageNumber);
        this.setState(prevState => ({
            defaultColumns: prevState.defaultColumns
                .map((each) => {
                    if (columnName === each.name) {
                        if (each.sortDirection === 'desc') {
                            // this.setState(prevState => ({currentSort: 'sort[' + columnName + ']=desc'}))
                            this.handleFetch('sort[' + columnName + ']=desc')
                            return {...each, sortDirection: 'asc'}
                        } else {
                            // this.setState(prevState => ({currentSort: 'sort[' + columnName + ']=desc'}))
                            this.handleFetch('sort[' + columnName + ']=asc')
                            return {...each, sortDirection: 'desc'}
                        }
                    } else {
                        return {...each, sortDirection: false}
                    }
                })
        }))
        console.log(this.state.defaultColumns)
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
                        <div className="alert alert-secondary position-fixed
                        z-50 d-flex justify-content-between w-50
                        alert-success-notification"
                             onClick={this.handleHideSuccess}>
                            <div>Success</div>
                            <span className="icon-close-success">x</span>
                        </div>
                        : ''
                    }
                    <div className="d-flex justify-content-between">
                        <h2>Welcome {this.state.userName.toUpperCase()} !</h2>
                        <h2>This is the Chuck Norris Mailer</h2>
                        <div className="">
                            <button onClick={this.handleLogOut} className="btn btn-primary">Log Out</button>
                        </div>
                    </div>

                    <InputEmail
                        onFetch={this.handleFetch}
                        onShowSuccess={this.handleOnShowSuccess}
                    />
                    <div className="mt-5 card">
                        <div className="card-body overflow-auto">
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
                            <div>
                                <Pagination
                                    links={ this.state.links }
                                    onFetch={ (page) => this.handleFetch(page) }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default Emails;