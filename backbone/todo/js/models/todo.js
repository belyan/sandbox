var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    toggle: function() {
        this.set({
            completed: !this.get('completed')
        });
    }
});
