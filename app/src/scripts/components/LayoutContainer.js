import React from 'react';
import ModuleMarkup from './ModuleMarkup';
 
export default class LayoutContainer extends React.Component {

    render() {

        var modulesMarkup = this.props.data.map(function(item, i) {
            return (
                <ModuleMarkup key={item.key} title={item.title} html={item.html} default={item.default} />
            );
        }, this);

        return (

            <div className="layout">

                <table width="100%" border="0" cellSpacing="0" cellPadding="0" align="center" bgcolor="#ffffff">
                    <tbody>
                        <tr>
                            <td align="center" bgcolor="#ffffff">
                                <table width="600" border="0" cellSpacing="0" cellPadding="0" align="center" className="fit-width">
                                    <tbody>
                                        <tr>

                                            {/* Left gutter */}
                                            <td width="20" className="mobile-gutter"></td>
                                            {/* // Left gutter */}

                                            {/* Content */}
                                            <td width="560" className="fit-width-block">

                                                {/* Header */}
                                                <table width="560" border="0" cellSpacing="0" cellPadding="0" align="center" className="fit-width">
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="2" height="20"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <a href="http://eatHappyProject.com" target="_blank">
                                                                    <img src="images/logo.png" width="98" height="55" alt="Tesco Eat Happy Project" border="0" />
                                                                </a>
                                                            </td>
                                                            <td align="right" valign="middle">
                                                                <font size="2">
                                                                    <a href="http://$CANTREAD$" target="_blank">View this email online</a>
                                                                </font>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2">
                                                                <img src="images/eatHappyVectors.png" className="fit-width" width="287" height="60" alt="" border="0" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" height="20"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {/* // Header */}

                                                {/* Full width article */}
                                                <table width="560" border="0" cellSpacing="0" cellPadding="0" align="center" className="fit-width">
                                                    <tbody>
                                                        {modulesMarkup}
                                                    </tbody>
                                                </table>
                                                {/* // Full width article */}

                                            </td>
                                            {/* // Content */}
                                            
                                            {/* Right gutter */}
                                            <td width="20" className="mobile-gutter"></td>
                                            {/* // Right gutter */}

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}
