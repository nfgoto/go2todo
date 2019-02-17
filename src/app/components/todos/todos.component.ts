import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  // use a tag with that name in the app html template to use the component
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  // inject the service in the component
  constructor(private todoService: TodoService) { }

  //  component is initialized
  ngOnInit() {
    // subscribe to the observable (async data stream) returned
    this.todoService
      .getTodos()
      .subscribe(
        todos => {
          this.todos = todos;
        }
      );
  }

  deleteTodo(todo: Todo) {
    //  delete in UI
    this.todos = this.todos.filter(t => t.id !== todo.id);

    // delete on server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService
      .addTodo(todo)
      .subscribe(
        returnedTodo => {
          // add to the UI
          this.todos.push(returnedTodo);
        }
      );



  }

}
