import Node from "./Node";

export default class LinkedList {
  private head: Node<any> | null = null;
  private size = 0;

  insertAtBegin<T>(data: T): Node<T> {
    this.size++;
    if (!this.head) {
      this.head = new Node(data, this.head);
      return this.head;
    } else {
      const node = new Node(data, this.head);

      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      return node;
    }
  }

  private getLastNode<T>(node: Node<T>): Node<T> {
    if (!node?.next) {
      return node;
    }

    return this.getLastNode(node.next);
  }
  insertAtEnd<T>(data: T): Node<T> {
    if (!this.head) {
      this.head = new Node(data, this.head);
      return this.head;
    } else {
      let node = new Node(data);
      let lastNode = this.getLastNode(this.head);

      node!.prev = lastNode;
      lastNode!.next = node;
      return node;
    }
  }

  insertAtIndex<T>(data: T, index: number): Node<T> {
    let indexCounter = 0;

    let node = new Node(data);

    if (!this.head || !index) {
      this.head = node;
      return node;
    }

    if (this.size < index) {
      let lastNode = this.getLastNode(this.head);
      lastNode.next = new Node(data, null, lastNode);

      return new Node(data, null, lastNode);
    }

    let current: Node<T> | null = this.head.next;

    if (!current) {
      this.head.next = node;
      return node;
    }

    while (current && index !== indexCounter) {
      indexCounter += 1;
      if (index !== indexCounter) {
        current = current.next;
      }
    }

    node.next = current?.next || null;
    node.prev = current;

    if (!current?.next) {
      current!.next = new Node(data);
      return new Node(data);
    } else {
      current!.next!.prev = node;
    }
    current!.next = node;

    return node;
  }

  getAllData() {
    let current = this.head;
    const arr: any[] = [];
    while (current) {
      arr.push(current.data);
      current = current.next;
    }

    return arr;
  }

  deleteNode<T>(node: Node<T>) {
    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode) {
      prevNode.next = node.next || null;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    }

    this.size = this.size > 0 ? this.size - 1 : 0;
  }

  getSize() {
    return this.size;
  }

  getNodeAtIndex(index: number) {
    let current = this.head;
    let currentIndex = 0;
    while (currentIndex !== index && current) {
      if (currentIndex !== index) {
        current = current?.next || null;
      }

      currentIndex += 1;
    }
    return current;
  }
}
