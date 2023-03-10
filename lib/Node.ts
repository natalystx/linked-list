export default class Node<T> {
  data: T | null;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(data?: T | null, next?: Node<T> | null, prev?: Node<T>) {
    this.next = next || null;
    this.prev = prev || null;
    this.data = data || null;
  }
}
