function signup() {
  rootEl.innerHTML = templates.signup();

  var form = document.getElementById('signup-form');
  var { email, username, displayName, password, passwordConfirm } = form;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    
    let emailValidate = new FormField(email, {
      validations: ['required', 'hasAtSymbol']
    });

    let passwordValidate = new FormField(password, {
      validations: ['password']
    });

    let usernameValidate = new FormField(username, {
      validations: ['username']
    });

    let displayNameValidate = new FormField(displayName, {
      validations: ['displayName']
    });

   var arr = [emailValidate, passwordValidate, usernameValidate, displayNameValidate]

   for(key in arr) {
      arr[key].validate()
   }   
    
   function arrEvery(i, item, arr) {
     return arr[item].isValid()
    }

   
    if (arr.every(arrEvery)){
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((value) => {
        firebase.database().ref(`users/${value.uid}`).set({
          uid: value.uid,
          email: email.value,
          username: username.value,
          displayName: displayName.value,
          createdAt: (new Date()).toISOString()
        })
          .then(() => {
            page('/');
          });
      });

    }

  });

}


//

