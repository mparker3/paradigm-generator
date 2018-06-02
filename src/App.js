import React, { Component } from 'react';
import { SPANISH_FORMS, SPANISH_MODES, SPANISH_FORMS_TO_WORDS, SPANISH_LANGUAGE_CODE }  from './Spanish';
import logo from './logo.svg';
import axios from 'axios';
import ParadigmsContainer from './ParadigmsContainer';
import './App.css';
import { doesNotReject } from 'assert';

const APERTIUM_API_URL = 'http://beta.apertium.org/apy/'

class App extends Component {

  constructor(props){
    super(props);

    this.state = { 
      translatedForms: [],
      conjugatedForms: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  getTranslatedForms() {
    console.log(SPANISH_FORMS);
    //console.log(this.state.inputvalue);
    var self = this;
    var queries = []
    var returnedForms = [];
    for (var i = 0; i < SPANISH_FORMS.length; i++) {
      var formQueries = []
      for (var j = 0; j < SPANISH_MODES.length; j++) {
          formQueries.push(this.state.inputvalue + "<vblex>" + SPANISH_FORMS[i] + SPANISH_MODES[j]);
        }
      queries.push([SPANISH_FORMS[i], formQueries]);
    }
    
    var counter = 0
    for (i = 0; i < queries.length; i++) {
      var subj = queries[i][0];
      var returnedFormsForForm = [];
      let promiseArray = queries[i][1].map(url => axios.get(APERTIUM_API_URL + 'generate?lang=' + SPANISH_LANGUAGE_CODE + '&q=' + url));
      axios.all(promiseArray).then(function(results){
        let temp = []
        temp = results.map(r => r.data[0][0]);
        returnedFormsForForm= temp;
      })
      .then(function(){
        returnedFormsForForm.push(SPANISH_FORMS_TO_WORDS[SPANISH_FORMS[counter]]);
        counter++;
        returnedForms.push([returnedFormsForForm]);
      })
      .then(function(){
        if (counter > queries.length - 1) {
          //console.log(returnedForms);
          self.setState({
            conjugatedForms: returnedForms
          })
        }
      });
    }
  }

  handleChange (event) {
    this.setState({
        inputvalue: event.target.value
    })
  }

  handleSubmit (event) {
    console.log('Form value: ' + this.state.inputvalue);
    this.getTranslatedForms();
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" title="Paradigm Generator">
          <h1 className="App-title">Enter your Spanish verb below for generated paradigms</h1>
        </header>
        <div className="Verb-selection">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
          </label>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form>
        <ParadigmsContainer translations={ this.state.conjugatedForms }/>
        </div>

      </div>
    );
  }
}

export default App;
