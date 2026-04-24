# Dashboard - User Guide

The **Dashboard** is the SGI home screen after login - an overview of what matters at that moment. The content is **different for each role**.

---

## 1. Accessing the Dashboard

In the side menu, click **"Dashboard"** (or it is the screen that opens automatically after login).

---

## 2. Administrator Dashboard

<!-- TODO: screenshot of Admin Dashboard. File: images/dashboard-admin.png. Capture: 3 stats cards + grid with recent projects and pending costs + quick actions -->
![Admin Dashboard](images/dashboard-admin.png){ .placeholder-image }

### Stats Cards (3 indicators at the top)

| Card | What it shows | Quick action |
|------|--------------|-------------|
| **Pending Approvals** | Projects with `pending` status awaiting initial approval | Click takes you to filtered list |
| **Pending Costs** | Costs added by employees awaiting admin approval | Click takes you to review |
| **Budget Alerts** | Projects that reached the configured alert limit (default 80% of budget) | Click takes you to projects in alert |

### Main content (2-column grid)

**Column 1: Recent Projects**

- Top 3 most recent projects
- Clickable card with: name, customer, status, progress
- **"Ver todos"** (View all) button takes you to `/projects`

**Column 2: Pending Costs**

- Top 3 costs awaiting approval
- Card with: description, value, who recorded it, project
- **"Revisar todos"** (Review all) button takes you to the complete list

### Quick Actions (4 shortcut buttons)

| Button | Takes you to |
|-------|-----------|
| **All Projects** | `/projects` |
| **Manage Users** | `/users` |
| **Settings** | `/settings` |
| **Reports** | `/reports` (Analytics) |

---

## 3. Employee Dashboard

<!-- TODO: screenshot of Employee Dashboard. File: images/dashboard-employee.png. Capture: My Projects + Notifications + Profile cards -->
![Employee Dashboard](images/dashboard-employee.png){ .placeholder-image }

The employee sees **3 cards** focused on their day-to-day:

### Card 1: My Projects

Lists **all projects assigned** to you (`assignedUsers` contains your UID).

- Each project appears as a card with: name, customer, status, progress
- Click takes you directly to the project
- Empty state: "All done! No projects assigned."

### Card 2: Notifications

Latest **5 notifications** received:

- Title and message
- Unread badge (blue dot)
- Click on notification marks as read and takes you to the related page
- **"Ver todas"** (View all) link → `/notifications`

See the [Notification Center Guide](notifications.md) for details.

### Card 3: Profile

- Avatar + name + role
- **"Gerenciar Perfil"** (Manage Profile) button → `/settings/profile`

---

## 4. Smart behavior

### Clickable stats cards

All 3 admin stats cards (Pending Approvals, Pending Costs, Budget Alerts) are **clickable** and take you to **pre-filtered** lists with relevant items.

### Loading state

If data is loading, the dashboard displays animated **skeletons** (gray placeholders) instead of a blank screen.

### Empty states

Each card has its friendly empty state:

- **No pending projects:** "All caught up! No projects awaiting approval."
- **No pending costs:** "Nothing to review."
- **No budget alerts:** "All projects within budget."
- **Employee without projects:** "All done! You have no projects assigned at the moment."

---

## 5. Hover effects and microinteractions

Dashboard cards have:

- **Hover scale** - they lift slightly when hovered
- **Shadow** increases on hover
- **Border color** changes to primary color
- Subtle **gradient overlay** on important cards

Everything to provide a sense of interactivity and highlight what's clickable.

---

## Important Rules

### Visibility by role

| Element | Super Admin | Admin | Employee |
|----------|:---:|:---:|:---:|
| Stats Cards (3 admin indicators) | Yes | Yes | **No** |
| Recent Projects (all) | Yes | Yes | No |
| Pending Costs | Yes | Yes | No |
| Admin Quick Actions | Yes | Yes | No |
| My Projects (own) | Yes (all) | Yes (all) | Yes (only assigned) |
| Notifications | Yes | Yes | Yes |
| Profile card | Yes | Yes | Yes |

### What each stats card queries

| Card | Query |
|------|-------|
| **Pending Approvals** | `projects` where `status == 'pending'` |
| **Pending Costs** | `costs` (subcollections) where `status == 'pending_approval'` (aggregated) |
| **Budget Alerts** | `projects` where `isBudgetAlert == true` (calculated field) |

!!! note "Stats are updated in real time"
    Dashboard uses **Firestore Client SDK** (TanStack Query with listeners). When a cost is approved on another screen, the dashboard reflects immediately.

### Limits

| Item | Limit |
|------|--------|
| Recent Projects displayed | **3** (more in `/projects`) |
| Pending Costs displayed | **3** (more in the complete list) |
| Notifications in card | **5** (more in `/notifications`) |

### Defaults

| Setting | Value |
|---|---|
| Recent Projects ordering | `createdAt` DESC |
| Pending Costs ordering | `createdAt` DESC |
| Notifications ordering | `createdAt` DESC + unread at top |
| Auto-refresh | Yes (via TanStack Query) |

---

## Quick summary

| You want to... | Do this... |
|-------------|-------------|
| View system overview | Dashboard |
| View projects pending approval (admin) | "Pending Approvals" card |
| Review employee costs (admin) | "Pending Costs" card |
| View projects with budget alert (admin) | "Budget Alerts" card |
| Quickly go to projects/users/settings | Quick Actions (4 buttons) |
| View your own projects (employee) | "My Projects" card |
| View latest notifications | "Notifications" card |
