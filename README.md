# Todoist Clone — Project Brief

> **Duration:** 6 Weeks  
> **Tech Stack:** React, TypeScript, Vite, TailwindCSS, Zustand, TanStack Query  
> **API:** Todoist REST API v2

---

## Project Goal

Build a functional task management app that clones core Todoist features using real API data.

**Reference:** https://todoist.com/app  
**API Docs:** https://developer.todoist.com

---

## Week 1: Foundation

### Objectives
- Set up project with all required technologies
- Connect to Todoist API and fetch tasks
- Display tasks in a basic UI

### Deliverables
- [ ] Working development environment
- [ ] Tasks fetched from API and displayed
- [ ] Loading and error states handled

### Research Topics
- How to set up Vite with React + TypeScript
- How to configure TailwindCSS
- How to use TanStack Query for data fetching
- How to handle API authentication with Bearer tokens

---

## Week 2: Core CRUD

### Objectives
- Implement full task Create, Read, Update, Delete operations
- Handle task completion

### Deliverables
- [ ] Create new tasks
- [ ] Edit task content
- [ ] Delete tasks
- [ ] Mark tasks complete/incomplete
- [ ] Changes persist (verify by refreshing)

### Research Topics
- TanStack Query mutations
- Optimistic updates
- Form handling in React

---

## Week 3: Projects

### Objectives
- Fetch and display projects
- Filter tasks by project
- Manage project CRUD

### Deliverables
- [ ] Projects shown in sidebar
- [ ] Click project to filter tasks
- [ ] Create and delete projects
- [ ] Inbox as default view

### Research Topics
- Zustand for UI state management
- Filtering data based on selection
- Component composition patterns

---

## Week 4: Task Properties

### Objectives
- Add priority levels to tasks
- Add due dates with date picker
- Add labels/tags

### Deliverables
- [ ] Priority selector (P1-P4) with colors
- [ ] Date picker for due dates
- [ ] Display overdue tasks differently
- [ ] Labels can be added to tasks

### Research Topics
- Building reusable picker components
- Date formatting with date-fns
- Working with the Todoist API date fields

---

## Week 5: Views & Search

### Objectives
- Create Today and Upcoming views
- Implement search functionality
- Add filtering options

### Deliverables
- [ ] Today view (due today + overdue)
- [ ] Upcoming view (grouped by date)
- [ ] Search tasks by title
- [ ] Filter by priority

### Research Topics
- Client-side filtering strategies
- Debouncing search input
- Grouping and sorting data

---

## Week 6: Polish

### Objectives
- Add drag and drop reordering
- Implement keyboard shortcuts
- Add dark mode
- Ensure responsive design

### Deliverables
- [ ] Drag tasks to reorder
- [ ] Keyboard shortcuts (Q = quick add, / = search)
- [ ] Dark/light mode toggle
- [ ] Works on mobile screens

### Research Topics
- @dnd-kit library
- Keyboard event handling in React
- CSS theming strategies
- Responsive design with Tailwind

---

## Technical Constraints

| Rule | Requirement |
|------|-------------|
| TypeScript | Strict mode, no `any` types |
| State | Server state in TanStack Query, UI state in Zustand |
| Styling | TailwindCSS only (no CSS modules or styled-components) |
| API | Must use real Todoist API, not mock data |
| Git | Meaningful commits, push daily |

---

## What Success Looks Like

### Must Have (80% of grade)
- All CRUD operations work
- Projects and task filtering work
- Today/Upcoming views work
- App doesn't crash, handles errors gracefully

### Should Have (15% of grade)
- Search and filters work
- Priorities and due dates work
- UI is clean and usable

### Nice to Have (5% of grade)
- Drag and drop
- Keyboard shortcuts
- Dark mode
- Responsive design

---

## Resources

| Resource | URL |
|----------|-----|
| Todoist API | https://developer.todoist.com |
| TanStack Query | https://tanstack.com/query/latest |
| Zustand | https://docs.pmnd.rs/zustand |
| TailwindCSS | https://tailwindcss.com/docs |
| date-fns | https://date-fns.org |

---

## Expectations

1. **Research First** — Try to solve problems yourself before asking
2. **Document Blockers** — If stuck for more than 2 hours, ask for help
3. **Daily Commits** — Push code every day, even if incomplete
4. **Weekly Demo** — Present working features each Friday

---

## Questions to Answer Yourself

Before starting each week, research and answer:

**Week 1:**
- What is the difference between query and mutation in TanStack Query?
- Why do we need a query key?

**Week 2:**
- What is an optimistic update and why use it?
- How do you invalidate a query after a mutation?

**Week 3:**
- When should you use Zustand vs TanStack Query?
- How do you structure a Zustand store?

**Week 4:**
- How does Todoist API handle due dates (date vs datetime vs string)?
- What's the best way to build a reusable date picker?

**Week 5:**
- What is debouncing and why is it important for search?
- How do you filter an array by multiple criteria?

**Week 6:**
- How does @dnd-kit work?
- What's the best approach for theming in Tailwind?

---

*Good luck! The best learning happens when you figure things out yourself.*