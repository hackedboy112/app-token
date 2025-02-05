// Fake referral data for demonstration
let referrals = [
    {
        id: 1,
        referrer: "John Doe",
        referredUser: "Alice Brown",
        date: "2025-01-20",
        status: "completed",
        reward: 50
    },
    {
        id: 2,
        referrer: "Jane Smith",
        referredUser: "Bob Wilson",
        date: "2025-01-19",
        status: "pending",
        reward: 50
    },
    {
        id: 3,
        referrer: "Mike Johnson",
        referredUser: "Carol Davis",
        date: "2025-01-18",
        status: "completed",
        reward: 50
    }
];

// Referral configuration
let referralConfig = {
    baseReward: 50,
    maxReward: 200,
    minReward: 10
};

// Initialize the referral table
function initializeReferralTable() {
    const tableBody = document.getElementById('referralTableBody');
    tableBody.innerHTML = '';

    referrals.forEach(referral => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${referral.referrer}</td>
            <td>${referral.referredUser}</td>
            <td>${referral.date}</td>
            <td><span class="status-badge ${referral.status}">${referral.status}</span></td>
            <td>${referral.reward} tokens</td>
            <td>
                <button class="action-btn" onclick="viewReferralDetails(${referral.id})">
                    <i class="fas fa-eye"></i>
                </button>
                ${referral.status === 'pending' ? `
                <button class="action-btn success" onclick="approveReferral(${referral.id})">
                    <i class="fas fa-check"></i>
                </button>
                ` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Update stats
    updateReferralStats();
}

// Update referral statistics
function updateReferralStats() {
    document.getElementById('totalReferrals').textContent = referrals.length;
    
    const totalRewards = referrals
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + r.reward, 0);
    document.getElementById('tokensRewarded').textContent = totalRewards;
    
    document.getElementById('referralReward').textContent = 
        `${referralConfig.baseReward} tokens`;
}

// Referral actions
function viewReferralDetails(referralId) {
    const referral = referrals.find(r => r.id === referralId);
    if (referral) {
        alert(`Referral Details:
        Referrer: ${referral.referrer}
        Referred User: ${referral.referredUser}
        Date: ${referral.date}
        Status: ${referral.status}
        Reward: ${referral.reward} tokens`);
    }
}

function approveReferral(referralId) {
    const referral = referrals.find(r => r.id === referralId);
    if (referral && referral.status === 'pending') {
        if (confirm(`Approve referral and award ${referral.reward} tokens to ${referral.referrer}?`)) {
            referral.status = 'completed';
            initializeReferralTable();
        }
    }
}

function adjustReferralReward() {
    const newReward = prompt(`Enter new referral reward (${referralConfig.minReward}-${referralConfig.maxReward} tokens):`);
    if (newReward !== null) {
        const reward = parseInt(newReward);
        if (reward >= referralConfig.minReward && reward <= referralConfig.maxReward) {
            referralConfig.baseReward = reward;
            updateReferralStats();
        } else {
            alert(`Please enter a reward between ${referralConfig.minReward} and ${referralConfig.maxReward} tokens`);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeReferralTable);
