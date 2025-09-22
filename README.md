# DRT Rules Builder

A powerful, intuitive interface for building and managing dynamic business rules with drag-and-drop functionality. Built with Next.js, TypeScript, and shadcn/ui components.

![DRT Rules Builder](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎯 Drag & Drop Interface**: Reorder rules with intuitive drag-and-drop functionality
- **📊 Data-Driven Configuration**: All dropdowns and input types driven by JSON configuration
- **🔧 Smart Input Types**: Dynamic inputs based on condition type (number, date, dropdown)
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **⚡ Real-time Updates**: Instant rule validation and state management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AMarcinkiewicz/drt-rules-app.git
   cd drt-rules-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### Building Rules

1. **Add a New Rule**: Click "Add New Rule" to create your first rule
2. **Select Rule Type**: Choose from If, And, Then, or Or logic operators
3. **Define Condition**: Select from 25+ condition types (Tenure, Age, Job Title, etc.)
4. **Set Operator**: Choose appropriate operators (=, <, >, ≠, etc.)
5. **Input Value**: Enter values using smart input types:
   - **Number inputs** for numeric values
   - **Date pickers** for date conditions
   - **Dropdowns** for predefined options
6. **Reorder Rules**: Drag and drop rule rows to reorder them
7. **Delete Rules**: Click the trash icon to remove unwanted rules

### Configuration

The app uses `src/data/drt-config.json` to drive all form behavior:

```json
{
  "ruleTypes": ["If", "And", "Then", "Or"],
  "conditions": {
    "Tenure": {
      "operators": ["=, < , > , >or=, <or=, ≠"],
      "values": ["Months", "X Days", "Years"],
      "inputType": "number"
    },
    "Age": {
      "operators": ["=, < , > , >or=, <or=, ≠"],
      "values": ["Years"],
      "inputType": "dropdown"
    }
  }
}
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   └── rules-builder/
│       └── page.tsx        # Rules builder interface
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── RuleRow.tsx         # Individual rule row component
├── data/
│   └── drt-config.json     # Configuration data
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Customization

### Adding New Condition Types

Edit `src/data/drt-config.json` to add new condition types:

```json
{
  "conditions": {
    "Your New Condition": {
      "operators": ["=", "≠"],
      "values": ["Option 1", "Option 2"],
      "inputType": "dropdown"
    }
  }
}
```

### Input Types

- `"number"`: Numeric input field
- `"date"`: Date picker
- `"dropdown"`: Select dropdown with predefined values
- `"text"`: Default text input

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alex Marcinkiewicz**
- GitHub: [@AMarcinkiewicz](https://github.com/AMarcinkiewicz)
- Project: [DRT Rules Builder](https://github.com/AMarcinkiewicz/drt-rules-app)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [@dnd-kit](https://dndkit.com/) for the accessible drag-and-drop functionality
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**