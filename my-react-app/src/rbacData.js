// src/rbacData.js

export const MOCK_USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "John Admin" },
  { id: 2, username: "manager", password: "manager123", role: "manager", name: "Jane Manager" },
  { id: 3, username: "staff", password: "staff123", role: "staff", name: "Bob Staff" },
];

export const ROLE_PERMISSIONS = {
  admin: {
    canViewDashboard: true,
    canManageUsers: true,
    canManageProducts: true,
    canManagePurchases: true,
    canViewReports: true,
    canDeleteData: true,
    canEditSettings: true,
    canViewAuditLogs: true,
    menuItems: ["dashboard", "users", "products", "purchases", "reports", "settings", "audit"],
  },
  manager: {
    canViewDashboard: true,
    canManageUsers: false,
    canManageProducts: true,
    canManagePurchases: true,
    canViewReports: true,
    canDeleteData: false,
    canEditSettings: false,
    canViewAuditLogs: false,
    menuItems: ["dashboard", "products", "purchases", "reports"],
  },
  staff: {
    canViewDashboard: true,
    canManageUsers: false,
    canManageProducts: false,
    canManagePurchases: true,
    canViewReports: false,
    canDeleteData: false,
    canEditSettings: false,
    canViewAuditLogs: false,
    menuItems: ["dashboard", "purchases"],
  },
};

export const MOCK_PRODUCTS = [
  { id: 1, name: "Laptop", stock: 50, price: 999.99 },
  { id: 2, name: "Mouse", stock: 200, price: 29.99 },
  { id: 3, name: "Keyboard", stock: 150, price: 89.99 },
];