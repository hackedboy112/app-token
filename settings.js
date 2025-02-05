// Default settings configuration
let settings = {
    token: {
        baseMiningRate: 0.5,
        referralReward: 50,
        taskRewardCap: 500
    },
    user: {
        welcomeBonus: 100,
        maxMiningHours: 12,
        minWithdrawal: 500
    },
    notification: {
        systemEnabled: true,
        emailEnabled: true,
        frequency: 'realtime'
    },
    security: {
        twoFactorEnabled: false,
        sessionTimeout: 30,
        passwordExpiry: 90
    }
};

// Initialize settings form
function initializeSettings() {
    // Token Settings
    document.getElementById('baseMiningRate').value = settings.token.baseMiningRate;
    document.getElementById('referralReward').value = settings.token.referralReward;
    document.getElementById('taskRewardCap').value = settings.token.taskRewardCap;

    // User Settings
    document.getElementById('welcomeBonus').value = settings.user.welcomeBonus;
    document.getElementById('maxMiningHours').value = settings.user.maxMiningHours;
    document.getElementById('minWithdrawal').value = settings.user.minWithdrawal;

    // Notification Settings
    document.getElementById('systemNotifications').checked = settings.notification.systemEnabled;
    document.getElementById('emailNotifications').checked = settings.notification.emailEnabled;
    document.getElementById('notificationFrequency').value = settings.notification.frequency;

    // Security Settings
    document.getElementById('twoFactorAuth').checked = settings.security.twoFactorEnabled;
    document.getElementById('sessionTimeout').value = settings.security.sessionTimeout;
    document.getElementById('passwordExpiry').value = settings.security.passwordExpiry;

    // Add event listeners for real-time validation
    addSettingsValidation();
}

// Add validation to settings inputs
function addSettingsValidation() {
    // Token Settings Validation
    document.getElementById('baseMiningRate').addEventListener('change', function(e) {
        const value = parseFloat(e.target.value);
        if (value < 0.1 || value > 2.0) {
            alert('Base mining rate must be between 0.1 and 2.0 tokens/min');
            e.target.value = settings.token.baseMiningRate;
        }
    });

    document.getElementById('referralReward').addEventListener('change', function(e) {
        const value = parseInt(e.target.value);
        if (value < 10 || value > 200) {
            alert('Referral reward must be between 10 and 200 tokens');
            e.target.value = settings.token.referralReward;
        }
    });

    // Add similar validation for other numeric inputs
}

// Save all settings
function saveAllSettings() {
    // Collect all settings values
    const newSettings = {
        token: {
            baseMiningRate: parseFloat(document.getElementById('baseMiningRate').value),
            referralReward: parseInt(document.getElementById('referralReward').value),
            taskRewardCap: parseInt(document.getElementById('taskRewardCap').value)
        },
        user: {
            welcomeBonus: parseInt(document.getElementById('welcomeBonus').value),
            maxMiningHours: parseInt(document.getElementById('maxMiningHours').value),
            minWithdrawal: parseInt(document.getElementById('minWithdrawal').value)
        },
        notification: {
            systemEnabled: document.getElementById('systemNotifications').checked,
            emailEnabled: document.getElementById('emailNotifications').checked,
            frequency: document.getElementById('notificationFrequency').value
        },
        security: {
            twoFactorEnabled: document.getElementById('twoFactorAuth').checked,
            sessionTimeout: parseInt(document.getElementById('sessionTimeout').value),
            passwordExpiry: parseInt(document.getElementById('passwordExpiry').value)
        }
    };

    // Validate all settings
    if (validateSettings(newSettings)) {
        // Update settings
        settings = newSettings;
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Settings saved successfully!</span>
        `;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);

        // Update other components that might depend on these settings
        updateDependentComponents();
    }
}

// Validate settings before saving
function validateSettings(newSettings) {
    // Token Settings Validation
    if (newSettings.token.baseMiningRate < 0.1 || newSettings.token.baseMiningRate > 2.0) {
        alert('Invalid base mining rate');
        return false;
    }
    if (newSettings.token.referralReward < 10 || newSettings.token.referralReward > 200) {
        alert('Invalid referral reward');
        return false;
    }
    if (newSettings.token.taskRewardCap < 100 || newSettings.token.taskRewardCap > 1000) {
        alert('Invalid task reward cap');
        return false;
    }

    // User Settings Validation
    if (newSettings.user.welcomeBonus < 0 || newSettings.user.welcomeBonus > 500) {
        alert('Invalid welcome bonus');
        return false;
    }
    if (newSettings.user.maxMiningHours < 1 || newSettings.user.maxMiningHours > 24) {
        alert('Invalid maximum mining hours');
        return false;
    }
    if (newSettings.user.minWithdrawal < 100 || newSettings.user.minWithdrawal > 1000) {
        alert('Invalid minimum withdrawal amount');
        return false;
    }

    // Security Settings Validation
    if (newSettings.security.sessionTimeout < 5 || newSettings.security.sessionTimeout > 120) {
        alert('Invalid session timeout');
        return false;
    }
    if (newSettings.security.passwordExpiry < 30 || newSettings.security.passwordExpiry > 365) {
        alert('Invalid password expiry period');
        return false;
    }

    return true;
}

// Update components that depend on settings
function updateDependentComponents() {
    // Update mining rate in mining.js
    if (typeof updateMiningConfig === 'function') {
        updateMiningConfig(settings.token.baseMiningRate);
    }

    // Update referral reward in referrals.js
    if (typeof updateReferralConfig === 'function') {
        updateReferralConfig(settings.token.referralReward);
    }

    // Update notification settings
    if (typeof updateNotificationConfig === 'function') {
        updateNotificationConfig(settings.notification);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeSettings);
