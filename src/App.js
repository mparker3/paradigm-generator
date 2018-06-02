import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Q from 'q';
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
    //console.log('got forms: hablo, hablas, habla');
    //console.log(this.state.inputvalue);
    var self = this;
    var queries = []
    var forms = ["<pri>", "<imp>"]
    var modes = ["<p1><sg>", "<p2><sg>", "<p3><sg>", "<p1><pl>", "<p2><pl>", "<p3><pl>"]
    var returnedForms = [];
    for (var i = 0; i < forms.length; i++) {
      var formQueries = []
      for (var j = 0; j < modes.length; j++) {
          formQueries.push(this.state.inputvalue + "<vblex>" + forms[i] + modes[j]);
        }
      queries.push([forms[i], formQueries]);
    }
    
    var counter = 0
    for (i = 0; i < queries.length; i++) {
      var subj = queries[i][0];
      var returnedFormsForForm = [];
      let promiseArray = queries[i][1].map(url => axios.get(APERTIUM_API_URL + 'generate?lang=spa&q=' + url));
      axios.all(promiseArray).then(function(results){
        let temp = []
        temp = results.map(r => r.data[0][0]);
        returnedFormsForForm= temp;
      })
      .then(function(){
        returnedFormsForForm.push(forms[counter]);
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
          <h1 className="App-title">Enter your verb below for generated paradigms</h1>
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
