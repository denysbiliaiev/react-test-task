"use strict"
/** @jsx React.DOM */

var App = React.createClass({
    getInitialState: function() {
        return {
            persons: PersonApi.list(),
            err: {}
        };
    },

    personIsValid: function(person) {

    },

    savePerson: function(e) {
        e.preventDefault();
        var form = this.refs.personForm.refs.personData.getDOMNode();
        var person = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            phone: form.phone.value,
            gender: form.gender.value,
            age: form.age.value
        };

        if (!this.personIsValid(person)) {
            return;
        }

        var persons = PersonApi.save(person);
        this.setState({
           persons: PersonApi.list()
        });
    },

    render: function() {
        return (
            <div className="container">
              <PersonForm ref="personForm" savePerson={this.savePerson} />
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
                    <td><button className="btn btn-danger">delete</button></td>
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
                   <input type="submit" onClick={this.props.savePerson} value="add" className="btn btn-success"></input>
               </form>
           </div>
        )
    }
});

var TextInput = React.createClass({
    propsTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        err: React.PropTypes.string
    },

    render: function() {
        var wraperClass = "form-group";

        if (this.props.err && this.props.err.length >= 1) {
            wraperClass += " " + "has-error";
        }

        return (
            <div className={wraperClass}>
                <label for={this.props.name}  class="col-sm-2 control-label">{this.props.label}</label>
                <div className="field">
                    <input type="text"
                        name={this.props.name}
                        placeholder={this.props.label}
                        className="form-control input-small"/>
                </div>
            </div>
        )
    }
});


React.render(<App/>, document.getElementById('app'));



