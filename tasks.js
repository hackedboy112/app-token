// Fake task data for demonstration
let tasks = [
    {
        id: 1,
        title: "Daily Login",
        description: "Log in to the platform daily to earn tokens",
        tokenReward: 50,
        status: "active"
    },
    {
        id: 2,
        title: "Share on Social Media",
        description: "Share our platform on your social media accounts",
        tokenReward: 100,
        status: "active"
    },
    {
        id: 3,
        title: "Complete Survey",
        description: "Complete our user feedback survey",
        tokenReward: 200,
        status: "inactive"
    }
];

// Initialize the task table
function initializeTaskTable() {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.tokenReward}</td>
            <td><span class="status-badge ${task.status}">${task.status}</span></td>
            <td>
                <button class="action-btn" onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="adjustReward(${task.id})">
                    <i class="fas fa-coins"></i>
                </button>
                <button class="action-btn ${task.status === 'active' ? 'warning' : 'success'}"
                        onclick="toggleTaskStatus(${task.id})">
                    <i class="fas fa-${task.status === 'active' ? 'ban' : 'check'}"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Modal functions
function openAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'flex';
}

function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

// Form submission
document.getElementById('addTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newTask = {
        id: tasks.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        tokenReward: parseInt(formData.get('tokenReward')),
        status: 'active'
    };

    tasks.push(newTask);
    initializeTaskTable();
    closeAddTaskModal();
    e.target.reset();
});

// Task actions
function editTask(taskId) {
    // Implement edit task functionality
    console.log('Edit task:', taskId);
}

function adjustReward(taskId) {
    const amount = prompt('Enter new token reward amount:');
    if (amount !== null) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.tokenReward = parseInt(amount);
            initializeTaskTable();
        }
    }
}

function toggleTaskStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'active' ? 'inactive' : 'active';
        initializeTaskTable();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeTaskTable);
