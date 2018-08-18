(function() {

  const icons = {
    twitter     : 'fa fa-twitter',
    facebook    : 'fa fa-facebook',
    vkontakte   : 'fa fa-vk',
    website     : 'fa fa-globe',
    publicEmail : 'fa fa-envelope-o',
    phoneNumber : 'fa fa-phone'
  };

  const socialLinkTemplates = {
    twitter     : (param) => `https://twitter.com/${param}`,
    facebook    : (param) => `https://www.facebook.com/${param}`,
    vkontakte   : (param) => `https://vk.com/${param}`,
    website     : (param) => param,
  };

  Handlebars.registerHelper('socialIconFor', (name) => {
    return icons[name] || '';
  });

  Handlebars.registerHelper('socialLinkFor', (name, value) => {
    const tpl = socialLinkTemplates[name];
    if (!tpl) return name;
    return tpl(value);
  });

  Handlebars.registerHelper('decamelize', (str) => {
    return str
      .split(/(?=[A-Z])/)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  });

  Handlebars.registerHelper('formatDate', (dateString) => {
    return moment(dateString).fromNow(true);
  });

  Handlebars.registerHelper('sortBy', ()=>{});

  Handlebars.registerHelper('ifCond', (v1, operator, v2, options) => {
    switch (operator) {
      case '==':
        // eslint-disable-next-line eqeqeq
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        // eslint-disable-next-line eqeqeq
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

} ());

var firebaseConfig = {
  	apiKey: "AIzaSyBcmmr1eJujHuDfhTnFL6kemlPU8v3ws9A",
    authDomain: "insta-1af26.firebaseapp.com",
    databaseURL: "https://insta-1af26.firebaseio.com",
    projectId: "insta-1af26",
    storageBucket: "insta-1af26.appspot.com",
    messagingSenderId: "671021297319"
};

const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

class Editor {
  constructor(el, props) {
    this.root             = el;
    this.props            = Object.assign({}, Editor.defaults, props);
    this.canvasContainer  = document.querySelector(this.props.canvasContainer, this.root);
    this.filtersContainer = document.querySelector(this.props.filtersContainer, this.root);
    this.fileInput        = document.querySelector(this.props.fileInput, this.root);
    this.triggerReset     = document.querySelector(this.props.triggerReset, this.root);
    this.triggerUpload    = document.querySelector(this.props.triggerUpload, this.root);
    this.progressBar      = document.querySelector(this.props.progressBar, this.root);
    this.caption          = document.querySelector(this.props.caption, this.root);
    this.file             = null;
    this.filter           = null;
    this._processing      = false;

    this.resetFilter       = this.resetFilter.bind(this);
    this.save              = this.save.bind(this);
    this._onFileChange     = this._onFileChange.bind(this);
    this._onFilterClick    = this._onFilterClick.bind(this);
    this._onUploadProgress = this._onUploadProgress.bind(this);

    this.triggerReset.style.display = 'none';

    this._bindEvents();
    console.log(this);
  }

  applyFilter(filter) {
    if (!(filter in this.caman)) {
      console.log(`There is no filter with name "${filter}"`);
      return;
    }

    if (this.filter === filter || this._processing) {
      return;
    }

    this._processing = true;
    this._toggleBusyState();
    this.caman.revert();
    this.caman[filter]();
    this.caman.render(() => {
      this._processing = false;
      this._toggleBusyState();
      this.filter = filter;
      this._highlightActiveFilter();
    });
  }

  resetFilter() {
    if (!this.filter) return;
    this.filter = null;
    this.caman && this.caman.revert();
    this._highlightActiveFilter();
    this.triggerReset.style.display = 'none';
  }

  // get caption and add it to the post as first comment
  _getComments() {
    const caption = this.caption.value.trim();

    if (!caption) return {};

    const { uid, username } = this.props.currentUser;
    const commentId = generateID('comment-');
    console.log(this.props.currentUser);

    return {
      [commentId]: {
        id: commentId,
        value: caption,
        author: username,
        authorId: uid,
        created: (new Date()).toISOString()
      }
    };
  }

  save() {
    const id          = generateID('post-');
    const user        = firebase.auth().currentUser;
    const dbPath      = `/posts/${id}`;
    const storagePath = `/pictures/${user.uid}/${id}.jpg`;
    const storageRef  = firebase.storage().ref(storagePath);
    const dbRef       = firebase.database().ref(dbPath);

    // show spinner and progress bar
    this._toggleBusyState();
    this._toggleUploadingState();

    // upload image to firebase as base64 encoded string
    const uploadTask = storageRef.putString(
      this.caman.toBase64('.jpg'),
      'data_url'
    );

    

    // show progress while uploading
    uploadTask.on('state_changed', this._onUploadProgress);

    uploadTask
      // create entry in firebase database after successfull upload
      .then(snapshot => {
        const { timeCreated, downloadURLs, fullPath } = snapshot.metadata;
        return dbRef.set({
          id,
          author: user.uid,
          created: timeCreated,
          url: downloadURLs[0],
          filterName: this.filter,
          storagePath: fullPath,
          dimensions: {
            width: this.caman.width,
            height: this.caman.height
          },
          comments: this._getComments()
        });
      })
      // hide spinner and progress bar
      .then(() => {
        this._toggleBusyState();
        this._toggleUploadingState();
        this.props.onSave();
      })
      // handle error while uploading or entry creation
      .catch(error => {
        console.log(error);
        this.props.onError(error);
      });
  }

  _bindEvents() {
    this.triggerReset.addEventListener('click', this.resetFilter);
    this.triggerUpload.addEventListener('click', this.save);
    this.fileInput.addEventListener('change', this._onFileChange);

    this.filtersContainer.addEventListener('click', (event) => {
      if (event.target.matches('[data-filter]')) {
        this._onFilterClick(event);
      }
    });
  }

  _onFileChange(e) {
    this.file = this.fileInput.files[0];
    this._initEditor();
  }

  _onFilterClick(e) {
    const target     = e.target;
    const { filter } = target.dataset;
    if (!filter) return;
    this.applyFilter(filter);
  }

  _onUploadProgress(snapshot) {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    this.progressBar.style.width = progress + '%';
  }

  _highlightActiveFilter() {
    const { activeClass } = this.props;
    const prevActive = document.querySelector('.is-active', this.filtersContainer);
    const nextActive = this.filter
      ? document.querySelector(`[data-filter="${this.filter}"]`, this.filtersContainer)
      : null;
    prevActive && prevActive.classList.remove(activeClass);
    nextActive && nextActive.classList.add(activeClass);
    this.triggerReset.style.display = '';
  }

  _toggleBusyState() {
    const { busyClass } = this.props;
    const isBusy   = this.root.classList.contains(busyClass);
    const triggers = [this.triggerReset, this.triggerUpload];
    const method   = isBusy ? 'removeAttribute' : 'setAttribute';

    this.root.classList.toggle(busyClass);
    triggers.forEach(el => el[method]('disabled', true));
  }

  _toggleUploadingState() {
    this.root.classList.toggle(this.props.uploadingClass);
  }

  _initEditor() {
    const { busyClass, hasImageClass, imageMaxSize } = this.props;
    const url    = URL.createObjectURL(this.file);
    const canvas = document.createElement('canvas');

    if (this.canvas) {
      this.canvas.parentNode.replaceChild(canvas, this.canvas);
    } else {
      this.canvasContainer.appendChild(canvas);
    }

    this.canvas = canvas;
    this._toggleBusyState();
    this.caman = Caman(this.canvas, url, (caman) => {
      const { originalWidth, originalHeight } = caman;
      const ratio  = originalWidth / originalHeight;
      const width  = originalWidth > imageMaxSize ? imageMaxSize : originalWidth;
      const height = Math.round(width / ratio);

      caman.resize({ width, height }).render();

      this._toggleBusyState();
      this.root.classList.add(hasImageClass);
    });
  }
}

Editor.defaults = {
  currentUser: {},
  activeClass: 'is-active',
  busyClass: 'is-busy',
  hasImageClass: 'has-image',
  uploadingClass: 'is-uploading',
  filtersContainer: '.editor__presets',
  canvasContainer: '.editor__canvas-container',
  triggerReset: '.editor__reset',
  triggerUpload: '.editor__upload',
  fileInput: 'input[type="file"]',
  progressBar: '.editor__progress .progress-bar',
  caption: '.editor__caption textarea',
  imageMaxSize: 1200,
  onSave: () => {},
  onError: () => {}
};

Editor.FILTERS = [
  'vintage',
  'lomo',
  'clarity',
  'sinCity',
  'sunrise',
  'crossProcess',
  'orangePeel',
  'love',
  'grungy',
  'jarques',
  'pinhole',
  'oldBoot',
  'glowingSun',
  'hazyDays',
  'herMajesty',
  'nostalgia',
  'hemingway',
  'concentrate'
];

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



class Post {
  /**
   * @param  {string|Object} post - Post id as string or already retrieved data of post
   * @return {void}
   */
  constructor(post, props = {}) {
    this.props       = Object.assign({}, Post.defaults, props);
    this.tpl         = Handlebars.partials.post;
    this.currentUser = this.props.currentUser;
    this.liked       = false; // is post liked by currentUser?

    this._onDataRetrieved = this._onDataRetrieved.bind(this);

    this._setupDomElement();
    this._setupDbRef(post);
  }

  render() {
    console.time('render');
    this.element.innerHTML = this.tpl(
      Object.assign({}, this.data, {
        author: this.author,
        currentUser: this.currentUser,
        liked: this.liked,
        likesCount: Object.keys((this.data && this.data.likes) || {}).length,
        isOwner: this.data.author === this.currentUser.uid
      })
    );
    console.log(this);
    console.timeEnd('render');
  }

  getElement() {
    return this.element;
  }

  _setupDomElement() {
    this.element = document.createElement('article');
    this.element.classList = 'post';
  }

  _fetchAutor() {
    firebase
      .database()
      .ref(`users/${this.data.author}`)
      .once('value', snapshot => {
        this.author = snapshot.val();
        this.render();
      });
  }

  _onDataRetrieved(snapshot) {
    this.data = snapshot.val();
    this.author || this._fetchAutor();
    this.element.setAttribute('data-post', this.data.id);
    this.liked = !!(this.data.likes && this.data.likes[this.currentUser.uid]);
    this.render();
    console.log('data retrived', this.data);
  }

  _onDataChanged(snapshot) {
    const key = snapshot.key;
    const value = snapshot.val();
    this.data[key] = value;
    this.render();
    console.log('data changed', key, value);
  }

  _setupDbRef(post) {
    const id = typeof post === 'string' ? post : post.id;
    this.dbRef = firebase.database().ref(`posts/${id}`);
    this.dbRef.on('value', this._onDataRetrieved);
  }
}

Post.defaults = {
  currentUser: {}
};

function add(ctx, next) {
  rootEl.innerHTML = templates.add({
    user: ctx.user,
    profile: ctx.user,
    filters: Editor.FILTERS
  });

  const editor = document.getElementById('editor');
  new Editor(editor, {
    currentUser: ctx.user,
    onSave: () => {
      page.redirect('/');
    }
  });
}

function errorPage() {
  rootEl.innerHTML = templates['404']();
}

function home(ctx) {
 // console.log(ctx);
  rootEl.innerHTML = templates.main({
    user: ctx.user,
    profile: ctx.user
  });

  if (!ctx.user) {
    return;
  }

  const feed  = document.getElementById('feed');
  const dbRef = firebase.database().ref();

  dbRef
    .child('posts')
    .limitToLast(10)
    .once('value', snapshot => {
      const entries = snapshot.val();
      if (!entries) return;
      Object.keys(entries).forEach((key) => {
        let entry = entries[key];
        const post = new Post(entry, { currentUser: ctx.user });
        feed.insertBefore(post.getElement(), feed.firstElementChild);
      })
    });

}

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
function logout(){
	firebase.auth().signOut()
		.then(()=>{
			page('/');
		})
}
function profile(ctx) {
    rootEl.innerHTML = templates['profile']({
  	user: ctx.user,
  	profile: ctx.user
  })

    let formEdit = document.getElementById('public-info');
    let pictureForm = document.getElementById('edit-profile');
    let profilePicture = document.querySelector('.profile__pic');

   // let { phoneNumber, about } = formEdit




    let user = firebase.auth().currentUser;
    let storageRef = firebase.storage().ref(`/avatar/${user.uid}/`);

    storageRef.getDownloadURL()
    	.then((url) =>{
    		profilePicture.style.backgroundImage = `url(${url})`
    	})


    pictureForm.addEventListener('click', (e)=>{
    	e.preventDefault()
    })


}
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



var rootEl = document.getElementById('root');

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage()

page('*', authMiddleware);
page('/', home);
page('/signup', signup);
page('/login', login);
page('/profile/edit', profileEdit);
page('/profile', profile);
page('/logout', logout)
page('/add', add);
page('*', errorPage);

function authMiddleware(ctx, next) {
  var user = firebase.auth().currentUser;

  if (user) {
    firebase.database().ref(`users/${user.uid}`)
      .once('value')
      .then((userInfo) => {
        ctx.user = ctx.profile = userInfo.val();
        next();
      });
  } else {
    ctx.user =ctx.profile = null;
    next();
  }
}

const unsubsribe = firebase.auth().onAuthStateChanged(() => {
  page();
  unsubsribe();
});











//# sourceMappingURL=app.js.map
