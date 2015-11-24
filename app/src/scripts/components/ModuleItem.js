import React from 'react';
 
export default class ModuleItem extends React.Component {

    render() {
        return (

            <li className="list-item">
                <div className="item-container" onClick={this.props.onClick}>
                    {this.props.title}
                </div>
            </li>

        );
    }
}
