# 📝 To-Do List Application

A modern, feature-rich to-do list application with local storage functionality. Keep track of your tasks efficiently with a clean and intuitive user interface.

## Features

✨ **Core Functionality**
- ✅ Add, complete, and delete tasks
- 💾 Persistent storage using browser's Local Storage
- 🎯 Filter tasks (All, Active, Completed)
- 📊 Task statistics (Total, Completed, Remaining)
- 🏷️ Priority levels for tasks (High, Medium, Low)
- 🧹 Clear completed or all tasks at once

🎨 **User Experience**
- Beautiful gradient UI with smooth animations
- Responsive design (works on desktop, tablet, mobile)
- Real-time updates and statistics
- Keyboard support (Enter key to add tasks)
- Visual feedback on interactions
- Empty state messaging

## How to Use

1. **Add a Task**: Type your task in the input field and click "Add Task" or press Enter
2. **Complete a Task**: Check the checkbox next to a task to mark it as complete
3. **Delete a Task**: Click the "Delete" button on any task
4. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks
5. **Clear Tasks**: 
   - Click "Clear Completed" to remove all finished tasks
   - Click "Clear All" to remove all tasks (with confirmation)

## Files Structure

```
todo-app/
├── index.html      # HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality and Local Storage
└── README.md       # Documentation
```

## Local Storage

All tasks are automatically saved to your browser's Local Storage. This means:
- Tasks persist even after closing the browser
- No server required - everything is stored locally
- Data is specific to your device and browser
- Clearing browser data will clear your tasks

**Storage Key**: `todoList`

## Technical Details

### Data Structure
Each task is stored as an object with the following properties:
```javascript
{
    id: Number (timestamp),
    text: String,
    completed: Boolean,
    priority: String ('high', 'medium', 'low'),
    createdAt: ISO String
}
```

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Limited support

## Features in Detail

### Task Filtering
- **All**: Shows all tasks
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only finished tasks

### Statistics Dashboard
- **Total**: Count of all tasks
- **Completed**: Count of finished tasks
- **Remaining**: Count of pending tasks

### Priority Levels
Tasks are automatically assigned a "Medium" priority (can be extended to allow user selection).

## Keyboard Shortcuts
- **Enter**: Add new task (when input is focused)
- **Click**: Toggle task completion or delete

## Customization

### Change Colors
Edit the CSS gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Storage Key
In `script.js`, change the `storageKey` property:
```javascript
this.storageKey = 'yourCustomKey';
```

### Add New Features
The `TodoApp` class is designed for easy extension. Add new methods to:
- Change priority levels
- Add due dates
- Categorize tasks
- Implement data export/import

## Performance

- Lightweight: ~15KB total (HTML + CSS + JS)
- No external dependencies
- Optimized rendering with animations
- Efficient Local Storage operations

## Browser Local Storage Limits

- Chrome/Firefox/Safari: ~10MB per domain
- This app typically uses < 1MB for thousands of tasks

## Future Enhancement Ideas

- 🌙 Dark mode support
- 📅 Due dates and reminders
- 🏷️ Task categories/tags
- 📊 Charts and statistics
- 🔄 Export/Import tasks
- ☁️ Cloud sync option
- 🔔 Notifications

## License

Free to use and modify!

## Support

For issues or questions, feel free to open an issue on GitHub.

---

**Happy tasking! 🚀**
