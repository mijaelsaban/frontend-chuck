import React, {Component} from "react";
import axios from "axios";
import he from 'he';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props)
        console.log((this.props.links[0].url && this.props.links[0].url.length > 0))
    }

    handlePagination = (url) => {
        this.props.onfetch(url);
    }

    render() {
        return (
            <div>
                <nav aria-label="...">
                    <ul className="pagination">
                        {
                            this.props.links.map((link) => {
                                return <li key={link.label} className={"page-item " + (!link.url ? 'disabled' : '')}>
                                    <a className={"cursor-pointer page-link " + (link.active ? 'active' : '')}
                                       onClick={ () => this.handlePagination(link.url) }>
                                        { he.decode(link.label) }
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Pagination;

