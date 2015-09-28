var Validator = {
    validate: function(person) {
        var is_valid = true;
        this.state.validate_errors = {};

        for (var fieldName in person) {
            if(this.validate_field[fieldName]) {
                if (this.validate_field[fieldName].regex && !this.validate_field[fieldName].regex.test(person[fieldName])) {
                    this.state.validate_errors[fieldName] = this.validate_field[fieldName].msg + " " + fieldName + ": " + this.validate_field[fieldName].regex.toString();
                    is_valid = false;
                }

                if (this.validate_field[fieldName].enum && this.validate_field[fieldName].enum.indexOf(person[fieldName])) {
                    this.state.validate_errors[fieldName] = this.validate_field[fieldName].msg + " " + fieldName + ": " + this.validate_field[fieldName].enum.toString();
                    is_valid = false;
                }
            }
        };

        this.setState({validate_errors: this.state.validate_errors});
        return is_valid;
    }
}