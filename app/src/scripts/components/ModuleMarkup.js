import React from 'react';
 
export default class ModuleMarkup extends React.Component {

    render() {

        return (

            <tr><td dangerouslySetInnerHTML={{__html: this.props.html}} /></tr>

        );
    }
}
