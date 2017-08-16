var app = app || {};

app.TodoRouter = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function(param) {
        app.TodoFilter = param || '';
        app.todos.trigger('filter');
    }
});

app.router = new app.TodoRouter();
Backbone.history.start();

