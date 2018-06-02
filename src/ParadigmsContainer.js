import React, { Component } from 'react';
import Paradigm from './Paradigm'

class ParadigmsContainer extends Component {

    generateParadigms() {

        let paradigms = this.props.translations.map(
            translation => <Paradigm conjugations={translation[0]} />
        )
        console.log(paradigms);
        return paradigms;
    }
    render() {
        return (
          <div>
            { this.props.translations.length > 0 &&
                this.generateParadigms()
            }
          </div>
        );
      }
}

export default ParadigmsContainer;