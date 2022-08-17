import React, {Component} from "react";
import axios from "axios";
import he from 'he';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    handlePagination = (url) => {
        const pageNumber = url.split('?')
        this.props.onFetch(pageNumber[1]);
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

