import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // set dynamic HTML classes
  setClasses() {
    const classes = {
      // set classes to ve added
      'is-completed': this.todo.completed
    };

    return classes;
  }

  onToggle(todo: Todo) {
    //  toggle in UI
    this.todo.completed = !todo.completed;

    //  toggle on server
    this.todoService
      .toggleCompleted(todo)
      .subscribe(
        returnedTodo => {
          console.log(returnedTodo);
        }
      );
  }

  onDelete(todo: Todo) {
    // emit out upwards to the parent component
    this.deleteTodo.emit(todo);
  }
}
