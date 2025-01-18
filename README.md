# Trump Terminal 🎮

An interactive terminal interface styled after Trump's persona, featuring real-time chat, glitch effects, and retro pixel art aesthetics.

## ✨ Features

- 🤖 Trump-style AI responses using GPT
- 📺 Retro terminal UI with glitch effects
- 🎨 Pixel art animations
- 💾 Local storage for chat history
- 🌟 Real-time typing effects
- 🎮 Interactive social media links

## 🚀 Quick Start

1. **Clone and Install**
```bash
git clone https://github.com/trumpterminal/trumpterminal.git
cd trumpterminal
npm install
```

2. **Set up Environment Variables**
```bash
# Create a .env.local file and add:
OPENAI_API_KEY=your_api_key_here
```

3. **Run Development Server**
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://openai.com/api/)

## 📦 Project Structure

```
trump-terminal/
├── components/
│   ├── PixelTitle.tsx
│   ├── TrumpTerminal.tsx
│   ├── PixelSocials.tsx
│   └── GlitchTextBox.tsx
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── types/
│   └── types.ts
└── styles/
    └── globals.css
```

## 🎨 Features in Detail

- **Retro Terminal**: Custom-built terminal interface with pixel-perfect styling
- **AI Integration**: Real-time chat with Trump-persona AI responses
- **Glitch Effects**: Custom animations and glitch effects throughout the UI
- **Persistent Storage**: Chat history saved in localStorage
- **Responsive Design**: Works on all screen sizes
- **Custom Components**: Pixel art social media icons with glitch effects

## 🔧 Configuration

You can customize various aspects of the terminal:
- Modify the system prompt in `TrumpTerminal.tsx`
- Adjust glitch effect timing in `globals.css`
- Change color schemes in Tailwind configuration
- Update social media links in `PixelSocials.tsx`

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by retro terminals and Trump's unique speaking style
- Built with Next.js and the amazing React community
- Special thanks to OpenAI for the GPT API