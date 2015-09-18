"use strict"
/** @jsx React.DOM */

var App = React.createClass({
    getInitialState: function() {
        return {
            persons: PersonApi.list(),
            validate_errors: {}
        };
    },

    deletePerson: function(index) {
        var persons = this.state.persons.filter(function(person, i) {
            return index !== i;
        });

        this.setState({
            persons: persons
        });

        PersonApi.delete(index);
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
        PersonValidator.validate.call(this, person);
        if (!PersonValidator.validate.bind(this, person)) {
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
              <PersonForm ref="personForm" validate_errors={this.state.validate_errors} savePerson={this.savePerson} />
              <PersonsList persons={this.state.persons} deletePerson={this.deletePerson} />
            </div>
        )
    }
});

var PersonsList = React.createClass({
    render: function() {
        var list = this.props.persons.map(function(person, i) {
            return (
                <Person key={i} person={person} ref={"item" + i} deletePerson={this.props.deletePerson.bind(this, i)}/>
            )
        }, this);

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

var Person = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.person.firstName}</td>
                <td>{this.props.person.lastName}</td>
                <td>{this.props.person.phone}</td>
                <td>{this.props.person.gender}</td>
                <td>{this.props.person.age}</td>
                <td><button onClick={this.props.deletePerson} className="btn btn-danger">delete</button></td>
            </tr>
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
                       validate_error = {this.props.validate_errors.firstName}
                   />
                   <TextInput
                       name = 'lastName'
                       label = 'Last Name'
                       validate_error = {this.props.validate_errors.lastName}
                   />
                   <TextInput
                       name = 'phone'
                       label = 'Phone'
                       validate_error = {this.props.validate_errors.phone}
                   />
                   <TextInput
                       name = 'gender'
                       label = 'Gender'
                       validate_error = {this.props.validate_errors.gender}
                   />
                   <TextInput
                       name = 'age'
                       label = 'Age'
                       validate_error = {this.props.validate_errors.age}
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
                    <div>{this.props.validate_error}</div>
                </div>
            </div>
        )
    }
});


React.render(<App/>, document.getElementById('app'));



