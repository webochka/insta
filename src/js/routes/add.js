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
