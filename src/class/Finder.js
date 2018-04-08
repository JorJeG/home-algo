class Finder {
  constructor(inputEl, outputEl, data) {
    this.inputEl = inputEl;
    this.outputEl = outputEl;
    this.data = data.map(el => el.toLowerCase());
    this.output = new Set();
    this.suggest = this.suggest.bind(this);
  }

  init() {
    this.inputEl.addEventListener('input', (e) => {
      const { target: { value } } = e;
      if (value !== '') {
        this.render(this.suggest(value));
      } else {
        this.output.clear();
        this.render('');
      }
    });
  }

  /**
   * Ищет улицы
   * сложность в худшем случае O(N * M), где N - число улиц в массиве, M - число букв в слове
   * @param {string} input
   * @returns {Array}
   */
  suggest(input) {
    const { length } = this.data;
    const formatedInput = input.toLocaleLowerCase();

    this.output.forEach((el) => {
      const isOk = el.includes(formatedInput);
      if (!isOk) {
        this.output.delete(el);
      }
    });

    for (let i = 0; i < length; i += 1) {
      const isOk = this.data[i].includes(formatedInput);
      const isFull = this.output.size >= 10;
      if (isOk && !isFull) {
        this.output.add(this.data[i]);
      } else if (isFull) {
        break;
      }
    }
    return [...this.output.entries()];
  }

  render(streets) {
    this.outputEl.textContent = streets;
  }
}

export default Finder;
