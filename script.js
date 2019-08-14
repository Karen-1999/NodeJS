
validateForm = function (settings) {
    formId = settings.formId;
    formValidClass = settings.formValidClass;
    formInvalidClass = settings.formInvalidClass;
    inputErrorClass = settings.inputErrorClass;

    var form = document.getElementById(formId);

    var namesOfInputs = Array.from(document.querySelectorAll(
        '#' + formId + ' input'));

    validateAllElements = function(target = namesOfInputs) {
        // required
        var fl = true;
        var regEnRu = new RegExp('^[A-Za-zА-Яа-я]+$');
        var regNum = new RegExp('^[0-9]*$');
        target.forEach(function (input) {
            if(input.dataset.hasOwnProperty('required') && !input.value)
            {
                input.classList.add(inputErrorClass);
                fl = false;
                return;
            }
            // numbers
            if(input.dataset.validator === 'number')
            {
                var min = (input.dataset.hasOwnProperty('validatorMin'))?
                    parseInt(input.dataset.validatorMin) :
                    Number.MIN_VALUE;
                var max = (input.dataset.hasOwnProperty('validatorMax'))?
                    parseInt(input.dataset.validatorMax) :
                    Number.MAX_VALUE;
                var val = parseInt(input.value);
                if((val > max || val < min || !regNum.test(val)) && input.value) {
                    fl = false;
                    input.classList.add(inputErrorClass);
                    return;
                }
            }
            // letters
            // regexp
            if(input.dataset.validator === 'letters')
            {
                let val = input.value;
                if(!regEnRu.test(val))
                {
                    fl = false;
                    input.classList.add(inputErrorClass);
                    return;
                }
            }
            if(input.dataset.validator === 'regexp')
            {
                regexp = new RegExp(input.dataset.validatorPattern);
                let val = input.value;
                if(!regexp.test(val))
                {
                    fl = false;
                    input.classList.add(inputErrorClass);
                    return;
                }
            }
        });
        return fl;
    };

    inputBlurHandler = function (event) {
        var target = [];
        target.push(event.target);
        var passed = validateAllElements(target);
        if(!passed)
        {
            event.target.classList.add(inputErrorClass);
        }
    };

    inputFocusHandler = function (event) {
        event.target.classList.remove(inputErrorClass);
    };

    submitHandler = function(event) {
        event.preventDefault();
        form.classList.remove(formValidClass, formInvalidClass);

        if(validateAllElements())
        {
            form.classList.add(formValidClass);
        }
        else {
            form.classList.add(formInvalidClass);
        }
    };


    form.addEventListener('blur', (event) => {
        inputBlurHandler(event);
    },true);

    form.addEventListener('focus', (event)=> {
        inputFocusHandler(event);
    }, true);

    form.addEventListener('keypress', (event) => {

        if(event.code === 'Enter')
        {
            submitHandler(event);
        }
    });

    form.addEventListener('submit',  (event) => {
        submitHandler(event);
    });
};
