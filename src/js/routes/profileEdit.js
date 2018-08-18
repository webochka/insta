function profileEdit(ctx) {
    rootEl.innerHTML = templates['profile-edit']({
        user: ctx.user,
        profile: ctx.user
    });

    let profileBody = document.getElementById('profile__body')
    let profilePicture = document.getElementById('profile-picture')

    new FormEditor(profile__body)
    new PictureEditor(profilePicture)

}

/*------------------------------------------------------------------------------*/

class FormEditor {
    constructor(el, props) {
        this.el = el;
        this.props = Object.assign({}, FormEditor.default, props);

        this.formEdit = document.getElementById(this.props.formEdit, this.el);
        this.form_delete = document.getElementById(this.props.form_delete, this.el);
        this.form_password = document.getElementById(this.props.form_password, this.el);

        this.passwordControl = this.form_password.passwordControl;
        this.newPassword = this.form_password.NewPassword;
        this.nameConfirm = this.form_delete.usernameConfirm;

        this.user = firebase.auth().currentUser;
        this.dbRef = firebase.database().ref(`users/${this.user.uid}`);

        this.readDb();
        this.events();

    }

    events() {
        this.formEdit.addEventListener('submit', (e) => {
            this.editPublicInfo(e)
        })

        this.form_delete.addEventListener('submit', (e) => {
            this.deleteProfile(e)
        })

        this.form_password.addEventListener('submit', (e) => {
            this.changePassword(e)
        })

    }

    editPublicInfo(e) {
        e.preventDefault()

        let data = {}

        for (let i = 0; i < this.formEdit.length; i++) {
            if (this.formEdit[i].value.length != 0) {
                let dataValidate = new FormField(this.formEdit[i], {
                    validations: [this.formEdit[i].getAttribute('data-validators')]
                });

                dataValidate.validate()

                if (dataValidate.isValid() === true) {
                    data[this.formEdit[i].name] = this.formEdit[i].value;
                }
            }
        }

        this.dbRef.update(data);
    }

    readDb() {
        this.dbRef.once('value')
            .then((snapshot) => {
                this.info = {
                    username: snapshot.val().username,
                    email: snapshot.val().email
                }
            })
    }

    changePassword(e) {
        e.preventDefault()

        firebase.auth().signInWithEmailAndPassword(this.info.email, this.passwordControl.value)
            .then(() => {
              this.newPassword.parentNode.classList.add('change_pasword')
              this.passwordControl.parentNode.classList.add('change_pasword--hidden')

              this.user.updatePassword(this.newPassword.value)
                  .then(() => {
                      page('/logout')
                  }).catch((error) => {
                      let errorMessage = error.message;
                      this.newPassword.parentNode.classList.add('has-error')
                      this.newPassword.nextElementSibling.innerText = errorMessage
                  })

          }).catch((error) => {
              this.passwordControl.parentNode.classList.add('has-error')
              this.passwordControl.nextElementSibling.innerText = 'Wrong password';
          })


    }

    deleteProfile(e) {
        e.preventDefault()
        if (this.nameConfirm.value == this.info.username) {
            this.user.delete()
                .then(() => {
                    page('/');
                })
        } else {
            this.nameConfirm.parentNode.classList.add('has-error');
            this.nameConfirm.nextElementSibling.innerText = 'wrong username';
        }
    }

}

FormEditor.default = {
    formEdit: 'public-info',
    form_delete: 'delete-profile',
    form_password: 'changePassword',


}

/*-----------------------------------------------------------------------------*/

class PictureEditor {
    constructor(el, props) {
        this.el = el;
        this.props = Object.assign({}, PictureEditor.defaults, props);

        this.fileInput = document.querySelector(this.props.fileInput, this.el);
        this.pic = document.querySelector(this.props.pic, this.el);
        this.actions = document.querySelector(this.props.actions, this.el);
        this.progress = document.querySelector(this.props.progress, this.el);
        this.progressBar = document.querySelector(this.props.progressBar, this.el);

        this.file = null;

        this.user = firebase.auth().currentUser;
        this.storageRef = firebase.storage().ref(`/avatar/${this.user.uid}/`);

        this.getPicture()
        this.events()
    }

    getPicture() {
        this.storageRef.getDownloadURL()
            .then((url) => {
                this.createBackgroundImage(url)
            })
    }

    createBackgroundImage(url) {
        this.pic.style.backgroundImage = `url(${url})`;
    }

    events() {
        this.actions.addEventListener('click', (e) => {
            this.actionsTarget(e)
        });

        this.fileInput.addEventListener('change', (e) => {
            this.createFile();
        });

    }

    createFile() {
        this.file = this.fileInput.files[0];
        let url = URL.createObjectURL(this.file);
        this.createBackgroundImage(url);
        this.actions.style.display = 'flex';
    }

    actionsTarget(e) {
        e.preventDefault()
        let target = e.target.getAttribute('data-action')

        if (target == 'save') {
            this.save()

        } else if (target == 'cancel') {
            this.cancel()

        }
    }

    save() {
        this.actions.style.display = 'none';
        this.progress.style.display = 'block';

        const uploadPicture = this.storageRef.put(this.file)
        uploadPicture.on('state_changed', (snapshot) => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            this.progressBar.style.width = progress + '%';
        });

        uploadPicture
            .then(() => {
                this.getPicture();
                this.progress.style.display = 'none';
            })
    };

    cancel() {
        this.getPicture()
        this.actions.style.display = 'none';
    };

}

PictureEditor.defaults = {
    fileInput: 'input[type="file"]',
    pic: '.profile-picture__picture',
    actions: '.profile-picture__actions',
    progress: '.progress',
    progressBar: '.progress-bar',

};