// Fake user data for demonstration
let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        tokens: 1500,
        status: "active"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        tokens: 2300,
        status: "active"
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        tokens: 800,
        status: "inactive"
    }
];

// Initialize the user table
function initializeUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.tokens}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <button class="action-btn" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="adjustTokens(${user.id})">
                    <i class="fas fa-coins"></i>
                </button>
                <button class="action-btn ${user.status === 'active' ? 'warning' : 'success'}"
                        onclick="toggleUserStatus(${user.id})">
                    <i class="fas fa-${user.status === 'active' ? 'ban' : 'check'}"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Modal functions
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'flex';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}

// Form submission
document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newUser = {
        id: users.length + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        tokens: parseInt(formData.get('tokens')),
        status: 'active'
    };

    users.push(newUser);
    initializeUserTable();
    closeAddUserModal();
    e.target.reset();
});

// User actions
function editUser(userId) {
    // Implement edit user functionality
    console.log('Edit user:', userId);
}

function adjustTokens(userId) {
    const amount = prompt('Enter token amount to add/subtract (use negative for subtraction):');
    if (amount !== null) {
        const user = users.find(u => u.id === userId);
        if (user) {
            user.tokens += parseInt(amount);
            initializeUserTable();
        }
    }
}

function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        initializeUserTable();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeUserTable);
