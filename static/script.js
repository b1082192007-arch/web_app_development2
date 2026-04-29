document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];
    let currentFilter = 'all';

    // 取得所有任務
    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            tasks = await response.json();
            renderTasks();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // 新增任務
    const addTask = async () => {
        const title = taskInput.value.trim();
        if (!title) return;

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            const newTask = await response.json();
            if (newTask.id) {
                tasks.unshift(newTask); // 加到最前面
                taskInput.value = '';
                renderTasks();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // 切換任務狀態
    const toggleTask = async (id, completed) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });
            if (response.ok) {
                const task = tasks.find(t => t.id === id);
                if (task) task.completed = !completed;
                renderTasks();
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // 刪除任務
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                tasks = tasks.filter(t => t.id !== id);
                renderTasks();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // 渲染任務
    const renderTasks = () => {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 20px;">目前沒有任何任務。</p>`;
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="toggleTaskGlobal(${task.id}, ${task.completed})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span class="task-title">${escapeHTML(task.title)}</span>
                <button class="delete-btn" onclick="deleteTaskGlobal(${task.id})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            `;
            taskList.appendChild(li);
        });
    };

    // 幫助函數防 XSS
    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    // 事件綁定
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTasks();
        });
    });

    // 暴露給全局域讓 onclick 可以呼叫
    window.toggleTaskGlobal = toggleTask;
    window.deleteTaskGlobal = deleteTask;

    // 初始化
    fetchTasks();
});
