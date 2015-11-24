import React from 'react';
import ModuleItem from './ModuleItem';

export default class ModuleList extends React.Component {

    handleClickModule(index) {
        // console.log('click module ' + (index+1)  + ' - index ' + index);
        // console.log('markup ' +  this.props.data[index].html);

        // Callback sending the markup of the module selected to the parent component
        this.props.onModuleSelection(
            {
                key: this.props.data[index].key,
                title: this.props.data[index].title,
                html: this.props.data[index].html,
                default: this.props.data[index].default
            }
        );
    }

    render() {

        var moduleItems = this.props.data.map(function(item, i) {

            var boundClick = this.handleClickModule.bind(this, i);
            return (
                <ModuleItem onClick={boundClick} key={item.key} title={item.title} html={item.html} />
            );

        }, this);

        return (

            <ul>
                {moduleItems}
            </ul>

        );
    }
}
