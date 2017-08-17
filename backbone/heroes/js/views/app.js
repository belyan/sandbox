var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.app',

    template: _.template('<h1><%= title %></h1><h2><%= hero %> details!</h2>'),

    initialize: function () {
        this.title = 'Tour of Heroes';
        this.hero = 'Windstorm';

        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            title: this.title,
            hero: this.hero
        }));
    }
});