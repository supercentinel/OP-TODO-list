export class Task {
  constructor(id, name, description, added, due, done) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.added = added;
    this.due = due;
    this.done = done;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getAdded() {
    return this.added;
  }

  getDue() {
    return this.due;
  }

  getDone() {
    return this.done;
  }

  setDone(done) {
    this.done = done;
  }
}
