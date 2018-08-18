const errorTexts = {
  required: 'Field should be required',
  hasAtSymbol: 'Field should has @',
  password: 'Password should be at least six symbols',
  username: 'Username should contains only letters',
  displayName: 'Name should contains only letters',
  phoneNumber: 'Invalid phone number',
  empty: '',
  
  
};

const validators = {
  required: value => value.length !== 0,
  hasAtSymbol: value => value.indexOf('@') !== -1,
  password: value => value.length > 6,
  username: value =>  /\w+/.test(value),
  displayName: value =>  /\w+/.test(value),
  phoneNumber: value => /^\+380\d{3}\d{2}\d{2}\d{2}$/.test(value),
  empty: value => value
 
};



class FormField {
  constructor(element, options) {
    this.element = element;
    this.options = Object.assign({}, FormField.defaultOptions, options);
    this.errorText = [];
  }

  isValid() {
     for(var key in this.options.validations) {
      let validKey = this.options.validations[key];

     if(validators[validKey](this.element.value) === false) {
        this.errorText.push(errorTexts[validKey]);
        return false;
      }
    }

    return true;
   
  }

  resetState() {
    this.element.parentNode.classList.remove(this.options.errorClass);
    this.element.parentNode.classList.remove(this.options.successClass);
    this.element.nextElementSibling.innerText = '';
  }

  setErrorState(message) {
    this.element.parentNode.classList.add(this.options.errorClass);
    this.element.nextElementSibling.innerText = this.errorText;
  }

  setSuccessState() {
    this.element.parentNode.classList.add(this.options.successClass);
  }

  validate() {
     this.resetState();
        if(this.isValid() === true) {
             this.setSuccessState();
    } else {
          this.setErrorState();
    }
  }
}

FormField.defaultOptions = {
  validations: [],
  errorClass: 'has-error',
  successClass: 'has-success'
};


