// Dashboard Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadRecentActivity();
    setupEventListeners();
});

// Chart Initialization
function initializeCharts() {
    initializeTokenDistributionChart();
    initializeUserGrowthChart();
}

function initializeTokenDistributionChart() {
    const options = {
        series: [{
            name: 'Token Distribution',
            data: [30, 40, 35, 50, 49, 60, 70]
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        colors: ['#4361ee']
    };

    const chart = new ApexCharts(document.querySelector("#tokenDistributionChart"), options);
    chart.render();
}

function initializeUserGrowthChart() {
    const options = {
        series: [{
            name: 'New Users',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            }
        },
        colors: ['#4CAF50'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
    };

    const chart = new ApexCharts(document.querySelector("#userGrowthChart"), options);
    chart.render();
}

// Recent Activity
function loadRecentActivity() {
    const activities = [
        {
            type: 'user',
            icon: 'fas fa-user-plus',
            color: '#4CAF50',
            message: 'New user registered',
            user: 'John Doe',
            time: '5 minutes ago'
        },
        {
            type: 'token',
            icon: 'fas fa-coins',
            color: '#2196F3',
            message: 'Withdrawal request',
            user: 'Jane Smith',
            time: '15 minutes ago'
        },
        {
            type: 'task',
            icon: 'fas fa-tasks',
            color: '#FFC107',
            message: 'Task completed',
            user: 'Mike Johnson',
            time: '30 minutes ago'
        }
    ];

    const activityList = document.getElementById('activityList');
    activities.forEach(activity => {
        const activityItem = createActivityItem(activity);
        activityList.appendChild(activityItem);
    });
}

function createActivityItem(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
        <div class="activity-icon" style="background: ${activity.color}20;">
            <i class="${activity.icon}" style="color: ${activity.color};"></i>
        </div>
        <div class="activity-info">
            <p>${activity.message}</p>
            <span>${activity.user} - ${activity.time}</span>
        </div>
    `;
    return div;
}

// UI Interactions
function setupEventListeners() {
    setupChartPeriodButtons();
    setupNotifications();
    setupProfileMenu();
}

function setupChartPeriodButtons() {
    document.querySelectorAll('.chart-period').forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelector('.active').classList.remove('active');
            this.classList.add('active');
            // Update chart data based on period
            updateChartData(this.dataset.period);
        });
    });
}

function updateChartData(period) {
    // Implement chart data update logic based on period
    console.log(`Updating chart data for period: ${period}`);
}

// Notifications
function showNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.add('show');
}

function hideNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.remove('show');
}

// Profile Menu
function showProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('show');
}

// Click outside to close menus
document.addEventListener('click', function(event) {
    const profileMenu = document.getElementById('profileMenu');
    const notificationPanel = document.getElementById('notificationPanel');
    const profileButton = document.querySelector('.admin-profile');
    const notificationButton = document.querySelector('.notification-btn');

    if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.classList.remove('show');
    }

    if (!notificationButton.contains(event.target) && !notificationPanel.contains(event.target)) {
        notificationPanel.classList.remove('show');
    }
});
