var app = app || {};

app.Hero = Backbone.Model.extend();

app.Heroes = Backbone.Collection.extend({
    model: app.Hero
});

app.AppView = Backbone.View.extend({
    el: '.app',

    template: _.template($('#app-template').html()),

    events: {
        'click .heroes li': 'onSelect',
    },

    initialize: function () {
        this.title = 'Tour of Heroes';
        this.heroes = new app.Heroes([
            { id: 11, name: 'Mr. Nice' },
            { id: 12, name: 'Narco' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' }
        ]);
        this.selectedHero = new app.Hero();
        this.listenTo(this.heroes, 'change:name', this.updateHeroName);

        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            title: this.title,
            heroes: this.heroes.toJSON(),
            selectedHero: this.selectedHero.toJSON()
        }));
        this.heroDetails = new app.HeroDetail({ model: this.selectedHero });
        this.$el.append(this.heroDetails.$el);
    },

    onSelect: function (event) {
        var id = $(event.currentTarget).data('id');
        this.selectedHero = this.heroes.get(id);
        this.render();
    },

    updateHeroName: function (model) {
        var name = model.get('name');
        this.$el.find('.selected .name').html(name);
    }
});
