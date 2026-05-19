# Service Catalog - User Guide

The **Service Catalog** is where the admin manages the categories and services that appear in Work Orders. It replaced the old 16 hardcoded categories — the catalog is now dynamic and fully configurable.

---

## 1. What is the Service Catalog

The catalog is the **source of truth** for all services your company performs. It feeds:

- **Work Orders** — when adding an item, the employee/admin picks Category → Service
- **PDF Import** — the system uses service descriptions to automatically map items extracted from external PDFs
- **Pricing** — each service has a default price (`defaultUnitPrice`) that serves as the base

---

## 2. Accessing

On the sidebar, go to **Settings** (or directly to `/settings/services`). Available to **administrators**.

The catalog has **2 tabs**:

| Tab | What it contains |
|-----|-----------------|
| **Categories** | Groups of services (e.g., PNT - Painting) |
| **Services** | Individual items within each category |

---

## 3. Categories

### What is a category

A category groups related services. Examples of factory-seeded categories:

| Code | Name |
|------|------|
| FRM | Framing |
| PNT | Painting |
| DRY | Drywall |
| TIL | Tile |
| PLM | Plumbing |

### Category fields

| Field | Required | Description |
|-------|:---:|-----------|
| **code** | Yes | Unique abbreviation (e.g., `PNT`). Used in WOs to identify the category |
| **name** | Yes | Readable name (e.g., "Painting") |
| **description** | No | Description of what the category covers |
| **sortOrder** | Yes | Display order in WOs (job execution sequence) |
| **color** | No | Visual color for quick identification |
| **icon** | No | Optional icon |
| **active** | Yes | Whether it is active (visible in WOs) |

### Creating a category

1. **"Categories"** tab > click **"+ Nova Categoria"** (+ New Category)
2. Fill in code, name, sort order
3. Save

### Deactivating a category (soft delete)

!!! warning "Deactivate, never delete"
    Click **"Desativar"** (Deactivate) — the category disappears from new WOs, but old WOs that already had items from this category remain intact (snapshot preserves name and code).

    There is no permanent "Delete" — this protects the history of old WOs.

---

## 4. Services

### What is a service

A service is a specific item within a category. Examples:

- Category **PNT**: `Paint trim/casing`, `Paint walls`, `Paint ceiling`
- Category **DRY**: `Hang drywall`, `Tape and mud`, `Patch drywall`

### Service fields

| Field | Required | Description |
|-------|:---:|-----------|
| **categoryId** | Yes | Which category it belongs to |
| **name** | Yes | Service name (e.g., "Paint trim/casing") |
| **description** | No | Rich description — **helps the AI classify automatically** in PDF imports |
| **defaultAction** | Yes | Default action: `Install`, `Remove`, or `Detach & Reset` |
| **defaultType** | Yes | Default type: `Labor`, `Material`, or `Equipment` |
| **defaultUnit** | Yes | Default unit: `EA`, `SF`, `LF`, `SY`, or `HR` |
| **defaultUnitPrice** | Yes | Default unit price (≥ 0) — used as the `default` price source in WOs |
| **active** | Yes | Whether it is active (visible in WOs) |
| **sortOrder** | No | Order within the category |

### Creating a service

1. **"Services"** tab > click **"+ Novo Serviço"** (+ New Service)
2. Select the **category**
3. Fill in name, description, action, type, unit, price
4. Save

!!! tip "Invest in the description"
    A good description greatly increases the accuracy of automatic PDF mapping. The AI uses the `description` field to understand what the service covers and match it against items from external WOs.

    Poor example: `Paint trim`
    Good example: `Paint door frames, window casings, baseboards and trim elements. Includes prep and 2 coats.`

### Deactivating a service (soft delete)

Click **"Desativar"** (Deactivate) on the service card.

- The service disappears from the "Add item" dropdown in new WOs
- Items already in existing WOs are preserved (snapshot freezes name, category, action, type, unit)
- If a Daily Report item used this service via service_checklist, it shows a **"Removed from WO"** badge

---

## 5. How the catalog feeds Work Orders

### Adding items via catalog

When clicking **"+ Adicionar item"** (+ Add item) in a WO:

1. User selects **Category** (dropdown)
2. User selects **Service** within the category
3. System auto-fills:
   - `action` = service's `defaultAction`
   - `type` = service's `defaultType`
   - `unit` = service's `defaultUnit`
   - `unitPrice` = service's `defaultUnitPrice` (source: `default`)
4. User adjusts quantity, room, notes and can change the price source

### PDF Import

When you import an external WO PDF, the AI uses the **descriptions** of registered services to automatically map each item extracted from the PDF.

Unrecognized items appear with a **"Classify"** badge — the admin manually picks the correct service.

---

## 6. Seed data

The system comes with a **factory seed** with 17 categories and ~46 example services covering:

- Framing, Electrical, Insulation, Drywall, Mud/Taping
- Finish Carpentry, Painting, Floor Covering, Tile
- Plumbing, Details/Hardware, Glass
- Cleaning, Touch Ups, Contents, Demolition
- And more...

You can use the seed as a starting point and customize it to match the services your company offers.

---

## Important Rules

### Required permissions

| Operation | Super Admin | Admin | Employee |
|----------|:---:|:---:|:---:|
| View catalog | Yes | Yes | **No** (read-only via WO) |
| Create category | Yes | Yes | No |
| Edit category | Yes | Yes | No |
| Deactivate category | Yes | Yes | No |
| Create service | Yes | Yes | No |
| Edit service | Yes | Yes | No |
| Deactivate service | Yes | Yes | No |

### Validations and behaviors

!!! warning "Category code must be unique"
    The `code` field (e.g., `PNT`) must be unique across the entire catalog. The system blocks duplicates.

!!! note "Soft delete protects history"
    Deactivating a category/service **never affects existing WOs**. The snapshot of each WO item freezes the data at the time of creation.

!!! tip "Zero price is valid"
    `defaultUnitPrice` can be `0` (e.g., services included in a package). But the value is required — it cannot be left blank.

### Defaults

| Setting | Value |
|---|---|
| `active` on creation | `true` |
| `defaultUnitPrice` minimum | 0 |
| Factory seed | 17 categories + ~46 services |

---

## Quick summary

| You want to... | Do this... |
|-------------|-------------|
| View categories | Settings > Service Catalog > Categories tab |
| View services | Settings > Service Catalog > Services tab |
| Create category | + New Category > code, name, sort order |
| Create service | + New Service > category, name, description, price defaults |
| Deactivate category/service | "Desativar" (Deactivate) button on card |
| Reactivate | "Ativar" (Activate) button on card |
