# SalesPulse

SalesPulse is a modern sales analytics dashboard built with React, TypeScript, and Tailwind CSS. It provides comprehensive insights into sales performance, customer analysis, and team metrics.

## Features

- **Dashboard Overview**: Real-time metrics and KPIs for sales performance
- **Regional Insights**: Geographic sales distribution and performance metrics
- **Customer Analysis**: Detailed customer segmentation and behavior analytics
- **Product Trends**: Product performance tracking and category analysis
- **Sales Team**: Team performance metrics and individual rep analytics
- **Reports**: Customizable reports generation and export functionality
- **Settings**: Personalized dashboard configuration options

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts for data visualization
- Lucide React for icons
- Date-fns for date manipulation
- HeadlessUI for accessible UI components

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd salespulse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components for each route
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Key Components

- **DashboardLayout**: Main layout component with navigation and routing
- **MetricCard**: Reusable component for displaying key metrics
- **SalesChart**: Chart component for visualizing sales data
- **DataTable**: Sortable table component for detailed data view

## Features in Detail

### Dashboard Overview
- Real-time sales metrics
- Revenue and units sold trends
- Exportable sales data

### Regional Insights
- Geographic sales distribution
- Region-specific performance metrics
- Interactive map visualization (coming soon)

### Customer Analysis
- Customer segmentation
- Buying patterns
- Satisfaction metrics

### Product Trends
- Category performance
- Top products analysis
- Inventory metrics

### Sales Team
- Individual rep performance
- Team metrics
- Quota attainment tracking

### Reports
- Customizable report generation
- Multiple export formats
- Scheduled reports

## Settings and Customization

Users can customize their experience through the Settings page:
- Theme preferences (Light/Dark/System)
- Notification preferences
- Display options
- Currency and date format settings

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
