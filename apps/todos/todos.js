// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create({
  store: SC.Store.create().from('Todos.DataSource')
});

Todos.test = MyCharts.NAMESPACE;

Todos.Todo = SC.Record.extend({
  title: SC.Record.attr(String),
  isDone: SC.Record.attr(Boolean, { defaultValue: false })
});

Todos.ALL_TODOS_QUERY = SC.Query.local(Todos.Todo);

Todos.DataSource = SC.DataSource.extend({
  fetch: function(store, query) {
    if (query === Todos.ALL_TODOS_QUERY) {
      SC.Request.getUrl('/data/todos').set('isJSON', YES).notify(this, this._didFetch, { query: query, store: store }).send();
    }
  },

  _didFetch: function(response, params) {
    var store = params.store;
    var query = params.query; 
    if (SC.ok(response)) {
      store.loadRecords(Todos.Todo, response.get('body'));
      store.dataSourceDidFetchQuery(query);
    } else {
      store.dataSourceDidErrorQuery(query, response);
    }
  }
});

Todos.CreateTodoView = SC.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');
 
    if (value) {
      Todos.todoListController.createTodo(value);
      this.set('value', '');
    }
  }
});

Todos.MarkDoneView = SC.Checkbox.extend({
  titleBinding: '.parentView.content.title',
  valueBinding: '.parentView.content.isDone'
});

Todos.StatsView = SC.TemplateView.extend({
  remainingBinding: 'Todos.todoListController.remaining',
 
  displayRemaining: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining')
});

Todos.todoListController = SC.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: [],

  title: function() {
    return 'A great title #%@'.fmt(this.get('remaining'));
  }.property('remaining'),

  // Creates a new todo with the passed title, then adds it
  // to the array.
  createTodo: function(title) {
    Todos.store.createRecord(Todos.Todo, { title: title });
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),
  
  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(function(todo) {todo.destroy()}, this);
  },
  
  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);
       return value;
    } else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});

SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
  
  var todos = Todos.store.find(Todos.ALL_TODOS_QUERY);
  Todos.todoListController.set('content', todos);
});
