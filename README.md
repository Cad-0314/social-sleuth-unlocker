
# Instagram Password Finder (Simulation)

This is a simulated Instagram password hacking tool created for educational purposes only. The application demonstrates a multi-step process that mimics a hacking attempt but doesn't actually perform any malicious actions.

**IMPORTANT: This is a simulation and does not actually hack Instagram accounts.**

## Project Overview

This application simulates a hacking tool with the following workflow:
1. User enters an Instagram username and their own username
2. Application generates demo profile information (no real API calls)
3. User is directed to the payment page
4. User enters payment information
5. Application simulates "hacking" the account
6. A fake password is displayed as a "result"

## Project Structure

### Core Files

- `src/main.tsx`: The entry point for the application, wraps the app with the HackerContext provider.
- `src/App.tsx`: Main application component that sets up routing and global providers.
- `src/index.css`: Global CSS styles including matrix background and terminal styling.

### Pages

- `src/pages/Index.tsx`: Initial landing page where users enter an Instagram username. Generates demo profile data.
- `src/pages/VerificationPage.tsx`: Displays generated Instagram profile information and prompts the user to send a verification message.
- `src/pages/PaymentPage.tsx`: Collects payment information (credit card details).
- `src/pages/ProcessingPage.tsx`: Shows an animated progress bar and simulated hacking progress with terminal-style text.
- `src/pages/ResultsPage.tsx`: Displays the "hacked" password (fake) and account information.
- `src/pages/NotFound.tsx`: 404 error page for undefined routes.

### Context and State Management

- `src/context/HackerContext.tsx`: Global state management for the application, storing username, profile data, verification status, and payment status.

### UI Components

The project uses [shadcn/ui](https://ui.shadcn.com/) components:

#### Form Components
- `src/components/ui/input.tsx`: Text input component
- `src/components/ui/textarea.tsx`: Multi-line text input
- `src/components/ui/label.tsx`: Form label component
- `src/components/ui/button.tsx`: Button component
- `src/components/ui/checkbox.tsx`: Checkbox input
- `src/components/ui/radio-group.tsx`: Radio button group
- `src/components/ui/select.tsx`: Dropdown select component
- `src/components/ui/switch.tsx`: Toggle switch component
- `src/components/ui/slider.tsx`: Range slider component
- `src/components/ui/input-otp.tsx`: One-time password input

#### Layout Components
- `src/components/ui/card.tsx`: Card container component
- `src/components/ui/separator.tsx`: Visual divider
- `src/components/ui/aspect-ratio.tsx`: Maintains aspect ratio of content
- `src/components/ui/scroll-area.tsx`: Scrollable container
- `src/components/ui/resizable.tsx`: Resizable panels
- `src/components/ui/tabs.tsx`: Tabbed interface
- `src/components/ui/accordion.tsx`: Collapsible content sections
- `src/components/ui/popover.tsx`: Popup content
- `src/components/ui/hover-card.tsx`: Hover information card
- `src/components/ui/sheet.tsx`: Slide-in panel
- `src/components/ui/dropdown-menu.tsx`: Dropdown menu
- `src/components/ui/sidebar.tsx`: Side navigation panel

#### Feedback Components
- `src/components/ui/alert.tsx`: Alert message
- `src/components/ui/toast.tsx`: Toast notification
- `src/components/ui/sonner.tsx`: Toast notification manager
- `src/components/ui/progress.tsx`: Progress indicator
- `src/components/ui/skeleton.tsx`: Loading placeholder

#### Display Components
- `src/components/ui/avatar.tsx`: User avatar
- `src/components/ui/badge.tsx`: Status badge
- `src/components/ui/tooltip.tsx`: Tooltip information

### Utility Files

- `src/lib/utils.ts`: Utility functions, including the `cn` function for Tailwind class merging
- `src/hooks/use-mobile.tsx`: Hook for detecting mobile devices
- `src/hooks/use-toast.ts`: Hook for managing toast notifications

## Development

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Local Development

```sh
# Install dependencies
npm i

# Start development server
npm run dev
```

## Legal Disclaimer

This application is a simulation created for educational purposes only. It does not actually hack or attempt to hack Instagram accounts. Unauthorized access to accounts is illegal and unethical.

## License

© 2025 SocialSleuth. All rights reserved. This is a fictional project.
