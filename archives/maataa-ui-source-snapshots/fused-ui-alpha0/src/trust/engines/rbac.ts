/**
 * Role-based and scope-based access control helpers.
 */

import type { Role, AccessControl, Scope, ScopeGrant } from "../types";

/**
 * Role-Based Access Control (RBAC) Engine
 * Manages users, roles, and permissions with hierarchical role support
 */
export class RBACEngine {
  private roles: Map<string, Role> = new Map();
  private userRoles: Map<string, string[]> = new Map();
  /**
   * Create or update a role
   */
  createRole(role: Role): void {
    if (!role.id || !role.name) {
      throw new Error("Role must have id and name");
    }
    this.roles.set(role.id, role);
  }

  /**
   * Check if user has permission
   */
  hasPermission(userId: string, resource: string, action: string): boolean {
    const userRoleIds = this.userRoles.get(userId) || [];

    for (const roleId of userRoleIds) {
      const role = this.roles.get(roleId);
      if (!role) continue;

      const hasPermission = role.permissions.some(
        (p) => p.resource === resource && p.action === action
      );

      if (hasPermission) return true;
    }

    return false;
  }

  /**
   * Assign role to user
   */
  assignRole(userId: string, roleId: string): void {
    if (!this.roles.has(roleId)) {
      throw new Error(`Role ${roleId} not found`);
    }

    const roles = this.userRoles.get(userId) || [];
    if (!roles.includes(roleId)) {
      roles.push(roleId);
      this.userRoles.set(userId, roles);
    }
  }

  /**
   * Revoke role from user
   */
  revokeRole(userId: string, roleId: string): void {
    const roles = this.userRoles.get(userId) || [];
    const index = roles.indexOf(roleId);
    if (index > -1) {
      roles.splice(index, 1);
      this.userRoles.set(userId, roles);
    }
  }

  /**
   * Get user's access control info
   */
  getAccessControl(userId: string): AccessControl {
    const roleIds = this.userRoles.get(userId) || [];
    const roles = roleIds.map((id) => this.roles.get(id)).filter(Boolean) as Role[];
    const permissions = roles.flatMap((r) => r.permissions);

    return {
      userId,
      roles,
      permissions,
    };
  }
}

/**
 * Scope-Based Access Control (OAuth 2.0 Scopes)
 * Manages granular permissions through scopes for API/token-based access
 */
export class ScopeBasedAccessControl {
  private scopes: Map<string, Scope> = new Map();
  private grants: ScopeGrant[] = [];

  /**
   * Register a scope
   */
  registerScope(scope: Scope): void {
    if (!scope.id || !scope.name) {
      throw new Error("Scope must have id and name");
    }
    this.scopes.set(scope.id, scope);
  }

  /**
   * Grant scope to user
   */
  grantScope(userId: string, scopeId: string, expiresAt?: Date): ScopeGrant {
    if (!this.scopes.has(scopeId)) {
      throw new Error(`Scope ${scopeId} not found`);
    }

    const grant: ScopeGrant = {
      userId,
      scopeId,
      grantedAt: new Date(),
      grantedBy: "system",
      expiresAt,
    };

    this.grants.push(grant);
    return grant;
  }

  /**
   * Check if user has scope
   */
  hasScope(userId: string, scopeId: string): boolean {
    const now = new Date();
    return this.grants.some(
      (g) => g.userId === userId && g.scopeId === scopeId && (!g.expiresAt || g.expiresAt > now)
    );
  }

  /**
   * Get user's granted scopes
   */
  getUserScopes(userId: string): Scope[] {
    const now = new Date();
    const grantedScopeIds = this.grants
      .filter((g) => g.userId === userId && (!g.expiresAt || g.expiresAt > now))
      .map((g) => g.scopeId);

    return grantedScopeIds.map((id) => this.scopes.get(id)).filter(Boolean) as Scope[];
  }

  /**
   * Revoke scope from user
   */
  revokeScope(userId: string, scopeId: string): void {
    const index = this.grants.findIndex((g) => g.userId === userId && g.scopeId === scopeId);
    if (index > -1) {
      this.grants.splice(index, 1);
    }
  }
}
