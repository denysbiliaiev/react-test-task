var PersonValidator = {
    validate_field : {
        firstName: {
            regex: /^[a-z]{1,10}$/,
            msg: "not valid"
        },
        lastName: {
            regex: /^[a-z]{1,10}$/,
            msg: "not valid"
        },
        phone: {
            regex: /^\d{1,10}$/,
            msg: "not valid"
        },
        gender: {
            enum: ["man", "woomen"],
            msg: "not valid"
        },
        age: {
            regex: /^\d{1,2}$/,
            msg: "not valid"
        }
    },


   validate: function(person) {
        that = this;
        var is_valid = true;
        console.log(that.validate_field);
        this.state.validate_errors = {};



        for (var fieldName in person) {
            if(person_validate_field[fieldName]) {
                if (this.validate_field[fieldName].regex && !this.validate_field[fieldName].regex.test(person[fieldName])) {
                    this.state.validate_errors[fieldName] = this.validate_field[fieldName].msg + " " + fieldName + ": " + this.validate_field[fieldName].regex.toString();
                    is_valid = false;
                }

                if (this.validate_field[fieldName].enum && this.validate_field[fieldName].enum.indexOf(person[fieldName])) {
                    console.log(this.validate_field[fieldName].enum.indexOf(person[fieldName]));
                    this.state.validate_errors[fieldName] = this.validate_field[fieldName].msg + " " + fieldName + ": " + this.validate_field[fieldName].enum.toString();
                    is_valid = false;
                }
            }
        };

        this.setState({validate_errors: this.state.validate_errors});
        return is_valid;
    }
}