// Fake notification data for demonstration
let notifications = [
    {
        id: 1,
        title: "New Mining Rate",
        message: "Mining rate has been increased to 0.6 tokens/min",
        audience: "miners",
        priority: "high",
        timestamp: "2025-01-21T10:30:00",
        status: "sent",
        readCount: 145,
        totalRecipients: 156
    },
    {
        id: 2,
        title: "Referral Bonus Increase",
        message: "Referral rewards have been increased to 75 tokens per referral",
        audience: "all",
        priority: "medium",
        timestamp: "2025-01-20T15:45:00",
        status: "sent",
        readCount: 230,
        totalRecipients: 324
    },
    {
        id: 3,
        title: "System Maintenance",
        message: "Scheduled maintenance on January 22nd, 2025",
        audience: "all",
        priority: "low",
        timestamp: "2025-01-19T09:15:00",
        status: "scheduled",
        readCount: 0,
        totalRecipients: 450
    }
];

// Initialize notifications list
function initializeNotificationsList() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '';

    notifications.forEach(notification => {
        const notificationCard = document.createElement('div');
        notificationCard.className = `notification-card ${notification.priority}`;
        
        const readRate = ((notification.readCount / notification.totalRecipients) * 100).toFixed(1);
        
        notificationCard.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    <h3>${notification.title}</h3>
                    <span class="priority-badge ${notification.priority}">${notification.priority}</span>
                </div>
                <div class="notification-actions">
                    <button class="action-btn" onclick="editNotification(${notification.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn warning" onclick="deleteNotification(${notification.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="notification-body">
                <p>${notification.message}</p>
                <div class="notification-meta">
                    <span><i class="fas fa-users"></i> ${notification.audience}</span>
                    <span><i class="fas fa-clock"></i> ${formatTimestamp(notification.timestamp)}</span>
                </div>
            </div>
            <div class="notification-stats">
                <div class="stat">
                    <span class="label">Status</span>
                    <span class="value ${notification.status}">${notification.status}</span>
                </div>
                <div class="stat">
                    <span class="label">Read Rate</span>
                    <span class="value">${readRate}%</span>
                </div>
                <div class="stat">
                    <span class="label">Recipients</span>
                    <span class="value">${notification.totalRecipients}</span>
                </div>
            </div>
        `;
        
        notificationsList.appendChild(notificationCard);
    });

    // Update stats
    updateNotificationStats();
}

// Update notification statistics
function updateNotificationStats() {
    document.getElementById('totalNotifications').textContent = notifications.length;
    
    const totalRead = notifications.reduce((sum, n) => sum + n.readCount, 0);
    const totalRecipients = notifications.reduce((sum, n) => sum + n.totalRecipients, 0);
    const readRate = ((totalRead / totalRecipients) * 100).toFixed(1);
    document.getElementById('readRate').textContent = `${readRate}%`;
    
    document.getElementById('responseTime').textContent = '2.5 hrs';
}

// Modal functions
function openCreateNotificationModal() {
    document.getElementById('createNotificationModal').style.display = 'flex';
}

function closeCreateNotificationModal() {
    document.getElementById('createNotificationModal').style.display = 'none';
}

// Form submission
document.getElementById('createNotificationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newNotification = {
        id: notifications.length + 1,
        title: formData.get('title'),
        message: formData.get('message'),
        audience: formData.get('audience'),
        priority: formData.get('priority'),
        timestamp: new Date().toISOString(),
        status: 'scheduled',
        readCount: 0,
        totalRecipients: formData.get('audience') === 'all' ? 450 : 150
    };

    notifications.unshift(newNotification);
    initializeNotificationsList();
    closeCreateNotificationModal();
    e.target.reset();
});

// Notification actions
function editNotification(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        alert(`Edit notification: ${notification.title}`);
        // Implement edit functionality
    }
}

function deleteNotification(notificationId) {
    if (confirm('Are you sure you want to delete this notification?')) {
        notifications = notifications.filter(n => n.id !== notificationId);
        initializeNotificationsList();
    }
}

// Utility functions
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeNotificationsList);
