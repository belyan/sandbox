(function($) {

    var app = {
        init: function() {
            app.addListeners();
        },

        addListeners: function() {
            $('form').on('submit', app.submitForm);
            $('form').on('keydown', 'input', app.hideError);
        },

        submitForm: function(e) {
            e.preventDefault();

            var form = $(this);

            if (app.validateForm(form) === false) return false;

            console.log(form.serialize());
        },

        validateForm: function(form) {
            var inputs = form.find('input'),
                valid = true;

            $.each(inputs, function(index, item) {
                var input = $(item),
                    value = input.val(),
                    formGroup = input.parents('.form-group'),
                    label = formGroup.find('label').text(),
                    textError = label + ' is required';


                if (value.length === 0) {
                    formGroup.removeClass('has-success').addClass('has-error');
                    input.tooltip({
                        trigger: 'manual',
                        placement: 'right',
                        title: textError
                    }).tooltip('show');

                    valid = false;
                } else {
                    input.tooltip('destroy');
                    formGroup.removeClass('has-error').addClass('has-success');
                }
            });

            return valid;
        },

        hideError: function() {
            $(this).tooltip('hide').parents('.form-group').removeClass('has-error');
        }
    };

    app.init();

})(jQuery);