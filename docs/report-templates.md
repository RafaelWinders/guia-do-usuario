# Report Templates - User Guide

**Report Templates** allow you to create customized forms for Daily Reports. Each project can have a different template, adapted to the type of work the team performs.

---

## 1. What is a Report Template

A template defines **which fields appear in the form** when an employee creates or edits a Daily Report for a project.

No template → the report has only **general notes** and **general photos**.
With template → the report shows the template fields + notes and general photos (always present).

---

## 2. Accessing

On the sidebar, go to **Settings** > **Report Templates** (`/settings/report-templates`). Available to **administrators**.

---

## 3. The builder interface

The builder has **3 side-by-side panels**:

| Panel | What it shows |
|-------|--------------|
| **Template list** | All created templates + "New Template" button |
| **Fields editor** | Fields of the selected template — add, reorder, edit, remove |
| **Live preview** | Real-time preview of the form as you edit |

---

## 4. The 9 field types

When adding a field to the template, you choose one of 9 available types:

| Type | What it generates in the form |
|------|------------------------------|
| **text** | Short text field (one line) |
| **textarea** | Long text area (multiple lines) |
| **number** | Numeric field |
| **date** | Date picker |
| **radio** | Single selection among defined options |
| **checkbox** | Multiple selection among defined options |
| **select** | Single-selection dropdown |
| **service_checklist** | Automatic checklist of the project's Work Order items |
| **photo** | Photo upload field(s) |

### About service_checklist

This is the most special field: when included in the template, the report form **automatically fetches the items from the project's Work Order** and displays a checklist where the employee marks which items were completed that day.

!!! note "What if the WO doesn't exist?"
    If the project has no Work Order, the `service_checklist` field appears empty — no error, just no items to check.

!!! warning "Items removed from WO"
    If a WO item is removed after reports were already created using this field, the item continues to appear in the history of old reports with a **"Removed from WO"** badge. This preserves the integrity of the history.

---

## 5. Creating a template

1. Go to **Settings** > **Report Templates**
2. Click **"+ Novo Modelo"** (+ New Template)
3. Give the template a name (e.g., "Apartment Renovation", "Post-Construction Cleaning")
4. In the fields panel, click **"+ Adicionar campo"** (+ Add field) and choose the type
5. For each field, configure:
   - **Label** (what appears in the form)
   - **Required** (yes/no)
   - **Options** (only for radio, checkbox, and select)
6. Reorder fields by dragging
7. Watch the **preview** to see how the form will look
8. Save

---

## 6. Linking a template to a project

For the template to appear in reports for a specific project:

1. Open the project
2. Click **"Editar"** (Edit)
3. In the **"Report Template"** field, select the desired template (or "None")
4. Save

!!! note "One project, one template"
    Each project can have **at most 1 template** linked. If you want different fields per project type, create separate templates.

---

## 7. Editing a template already in use

You can edit a template even after reports have been created with it.

!!! warning "Edits are not retroactive"
    When you edit the template (add, remove, or change fields), **old reports are not affected**. They keep the fields and answers they had at the time of creation.

    **New reports** will use the updated template.

    This means required fields removed from the template do not invalidate old reports that did not have them. And new fields added do not appear in old reports.

---

## 8. Deactivating a template (soft delete)

Click **"Desativar"** (Deactivate) on the template card.

- The template disappears from the "Report Template" dropdown on projects
- Projects that already had the template linked **keep using it** in already-created reports
- To remove the link from a project, edit the project and select "None"

---

## 9. Best practices

### Name templates by job type

- "Complete Residential Renovation"
- "Post-Construction Cleaning"
- "Flooring Installation"
- "Damage Inspection"

### Use service_checklist to track WO progress

If the project has an approved Work Order, include the `service_checklist` field in the template. This allows the employee to mark exactly which WO items were completed that day — creating precise progress tracking.

### Avoid overly generic templates

A template with only "Notes" and "Photos" adds little value (that already exists in the basic report). Add specific fields for the type of work to make the report more useful.

---

## Important Rules

### Required permissions

| Operation | Super Admin | Admin | Employee |
|----------|:---:|:---:|:---:|
| View template list | Yes | Yes | **No** |
| Create template | Yes | Yes | No |
| Edit template | Yes | Yes | No |
| Deactivate template | Yes | Yes | No |
| Link template to project | Yes | Yes | No (employee cannot edit project) |
| Use template (fill report) | Yes | Yes | Yes |

### Validations and behaviors

!!! note "Validation only on report create/edit"
    Fields marked as required in the template are validated when the employee creates or edits the report. If the template is edited afterward, old reports are not invalidated.

!!! warning "Templates cannot be permanently deleted"
    Only soft delete (deactivate). This preserves the history of which fields existed when old reports were created.

---

## Quick summary

| You want to... | Do this... |
|-------------|-------------|
| View templates | Settings > Report Templates |
| Create template | + New Template > add fields > save |
| Edit template | Click on template > edit fields |
| Link to project | Edit project > "Report Template" dropdown |
| Deactivate template | "Desativar" on the card |
| See preview | Preview panel next to the fields editor |
