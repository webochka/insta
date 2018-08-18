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