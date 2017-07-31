var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.todoapp',

    statsTemplate: _.template( $('#stats-template').html() ),

    events: {
        'keypress .new-todo': 'createOnEnter',
        'click .clear-completed': 'clearCompleted',
        'click .toggle-all': 'toggleAllComplete'
    },

    initialize: function() {
        this.allCheckbox = this.$('.toggle-all')[0];
        this.$input = this.$('.new-todo');
        this.$footer = this.$('.footer');
        this.$main = this.$('.main');

        this.listenTo(app.todos, 'add', this.addOne);
        this.listenTo(app.todos, 'reset', this.addAll);
        this.listenTo(app.todos, 'change:completed', this.filterOne);
        this.listenTo(app.todos, 'filter', this.filterAll);
        this.listenTo(app.todos, 'all', this.render);

        app.todos.fetch();
    },

    render: function() {
        var completed = app.todos.completed().length;
        var remaining = app.todos.remaining().length;

        if (app.todos.length) {
            this.$main.show();
            this.$footer.show();
            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));
        } else {
            this.$main.hide();
            this.$footer.hide();
        }
    },

    addOne: function(todo) {
        var view = new app.TodoView({ model: todo });
        this.$('.todo-list').append(view.render().el);
    },

    addAll: function() {
        this.$('.todo-list').html('');
        app.todos.each(this.addOne, this);
    },

    newAttributes: function() {
        return {
            title: this.$input.val().trim(),
            order: app.todos.nextOrder(),
            completed: false
        };
    },

    createOnEnter: function(event) {
        if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
            return;
        }

        app.todos.create(this.newAttributes());
        this.$input.val('');
    }
});
