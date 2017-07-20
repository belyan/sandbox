(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'developers': 'developers',
            'tasks': 'tasks',
            'task/:id': 'task',
            '*notFound': 'notFound'
        },
        index: function() {
            console.log('index');
        },
        developers: function() {
            console.log('developers');
        },
        tasks: function() {
            console.log('tasks');
        },
        task: function(id) {
            console.log('task ' + id);
        },
        notFound: function() {
            console.log('404');
        }
    });

    App.Models.Developer = Backbone.Model.extend({
        defaults: {
            job: 'Front-end developer'
        },

        validate: function(attrs) {
            if (attrs.age <= 0) {
                return 'Age can not be negative';
            }

            if (!attrs.name) {
                return 'You should set name of person';
            }
        },

        work: function() {
            return this.get('name') + ' is working';
        }
    });

    App.Views.Developer = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: template('developerTemplate'),
        initialize: function() {},
        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        }
    });

    App.Collections.Team = Backbone.Collection.extend({
        model: App.Models.Developer
    });

    App.Views.Team = Backbone.View.extend({
        tagName: 'ul',
        className: 'list',
        initialize: function() {},
        render: function() {
            this.collection.each(function(developer) {
                var developerView = new App.Views.Developer({
                    model: developer
                });

                this.$el.append(developerView.render().el);
            }, this);
            return this;
        }
    });

    App.Models.Task = Backbone.Model.extend({
        defaults: {
            priority: 1
        },
        validate: function(attrs) {
            if (!$.trim(attrs.title)) {
                return 'You should set title of task';
            }
        }
    });

    App.Views.Task = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: template('taskTemplate'),
        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },
        remove: function() {
            this.$el.remove();
        },
        events: {
            'click .edit': 'editTask',
            'click .delete': 'deleteTask'
        },
        editTask: function() {
            var newTitle = prompt('New title of task', this.model.get('title'));
            this.model.set('title', newTitle);
        },
        deleteTask: function() {
            this.model.destroy();
        }
    });

    App.Collections.TaskList = Backbone.Collection.extend({
        model: App.Models.Task
    });

    App.Views.TaskList = Backbone.View.extend({
        tagName: 'ul',
        className: 'list',
        initialize: function() {
            this.collection.on('add', this.addTask, this);
        },
        render: function() {
            this.collection.each(this.addTask, this);
            return this;
        },
        addTask: function(task) {
            var taskView = new App.Views.Task({
                model: task
            });

            this.$el.append(taskView.render().el);
        }
    });

    App.Views.AddTask = Backbone.View.extend({
        el: '#addTask',
        initialize: function() {
        },
        events: {
            'submit': 'submit'
        },
        submit: function(e) {
            e.preventDefault();

            var newTaskTitle = this.$el.find('input[type="text"]').val();
            var newTask = new App.Models.Task({ title: newTaskTitle });

            this.collection.add(newTask);
        }
    });

    /* Helpers */
    function template (id) {
        return _.template( $('#' + id).html() );
    }
})();