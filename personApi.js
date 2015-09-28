var PersonApi = {

  data: {
    persons: [
      {age: "2", firstName: "z", gender: "man", lastName: "b", phone: "113"},
      {age: "5", firstName: "c", gender: "man", lastName: "c", phone: "114"},
      {age: "3", firstName: "a", gender: "man", lastName: "b", phone: "113"},
      {age: "7", firstName: "b", gender: "man", lastName: "z", phone: "117"}
    ],
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