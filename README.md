![5467b291-becc-4208-8770-e84333c79903](https://github.com/user-attachments/assets/4e633a22-71b5-434f-b315-7301c54af78d)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/traves-theberge/OFCA/graphs/commit-activity)
[![Discord](https://img.shields.io/discord/1234567890?color=7289da&label=Discord&logo=discord&logoColor=ffffff)](https://discord.gg/your-invite-link)

*A powerfully elegant CLI for unified access to multiple AI providers*

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Configuration](#-configuration) • [Contributing](#-contributing)

</div>

## 🎯 Overview

The LLM CLI Toolkit is a sophisticated command-line interface that provides seamless integration with multiple AI providers through a unified, elegant interface. Built with modern JavaScript and featuring a stunning powerline-style terminal UI, OFCA makes interacting with various AI models as simple as a single function call.

## ✨ Features

### 🤖 Supported Providers
- **OpenAI** - GPT-4, GPT-3.5-Turbo
- **Anthropic** - Claude 3 Opus, Sonnet, Haiku
- **OpenRouter** - Multiple model aggregation
- **Groq** - Ultra-fast inference
- **Grok** - X's AI powerhouse
- **Mistral** - Advanced open models

### 🎨 UI Features
- **Powerline Style** - Modern terminal aesthetics
- **Provider Themes** - Unique gradients per provider
- **Smart Icons** - Nerd Font integration
- **Responsive Design** - Adapts to terminal size

### 🛠 Technical Features
- **Async Architecture** - Non-blocking operations
- **Error Resilience** - Comprehensive error handling
- **Demo Mode** - Try without API keys
- **Smart Caching** - Optimized responses

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/traves-theberge/OFCA.git

# Install dependencies
cd OFCA
npm install

# Set up environment variables
cp .env.example .env
```

## 🚀 Usage

```bash
# Start in normal mode
npm start

# Start in demo mode
npm run demo
```

## ⚙️ Configuration

Create a `.env` file with your API keys:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OPENROUTER_API_KEY=sk-or-...
GROQ_API_KEY=gsk-...
GROK_API_KEY=grok-...
MISTRAL_API_KEY=...
```

## 🎮 Interactive Commands

During chat sessions, you can use these special commands:

| Command | Description |
|---------|-------------|
| `/switch` | Change provider or model |
| `/model` | List available models |
| `/help` | Show command list |
| `/clear` | Clear chat history |
| `/exit` | End session |

## 🎨 Themes and Customization

OFCA features unique themes for each provider:

| Provider | Theme Colors | Icon |
|----------|-------------|------|
| OpenAI | Green gradient | 🤖 |
| Anthropic | Purple gradient | 🌟 |
| OpenRouter | Orange gradient | 🌐 |
| Groq | Blue gradient | ⚡ |
| Grok | Red gradient | 🤘 |
| Mistral | Indigo gradient | 🌪️ |

## 🔧 Advanced Configuration

### Custom Model Settings
```json
{
  "temperature": 0.7,
  "maxTokens": 2000,
  "topP": 0.9,
  "frequencyPenalty": 0.0,
  "presencePenalty": 0.0
}
```

### Rate Limiting
```env
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_WINDOW=60000
```

## 🔍 Troubleshooting

### Common Issues

#### API Key Problems
```bash
# Verify API keys
npm run check-env

# Test specific provider
npm run test-provider openai
```

#### Connection Issues
- Check internet connection
- Verify API endpoint status
- Ensure proper proxy configuration

#### Model Availability
- Confirm model access level
- Check provider status page
- Try fallback models

## 📊 Performance Optimization

### Caching Strategy
- Response caching
- Model preloading
- Connection pooling

### Memory Management
- Automatic garbage collection
- Stream processing
- Buffer optimization

## 🔒 Security Best Practices

1. **API Key Management**
   - Use environment variables
   - Rotate keys regularly
   - Never commit keys to repo

2. **Data Protection**
   - Local message encryption
   - Secure storage
   - Privacy controls

3. **Access Control**
   - Rate limiting
   - IP restrictions
   - Usage monitoring

## 📚 Documentation

Detailed documentation is available in the [Wiki](https://github.com/traves-theberge/OFCA/wiki).

## 🤝 Contributing

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/OFCA.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

### Coding Standards

- ESLint configuration
- Prettier formatting
- JSDoc comments
- Unit test coverage

### Pull Request Process

1. Update documentation
2. Add unit tests
3. Follow commit conventions
4. Request review

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/traves-theberge">
        <img src="https://github.com/traves-theberge.png" width="100px;" alt="Traves Theberge"/><br />
        <sub><b>Traves Theberge</b></sub>
      </a><br />
      <sub>Project Lead</sub>
    </td>
  </tr>
</table>

## 🙏 Acknowledgments

Special thanks to [Echo Hive](https://echohive.ai) for their invaluable support and contributions to this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer)

</div>
