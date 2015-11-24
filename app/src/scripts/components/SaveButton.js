import React from 'react';
 
export default class SaveButton extends React.Component {

    handleSave() {
        // console.log('click save');
    }

    render() {
        return (

            <button className="save-btn" type="button" onClick={this.handleSave}>Save template</button>

        );
    }
}
