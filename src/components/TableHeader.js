import React, {Component} from "react";

class TableHeader extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('th', this.props)
    }

    onHeaderClick = () => {
        this.props.onHeaderClick(this.props.value, this.props.sortDirection);
    }

    render() {
        return (
            <th onClick={this.onHeaderClick}>
                {this.props.value}
                    <span className="icons-ml">
                        {
                            this.props.sortDirection === false ? '' :
                            this.props.sortDirection === 'desc' ? <i className="bi-chevron-down"></i>
                                : <i className="bi-chevron-up"></i>
                        }

                    </span>
            </th>
        );
    }
}

export default TableHeader;