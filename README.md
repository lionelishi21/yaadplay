# YaadPlay - Jamaica's Gaming Destination 🎮🇯🇲

A modern e-commerce website for gaming consoles and gift cards, built with Next.js and featuring a beautiful neumorphism design.

## Features

- 🎮 **Gaming Consoles**: PlayStation 5, Xbox Series X/S, Nintendo Switch, Steam Deck
- 💳 **Gift Cards**: PlayStation Store, Xbox Live, Nintendo eShop, Steam
- 🛒 **Shopping Cart**: Full cart functionality with quantity management
- 🎨 **Neumorphism Design**: Modern soft UI with depth and shadows
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop
- 🔍 **Search & Filter**: Find products quickly by category or search term
- ⚡ **Next.js**: Server-side rendering, optimized performance, and SEO-friendly

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

The built files will be optimized and ready for deployment.

## Tech Stack

- **Next.js 14** - React framework with SSR and routing
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Neumorphism Design** - Custom CSS utilities for soft UI

## Project Structure

```
yaadplay.com/
├── app/
│   ├── layout.jsx       # Root layout component
│   ├── page.jsx         # Home page component
│   └── globals.css      # Global styles with neumorphism utilities
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Design Features

### Neumorphism
The site uses custom neumorphism CSS utilities:
- `.neumorphism` - Standard raised effect
- `.neumorphism-inset` - Pressed/inset effect
- `.neumorphism-card` - Card component styling
- `.neumorphism-button` - Interactive button styling
- `.neumorphism-pressed` - Active/pressed state

### Color Scheme
- Jamaica Green (#00A859) - Primary brand color
- Jamaica Yellow (#FCD116) - Accent color
- Gray scale - Base UI colors

## Customization

### Adding Products

Edit the `products` array in `src/App.jsx`:

```javascript
{
  id: 13,
  name: 'Product Name',
  category: 'consoles', // or 'gift-cards'
  price: 99999, // Price in JMD cents
  image: '🎮', // Emoji or image URL
  description: 'Product description',
  rating: 4.5,
  inStock: true,
  featured: false
}
```

### Connecting to Make.com

To connect the survey form to Make.com, replace the webhook URL in the code with your Make.com webhook URL.

## License

© 2024 YaadPlay. All rights reserved.

