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
