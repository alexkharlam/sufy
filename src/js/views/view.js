export default class View {
  render(data, animate = false) {
    const hash = document.URL.split('#')[1];
    if (
      this._parentElement === document.querySelector('.notes') &&
      hash?.startsWith('cat')
    )
      return this.renderURL(data);
    const markup = this._createMarkup(data);
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
    if (this._parentElement === document.querySelector('.notes'))
      this._revealAnimation();
  }

  _revealAnimation() {
    setTimeout(() => {
      document.querySelectorAll('.note-preview').forEach(el => {
        el.style.transform = 'translateY(0%)';
        el.style.opacity = '1';
      });
    }, 50);
  }
  // render if url has hash with category id
  renderURL(data) {
    const id = document.URL.split('#')[1];
    if (id !== data.category[0]) return;

    const markup = this._createMarkup(data);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._revealAnimation();
  }
}
