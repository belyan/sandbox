var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.app',

    template: _.template($('#app-template').html()),

    events: {
        'input input.heroName': 'editHeroName'
    },

    initialize: function () {
        this.title = 'Tour of Heroes';
        this.hero = new app.Hero({
            id: 1,
            name: 'Windstorm'
        });

        this.listenTo(this.hero, 'change:name', this.updateHeroName);
        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            title: this.title,
            hero: this.hero.toJSON()
        }));
    },

    editHeroName: function (event) {
        var input = event.target;
        this.hero.set('name', input.value);
    },

    updateHeroName: function (model) {
        var name = model.get('name');
        this.$el.find('span.heroName').html(name);
    }
});