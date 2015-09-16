var PersonApi = {

  data: {
    "persons": [
      {"firstName": "vasya", "lastName": "rebzia", "phone": "094575757", "gender": "m", "age": "10"},
      {"firstName": "vasya1", "lastName": "rebzia1", "phone": "194575757", "gender": "g", "age": "7"}
    ]
  },

  list: function() {
    return this.data.persons;
  },

  save: function(person) {
    this.data.persons.push(person);
    return this.data.persons;
  }
};