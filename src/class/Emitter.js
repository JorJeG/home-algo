class Emitter {
  constructor() {
    this.handlers = {};
  }

  /**
   * Подписка на событие
   * сложность O(1)
   * @param {string} event
   * @param {function} handler
   */
  on(event, handler) {
    if (!this.handlers[event]) {
      this.handlers[event] = new Set([handler]);
    } else {
      this.handlers[event].add(handler);
    }
  }

  /**
   * Отписка от событий, удаление события при отсутствии обработчика
   * сложность O(1)
   * @param {string} event
   * @param {function} handler
   */
  off(event, handler) {
    this.handlers[event].delete(handler);
    if (this.handlers[event].size === 0) {
      delete this.handlers[event];
    }
  }

  /**
   * Вызов события
   * сложность O(N), где N - количество обработчиков
   * @param {string} event
   */
  emit(event) {
    this.handlers[event].forEach(handler => handler());
  }
}

export default Emitter;

const handler = () => console.log(1);
const handler2 = () => console.log(2);

const myEmitter = new Emitter();

myEmitter.on('event', handler);
myEmitter.on('event', handler2);

myEmitter.emit('event');

myEmitter.off('event', handler);
myEmitter.off('event', handler2);
