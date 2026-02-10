const host = window.location.origin;

export const menuItems = [
    { name: "Dashboard", link: `${host}/module/dashboard`, icon: "desktop" },
    { name: "IP Management", link: `${host}/module/IPManagement`, icon: "table" },
    { name: "User Management", link: `${host}/module/userManagement`, icon: "user-group" },
    { name: "Audit Logs", link: `${host}/module/AuditLogs`, icon: "database" },

];