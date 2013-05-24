Pinchos = new Meteor.Collection("pinchos");

if (Meteor.isClient) {
  /**
   * Las columnas de la tabla de ranking
   */
  Template.pinchosRankingView.columns = ["Imagen", "Chef"];

  /**
   * El ranking (mostramos foto del pincho y nombre del chef),
   * está ordenado por puntos totales.
   */
  Template.pinchosRankingView.pinchosCollection = function() {
    return Pinchos.find({}, {sort: {points: -1}, fields: {photo: 1, chef: 1}});
  };


  Template.pinchosView.pinchosCollection = function() {
    return Pinchos.find();
  };

  Template.pinchoDetailedView.events({
    "click .btn-primary": function() {
      var sabor, originalidad, presentacion;

      sabor = +$( "#sabor").val();
      originalidad = +$( "#originalidad").val();
      presentacion = +$( "#presentacion").val();
      
      Pinchos.update({_id: this._id}, {$inc: {points: sabor + originalidad + presentacion}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
