interface Todo {
  id?: number,
  title: string,
  description: string,
  done: boolean,
  created?: Date,
  edited?: Date,
}

interface TodoJSON {
  id?: number,
  title: string,
  description: string,
  done: boolean,
  created?: string,
  edited?: string
}

class TodoModel implements Todo {
  public readonly id?: number;

  public title: string;

  public description: string;

  public done: boolean = false;

  public readonly created?: Date;

  public readonly edited?: Date;

  constructor(
    title: string,
    description: string,
    id?: number,
    created?: Date,
    edited?: Date,
    done: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
    this.created = created;
    this.edited = edited;
  }

  static FromObject({
    title,
    description,
    id,
    created,
    edited,
    done,
  }: Todo): TodoModel {
    return new this(
      title,
      description,
      id,
      created,
      edited,
      done,
    );
  }

  static FromJSON(json: TodoJSON): TodoModel {
    const created = json.created ? new Date(json.created) : undefined;
    const edited = json.edited ? new Date(json.edited) : undefined;
    return new this(
      json.title,
      json.description,
      json.id,
      created,
      edited,
      json.done,
    );
  }

  toJSON(): TodoJSON {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      done: this.done,
      created: this.created?.toISOString(),
      edited: this.edited?.toISOString(),
    };
  }
}

export type { Todo, TodoJSON };

export default TodoModel;
