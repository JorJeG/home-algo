const { expect } = require('chai');
const Emitter = require('../src/class/Emitter');

describe('Тестирование генератора событий', () => {
  let emitter;
  let handler;
  const array = [];

  beforeEach(() => {
    emitter = new Emitter();
    handler = () => array.push(1);
  });

  afterEach(() => {
    emitter = undefined;
    array.length = 0;
  });

  it('Подписывается на события', () => {
    emitter.on('event', handler);
    const event = Object.prototype.hasOwnProperty.call(emitter.handlers, 'event');
    expect(event).to.true;
  });

  it('Отписывается от события', () => {
    emitter.on('event', handler);
    emitter.off('event', handler);
    expect(emitter.handlers).to.empty;
  });

  it('Вызывает события', () => {
    emitter.on('event', handler);
    emitter.emit('event');
    expect(array).to.deep.equal([1]);
  });
});
