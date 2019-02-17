import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// decorator that allows to inject in the constructor of a component
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosLimit = '?_limit=10';
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[]> {

    // returns an observable of Todos
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);

  }

  toggleCompleted(todo: Todo): Observable<any> {
    const completedUrl = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(completedUrl, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const deleteUrl = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(deleteUrl, httpOptions);
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
