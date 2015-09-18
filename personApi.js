var PersonApi = {

  data: {
    "persons": []
  },

  list: function() {
    return this.data.persons;
  },

  save: function(person) {
    this.data.persons.push(person);
    return this.data.persons;
  },

  delete: function(index) {
    this.data.persons.splice(index, 1);
  }
};