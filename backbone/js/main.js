var Developer = Backbone.Model.extend({
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

var DeveloperView = Backbone.View.extend({
    tagName: 'li',
    className: 'item',
    template: _.template('<strong><%= name %></strong> (<%= age %>) - <%= job %>'),
    initialize: function() {},
    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    }
});

var DeveloperCollection = Backbone.Collection.extend({
    model: Developer
});

var DeveloperCollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',
    initialize: function() {},
    render: function() {
        this.collection.each(function(developer) {
            var developerView = new DeveloperView({
                model: developer
            });

            this.$el.append(developerView.render().el);
        }, this);
        return this;
    }
});

var developers = new DeveloperCollection([
    { name: 'Nikolay', age: 27 },
    { name: 'Dima', age: 23 },
    { name: 'Zar', age: 25 }
]);

var developersView = new DeveloperCollectionView({
    collection: developers
});

console.log(developersView.el);
$(document.body).append(developersView.render().el);
