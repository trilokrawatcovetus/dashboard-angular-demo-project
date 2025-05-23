# Project Dashboard

## Overview

This project is an Angular application structured with standalone components and modular design. It includes various UI components, pages, and services to provide a dashboard, reports, settings, and data visualization features.

## Project Structure

- `src/app/components/`: Contains reusable UI components such as:
  - `data-chart`: Displays charts using Chart.js with dynamic theming support.
  - `metric-card`: Shows metric cards with dynamic data and styling.
  - `navbar`: Navigation bar component.
  - `transactions-table`: Displays transaction data in a table format.

- `src/app/pages/`: Contains page-level components:
  - `dashboard`: Main dashboard page with various widgets.
  - `reports`: Reports page with dynamic report cards, sortable recent reports table, and report generation/download features.
  - `settings`: Settings page with a reactive profile information form including validation and success feedback.

- `src/app/models/`: Contains TypeScript models for data structures such as metrics and transactions.

- `src/app/services/`: Contains services for data fetching and theme management.

- `src/app/app.component.ts`: Root component managing global layout and theme toggling.

## Key Features

- **Standalone Components**: Components are defined as standalone with explicit imports for better modularity.

- **Dynamic Theming**: ThemeService manages dark and light modes, with components reacting to theme changes.

- **Reactive Forms**: Settings page uses Angular ReactiveFormsModule for profile form with validation and success message.

- **Dynamic Reports**: Reports page displays report cards dynamically, supports sorting on recent reports, and includes report generation and dummy PDF download functionality.

- **Chart Integration**: DataChart component integrates Chart.js for interactive line charts with theming support.

- **Toast Notifications**: User feedback via toast messages on report generation.

## How to Start the Application

1. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

2. **Run the Development Server**

   Start the Angular development server with:

   ```bash
   npm start
   ```

   or

   ```bash
   ng serve
   ```

3. **Access the Application**

   Open your browser and navigate to:

   ```
   http://localhost:4200
   ```

4. **Build for Production**

   To build the project for production deployment:

   ```bash
   ng build --prod
   ```

## Additional Notes

- The project uses Angular standalone components, so ensure your Angular CLI version supports this feature.

- CSS files are separated per component for modular styling.

- The reports page includes dummy PDF generation for download functionality.

- The settings page form resets and hides success messages automatically after submission.

## File Highlights

- `src/app/app.component.ts`: Root component with external HTML and CSS files.

- `src/app/pages/reports/reports.component.ts`: Contains logic for report listing, sorting, generation, and download.

- `src/app/pages/settings/settings.component.ts`: Implements reactive form with validation.

- `src/app/components/data-chart/data-chart.component.ts`: Chart.js integration with dynamic theming.

## Contact

For any questions or issues, please contact the project maintainer.
