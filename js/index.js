var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var todos = function todos() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'ADD_TODO':
			return [].concat(_toConsumableArray(state), [{
				id: action.id,
				text: action.text,
				completed: false
			}]);
		case 'TOGGLE_TODO':
			return state.map(function (todo) {
				if (todo.id !== action.id) {
					return todo;
				}
				return _extends({}, todo, {
					completed: !todo.completed
				});
			});
		default:
			return state;
	}
};

var visibilityFilter = function visibilityFilter() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SHOW_ALL';
	var action = arguments[1];

	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

var _Redux = Redux,
    combineReducers = _Redux.combineReducers;

var todoApp = combineReducers({
	todos: todos,
	visibilityFilter: visibilityFilter
});

var _Redux2 = Redux,
    createStore = _Redux2.createStore;

var store = createStore(todoApp);
var _React = React,
    Component = _React.Component;

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Todo = function Todo(_ref) {
	var onClick = _ref.onClick,
	    completed = _ref.completed,
	    text = _ref.text;
	return React.createElement(
		'li',
		{
			className: completed ? 'todo todo--completed' : 'todo',
			onClick: onClick
		},
		React.createElement(
			'span',
			{ className: 'todo__content' },
			text
		)
	);
};

var TodoList = function TodoList(_ref2) {
	var todos = _ref2.todos,
	    onTodoClick = _ref2.onTodoClick;

	return React.createElement(
		ReactCSSTransitionGroup,
		{
			className: 'todo-list',
			component: 'ul',
			transitionName: 'todo',
			transitionEnterTimeout: 750,
			transitionLeaveTimeout: 750
		},
		todos.map(function (todo) {
			return React.createElement(Todo, _extends({
				key: todo.id
			}, todo, {
				onClick: function onClick() {
					return onTodoClick(todo.id);
				}
			}));
		})
	);
};

var AddTodo = function AddTodo(_ref3) {
	var onAddClick = _ref3.onAddClick;

	var input = void 0;
	return React.createElement(
		'div',
		{ className: 'add-todo' },
		React.createElement('input', {
			className: 'add-todo__input',
			ref: function ref(node) {
				input = node;
			} }),
		React.createElement(
			'button',
			{
				className: 'add-todo__btn',
				onClick: function onClick() {
					input.value ? onAddClick(input.value) : false;
					input.value = '';
				} },
			React.createElement('i', { className: 'fa fa-plus' })
		)
	);
};

var FilterLink = function FilterLink(_ref4) {
	var filter = _ref4.filter,
	    currentFilter = _ref4.currentFilter,
	    children = _ref4.children,
	    _onClick = _ref4.onClick;

	return React.createElement(
		'a',
		{
			className: 'filter__link',
			href: '#',
			onClick: function onClick(e) {
				e.preventDefault();
				_onClick(filter);
			}
		},
		children
	);
};

var Footer = function Footer(_ref5) {
	var visibilityFilter = _ref5.visibilityFilter,
	    onFilterClick = _ref5.onFilterClick;
	return React.createElement(
		'div',
		{ className: 'filters' },
		React.createElement(
			FilterLink,
			{
				filter: 'SHOW_ALL',
				currentFilter: visibilityFilter,
				onClick: onFilterClick
			},
			React.createElement('i', { className: 'fa fa-list-ul' })
		),
		React.createElement(
			FilterLink,
			{
				filter: 'SHOW_ACTIVE',
				currentFilter: visibilityFilter,
				onClick: onFilterClick
			},
			React.createElement('i', { className: 'fa fa-times' })
		),
		React.createElement(
			FilterLink,
			{
				filter: 'SHOW_COMPLETED',
				currentFilter: visibilityFilter,
				onClick: onFilterClick
			},
			React.createElement('i', { className: 'fa fa-check' })
		)
	);
};

var getVisibleTodos = function getVisibleTodos(todos, filter) {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(function (t) {
				return t.completed;
			});
		case 'SHOW_ACTIVE':
			return todos.filter(function (t) {
				return !t.completed;
			});
	}
};

var nextTodoId = 0;
var TodoApp = function TodoApp(_ref6) {
	var todos = _ref6.todos,
	    visibilityFilter = _ref6.visibilityFilter;
	return React.createElement(
		'div',
		{ className: 'todo-app' },
		React.createElement(
			'h1',
			{ className: 'todo-title' },
			'Todos'
		),
		React.createElement(TodoList, {
			todos: getVisibleTodos(todos, visibilityFilter),
			onTodoClick: function onTodoClick(id) {
				return store.dispatch({
					type: 'TOGGLE_TODO',
					id: id
				});
			}
		}),
		React.createElement(AddTodo, {
			onAddClick: function onAddClick(text) {
				return store.dispatch({
					type: 'ADD_TODO',
					id: nextTodoId++,
					text: text
				});
			}
		}),
		React.createElement(Footer, {
			visibilityFilter: visibilityFilter,
			onFilterClick: function onFilterClick(filter) {
				return store.dispatch({
					type: 'SET_VISIBILITY_FILTER',
					filter: filter
				});
			}
		})
	);
};

var render = function render() {
	ReactDOM.render(React.createElement(TodoApp, store.getState()), document.getElementById('root'));
};

store.subscribe(render);
render();

/*
 * Tests
 */

// const testAddTodo = () => {
// 	const stateBefore = [];
// 	const action = {
// 		type: 'ADD_TODO',
// 		id: 0,
// 		text: 'Learn Redux'
// 	};
// 	const stateAfter = [
// 		{
// 			id: 0,
// 			text: 'Learn Redux',
// 			completed: false
// 		}
// 	];
// 	expect(
// 		todos(stateBefore, action) 
// 	).toEqual(stateAfter);
// };

// const testToggleTodo = () => {
// 	const stateBefore = [
// 		{
// 			id: 0,
// 			text: 'Learn Redux',
// 			completed: false
// 		},
// 		{
// 			id: 1,
// 			text: 'Profit!',
// 			completed: false
// 		}
// 	];
// 	const action = {
// 		type: 'TOGGLE_TODO',
// 		id: 1
// 	};
// 	const stateAfter = [
// 		{
// 			id: 0,
// 			text: 'Learn Redux',
// 			completed: false
// 		},
// 		{
// 			id: 1,
// 			text: 'Profit!',
// 			completed: true
// 		}
// 	];
// 	expect(
// 		todos(stateBefore, action) 
// 	).toEqual(stateAfter);
// };

// testAddTodo();
// testToggleTodo();

// console.log('All Tests Passed!');