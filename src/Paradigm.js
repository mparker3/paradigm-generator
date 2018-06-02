import React, { Component } from 'react';

class Paradigm extends Component {

    render() {
        return(
            <div>
                <th>{this.props.conjugations[6]}</th>
                <table>
                    <tr>
                        <td>{this.props.conjugations[0]}</td>
                        <td>{this.props.conjugations[3]}</td>
                    </tr>
                    <tr>
                        <td>{this.props.conjugations[1]}</td>
                        <td>{this.props.conjugations[4]}</td>
                    </tr>
                    <tr>
                        <td>{this.props.conjugations[2]}</td>
                        <td>{this.props.conjugations[5]}</td>
                    </tr>
                </table>
            </div>
        );
    }

}

export default Paradigm;