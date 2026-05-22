// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoList';
        
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.remainingTasksEl = document.getElementById('remainingTasks');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        
        this.init();
    }

    init() {
        // Load todos from local storage
        this.loadFromStorage();
        
        // Event listeners
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
        
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        
        // Initial render
        this.render();
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (!text) {
            this.shakeInput();
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toISOString()
        };
        
        this.todos.push(todo);
        this.saveToStorage();
        this.todoInput.value = '';
        this.todoInput.focus();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    }

    getFilteredTodos() {
        if (this.currentFilter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        } else if (this.currentFilter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        }
        return this.todos;
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        
        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToStorage();
            this.render();
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            alert('No tasks to clear!');
            return;
        }
        
        if (confirm(`Clear all ${this.todos.length} task(s)? This cannot be undone.`)) {
            this.todos = [];
            this.saveToStorage();
            this.currentFilter = 'all';
            this.filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === 'all') btn.classList.add('active');
            });
            this.render();
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;
        
        this.totalTasksEl.textContent = total;
        this.completedTasksEl.textContent = completed;
        this.remainingTasksEl.textContent = remaining;
    }

    render() {
        this.todoList.innerHTML = '';
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.emptyState.classList.add('show');
        } else {
            this.emptyState.classList.remove('show');
        }
        
        filteredTodos.forEach(todo => {
            const todoItem = this.createTodoElement(todo);
            this.todoList.appendChild(todoItem);
        });
        
        this.updateStats();
    }

    createTodoElement(todo) {
        const div = document.createElement('div');
        div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const priorityClass = `priority-${todo.priority}`;
        
        div.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
            >
            <span class="todo-priority ${priorityClass}">${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</span>
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        // Event listeners
        const checkbox = div.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
        
        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
        
        return div;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    shakeInput() {
        this.todoInput.style.animation = 'none';
        setTimeout(() => {
            this.todoInput.style.animation = 'shake 0.5s';
        }, 10);
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.todos = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            this.todos = [];
        }
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
