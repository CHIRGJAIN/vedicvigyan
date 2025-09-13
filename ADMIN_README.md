# VVES Admin Dashboard

## Overview
The VVES (Vedic Vigyanam Explorer Society) website includes a comprehensive admin dashboard for content management, system administration, and website maintenance.

## Features

### 🔐 Authentication
- **Login Credentials:**
  - Username: `adminuser`
  - Password: `VVESAdmin@2025`
- Session persistence using localStorage
- Secure logout functionality

### 📊 Dashboard Overview
- System statistics and metrics
- Recent activity feed
- Quick action buttons
- Real-time status indicators

### 🎨 Content Management System (CMS)
- **Page Management:** View and edit all website pages
- **Media Library:** Upload and manage images and documents
- **User Management:** Admin user controls
- **System Settings:** Configuration options
- **Analytics:** Live website statistics
- **Security:** System security status

### ✏️ Content Updates
- **Live Editor:** Real-time content editing
- **Form Fields:**
  - Hero title and subtitle
  - About text content
  - Contact information (email, phone)
- **Media Upload:** Drag-and-drop file uploads
- **Auto-save:** Automatic content saving

### 💾 Backup & Restore
- **Create Backup:** Full system backup functionality
- **Restore System:** Restore from previous backups
- **Backup History:** View all backup files
- **Confirmation Dialogs:** Safe restore operations

### 📚 Documentation
- **Admin Guide:** Complete usage instructions
- **Best Practices:** Recommended workflows
- **Keyboard Shortcuts:** Quick navigation
- **System Requirements:** Technical specifications

## Usage Instructions

### 1. Accessing the Admin Dashboard
1. Navigate to the VVES website
2. Click the "Login" button in the top navigation
3. Enter the admin credentials
4. Click "Admin Dashboard" to access the panel

### 2. Navigation
- Use the tab system to switch between different sections
- Each section has specific functionality:
  - **Overview:** Dashboard and quick actions
  - **CMS Access:** Content management tools
  - **Content Updates:** Live content editing
  - **Backup & Restore:** System maintenance
  - **Documentation:** Help and guides

### 3. Content Management
1. Go to "Content Updates" tab
2. Edit the desired fields
3. Click "Save Changes" to update
4. Changes are applied immediately

### 4. Backup Operations
1. Navigate to "Backup & Restore" tab
2. Click "Create Backup" for new backup
3. Use "Restore System" to restore from backup
4. Confirm all restore operations

## Technical Details

### Frontend-Only Implementation
- No backend authentication required
- All data stored in browser localStorage
- Simulated API calls for realistic experience
- Responsive design for all devices

### Security Features
- Session management
- Secure logout
- Input validation
- Error handling

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled required
- Minimum resolution: 1024x768

## Development Notes

### File Structure
```
components/
├── AdminContext.tsx      # Authentication context
├── LoginModal.tsx        # Login interface
└── Navigation.tsx        # Updated with admin features

app/
├── admin/
│   └── page.tsx         # Admin dashboard
└── layout.tsx           # Updated with AdminProvider
```

### Key Components
- **AdminContext:** Manages authentication state
- **LoginModal:** Handles user login
- **AdminDashboard:** Main admin interface
- **Navigation:** Updated with login/admin buttons

### Styling
- Uses Tailwind CSS with custom VVES color palette
- Responsive design with mobile-first approach
- Smooth animations using Framer Motion
- Consistent with main website design

## Support
For technical support or questions, contact the development team at `dev@vves.org`

---
*This admin dashboard is designed for demonstration purposes and includes frontend-only functionality.*
