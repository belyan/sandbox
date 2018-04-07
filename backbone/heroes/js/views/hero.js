var app = app || {};

app.HeroView = Backbone.View.extend({
    template: _.template( $('#heroTemplate').html() ),

    render: function () {
        this.$el.html( this.template({
            hero: this.model.toJSON()
        }) );
        return this;
    }
});