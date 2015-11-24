import React from 'react';
import ModuleList from './ModuleList';
import LayoutContainer from './LayoutContainer';
import SaveButton from './SaveButton';
 
export default class EmailBuilder extends React.Component {

    // getInitialState in ES5
    constructor(props) {
        // Props is passed into the constructor in order to be used
        super(props);
        this.state = {
            data: props.initialModuleItems,
            layoutData: props.layoutData
        };
    }

    /*  ModuleList is responsible for managing the state (or data) of the modules
        LayoutContainer also need this state/data but that state wasn’t a direct 
        child of the ModuleList component
        A common Parent component manage the state and pass it down to its child
        components via props
     */

    // Function to re-define the layout by adding the new module in the layout
    // Called every time a user clicks on a module on the left column

    handleModuleSelection(moduleMarkup) {

        // Increase key to avoid two children with the same key
        var newKey = Number(moduleMarkup.key) + Math.round((Math.random()*100000000));

        // Modify moduleMarkup Object with the new key
        moduleMarkup.key = newKey.toString();

        var modulesInLayout = this.state.layoutData;

        var newModules = modulesInLayout.concat([moduleMarkup]);

        // Doesn't immediately mutate this.state but creates a pending state transition
        this.setState({
            layoutData: newModules
        });

    }

    render() {
        return (

            <div>

                <div className="items-container">
                    <h2 className="heading">Select a module</h2>
                    <ModuleList data={this.state.data} onModuleSelection={this.handleModuleSelection.bind(this)} />
                </div>

                <div className="email-container">
                    {/* <h2 className="heading">Layout</h2> */}
                    <LayoutContainer data={this.state.layoutData} />
                </div>

                <div className="button-container">
                    <SaveButton />
                </div>

            </div>

        );
    }
}

// Define initialModuleItems as an array
EmailBuilder.propTypes = {
    initialModuleItems: React.PropTypes.array,
    layoutData: React.PropTypes.array
};

// Data for the modules - to be moved in JSON file
EmailBuilder.defaultProps = {
    initialModuleItems: [
        {
            key: '1',
            title: 'Logo',
            html: '<img src=\"images/banner.jpg\" class=\"fit-width\" width=\"560\" height=\"315\" alt=\"Marmite\" style=\"display:block;\" border=\"0\" />', 
            default: false
        },
        {
            key: '2',
            title: 'Headline',
            html: '<h2>Join us to learn about Oaty Porridge</h2>',
            default: true
        },
        {
            key: '3',
            title: 'Text',
            html: '<font size="2">Autumn means lots of things: harvest, crunching leaves underfoot and, of course, chilly mornings. What better time for an Online Field Trip all about porridge?</font>',
            default: false
        }
    ],
    layoutData: []
};
