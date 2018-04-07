var app = app || {};

app.HeroDetail = Backbone.View.extend({
    el: '.hero-details',

    template: _.template($('#hero-details-template').html()),

    events: {
        'input input': 'editHeroName'
    },

    initialize: function () {
        this.listenTo(this.model, 'change:name', this.updateHeroName);
        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            hero: this.model.toJSON()
        }));
    },

    editHeroName: function (event) {
        var input = event.target;
        this.model.set('name', input.value);
    },

    updateHeroName: function (model) {
        var name = model.get('name');
        this.$el.find('.name').html(name);
    }
});