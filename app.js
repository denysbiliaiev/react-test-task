"use strict"
/** @jsx React.DOM */

var App = React.createClass({
    getInitialState: function() {
        return PersonApi.list();
    },

    savePerson: function(e) {
        console.log(e);
    },

    render: function() {
        return (
            <div className="container">
              <PersonForm savePerson={this.savePerson} ref='person_form'/>
              <PersonsList persons={this.state.persons} />
            </div>
        )
    }
});

var PersonsList = React.createClass({
    render: function() {
        var list = this.props.persons.map(function(person, i) {
            return (
                <tr>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.phone}</td>
                    <td>{person.gender}</td>
                    <td>{person.age}</td>
                </tr>
            )
        });

        return (
            <div id="persons_list">
                <table className="table">
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Age</th>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        )
    }
});

var PersonForm = React.createClass({
    render: function() {
        return (
           <div id="person_form">
               <form className="personForm" ref="personData">
                   <TextInput
                       name = 'firstName'
                       label = 'First Name'
                   />
                   <TextInput
                       name = 'lastName'
                       label = 'Last Name'
                   />
                   <TextInput
                       name = 'phone'
                       label = 'Phone'
                   />
                   <TextInput
                       name = 'gender'
                       label = 'Gender'
                   />
                   <TextInput
                       name = 'age'
                       label = 'Age'
                   />
                   <input type="submit" onClick={this.props.savePerson(this)} value="add" className="btn btn-success"></input>
               </form>
           </div>
        )
    }
});

var TextInput = React.createClass({
    render: function() {
        return (
            <div>
                <label for={this.props.name}  class="col-sm-2 control-label">{this.props.label}</label>
                <input type="text" name={this.props.name} className="form-control input-small"></input>
            </div>
        )
    }
});


React.render(<App/>, document.getElementById('app'));



