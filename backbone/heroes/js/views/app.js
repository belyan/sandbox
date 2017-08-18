var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.app',

    template: _.template($('#app-template').html()),

    initialize: function () {
        this.title = 'Tour of Heroes';
        this.hero = new app.Hero({
            id: 1,
            name: 'Windstorm'
        });

        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            title: this.title,
            hero: this.hero.toJSON()
        }));
    }
});