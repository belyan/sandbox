var app = app || {};

app.HeroesView = Backbone.View.extend({
    el: '.heroes',

    events: {
        'click li': 'onSelect',
    },

    initialize: function (heroes) {
        this.collection = new app.Heroes(heroes);
        this.selectedHero = this.collection.get(15);
        this.render();
    },
    
    render: function () {
        this.collection.each(function (hero) {
            if (hero === this.selectedHero) hero.set('selected', true);
            var heroView = new app.HeroView({ model: hero });
            this.$el.append( heroView.render().el );
        }, this);
    },

    onSelect: function (event) {
        //var id = $(event.currentTarget).data('id');
        //this.selectedHero = this.heroes.get(id);
        console.log($(event.currentTarget).model);
        //this.render();
    }
});