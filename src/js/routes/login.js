function login() {
    rootEl.innerHTML = templates.login();

    var form = document.getElementById('login-form');
    var { email, password } = form;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((value) => {
                firebase.database().ref(`users/${value.uid}`).once('value')
                    .then(() => {
                        page('/');
                    });
            }).catch((error) => {
                var errorMessage = error.message;
                var pass = /password/

                if(errorMessage.match(pass)){
                password.parentNode.classList.add('has-error');
                email.parentNode.classList.remove('has-error');
                email.nextElementSibling.innerText = '';
                password.nextElementSibling.innerText = errorMessage;}

                else {
                	password.parentNode.classList.remove('has-error');
      				email.parentNode.classList.add('has-error');
                	password.nextElementSibling.innerText = '';
                	email.nextElementSibling.innerText = errorMessage;

                }
            });
	   })

};