// Fake mining data for demonstration
let miningActivities = [
    {
        userId: 1,
        username: "John Doe",
        miningTime: "2:30:15",
        tokensEarned: 75,
        status: "active"
    },
    {
        userId: 2,
        username: "Jane Smith",
        miningTime: "1:45:30",
        tokensEarned: 52,
        status: "active"
    },
    {
        userId: 3,
        username: "Mike Johnson",
        miningTime: "0:45:10",
        tokensEarned: 22,
        status: "paused"
    }
];

// Mining configuration
let miningConfig = {
    baseRate: 0.5, // tokens per minute
    maxRate: 2.0,
    minRate: 0.1
};

// Initialize the mining table
function initializeMiningTable() {
    const tableBody = document.getElementById('miningTableBody');
    tableBody.innerHTML = '';

    miningActivities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.username}</td>
            <td>${activity.miningTime}</td>
            <td>${activity.tokensEarned}</td>
            <td><span class="status-badge ${activity.status}">${activity.status}</span></td>
            <td>
                <button class="action-btn" onclick="viewMiningDetails(${activity.userId})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn ${activity.status === 'active' ? 'warning' : 'success'}"
                        onclick="toggleMiningStatus(${activity.userId})">
                    <i class="fas fa-${activity.status === 'active' ? 'pause' : 'play'}"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Update stats
    updateMiningStats();
}

// Update mining statistics
function updateMiningStats() {
    document.getElementById('activeMinerCount').textContent = 
        miningActivities.filter(a => a.status === 'active').length;
    
    document.getElementById('tokensMined').textContent = 
        miningActivities.reduce((sum, a) => sum + a.tokensEarned, 0);
    
    document.getElementById('miningRate').textContent = 
        `${miningConfig.baseRate} tokens/min`;
}

// Mining actions
function viewMiningDetails(userId) {
    const activity = miningActivities.find(a => a.userId === userId);
    if (activity) {
        alert(`Mining Details for ${activity.username}:
        Time Active: ${activity.miningTime}
        Tokens Earned: ${activity.tokensEarned}
        Current Status: ${activity.status}`);
    }
}

function toggleMiningStatus(userId) {
    const activity = miningActivities.find(a => a.userId === userId);
    if (activity) {
        activity.status = activity.status === 'active' ? 'paused' : 'active';
        initializeMiningTable();
    }
}

function adjustMiningRate() {
    const newRate = prompt(`Enter new mining rate (${miningConfig.minRate}-${miningConfig.maxRate} tokens/min):`);
    if (newRate !== null) {
        const rate = parseFloat(newRate);
        if (rate >= miningConfig.minRate && rate <= miningConfig.maxRate) {
            miningConfig.baseRate = rate;
            updateMiningStats();
        } else {
            alert(`Please enter a rate between ${miningConfig.minRate} and ${miningConfig.maxRate}`);
        }
    }
}

// Simulate mining activity updates
function simulateMiningUpdates() {
    setInterval(() => {
        miningActivities.forEach(activity => {
            if (activity.status === 'active') {
                activity.tokensEarned += miningConfig.baseRate;
                // Update mining time
                const [hours, minutes, seconds] = activity.miningTime.split(':').map(Number);
                let totalSeconds = hours * 3600 + minutes * 60 + seconds + 60;
                const newHours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                const newMinutes = Math.floor(totalSeconds / 60);
                const newSeconds = totalSeconds % 60;
                activity.miningTime = `${newHours}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
            }
        });
        initializeMiningTable();
    }, 60000); // Update every minute
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeMiningTable();
    simulateMiningUpdates();
});
