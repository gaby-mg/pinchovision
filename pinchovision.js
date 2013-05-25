Pinchos = new Meteor.Collection("pinchos");

if (Meteor.isClient) {
  
  /**
   * El ranking, por puntos.
   */
  Template.ranking.pinchos = function() {
    return Pinchos.find({}, {sort: {score: -1, chef: 1}});
  };

  /**
   * El carrousel de Pinchos
   */
  Template.carousel.pinchos = function() {
    return Pinchos.find();
  };

  Template.pinchoDetailedView.events({
    "click .btn-primary": function() {
      var sabor, originalidad, presentacion;

      sabor = +$( "#sabor").val();
      originalidad = +$( "#originalidad").val();
      presentacion = +$( "#presentacion").val();

      Pinchos.update({_id: this._id}, {$inc: {score: sabor + originalidad + presentacion}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Pinchos.find().count() === 0) {
      var names = ["Adri",
                   "Keka",
                   "Diego",
                   "Natalia",
                   "Gaby",
                   "Alejandra"];
      for (var i = 0; i < names.length; i++)
        Pinchos.insert({chef: names[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}
