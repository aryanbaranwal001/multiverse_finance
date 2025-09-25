# 🌌 Multiverse Finance

**A Next-Generation Prediction Markets Platform on Aptos Blockchain**

Multiverse Finance is a decentralized prediction markets platform that enables users to trade on the outcomes of real-world events. Built with cutting-edge technology including Next.js 15, React 19, and Aptos blockchain integration.

## 🌟 Why Multiverse Finance?

**Superior to Traditional Prediction Markets:**

- **⚡ Lightning Fast**: Aptos blockchain delivers sub-second transaction finality vs. minutes on Ethereum
- **💰 Ultra-Low Fees**: Pay cents instead of $10-50 gas fees per trade
- **🔒 True Decentralization**: No centralized servers or KYC requirements - trade anonymously with just a wallet
- **🎯 Real-Time Pricing**: Dynamic market prices update instantly without waiting for block confirmations
- **🌐 Global Access**: Available 24/7 worldwide without geographic restrictions or banking limitations
- **🛡️ Transparent & Auditable**: All trades and outcomes recorded immutably on-chain with full transparency
- **🚀 Modern UX**: Web3 experience that feels like Web2 - no complex interfaces or confusing workflows

*Traditional platforms are slow, expensive, and centralized. Multiverse Finance delivers the future of prediction markets today.*

## 🚀 Features

### 🎯 **Prediction Markets**
- **Multi-Category Markets**: Trade across trending topics, politics, sports, crypto, economics, and more
- **Real-Time Trading**: Instant YES/NO token purchases with live price updates
- **Market Analytics**: Comprehensive market data with interactive charts and sentiment analysis
- **AI-Powered Insights**: Market sentiment analysis powered by DeepSeek AI

### 💰 **Blockchain Integration**
- **Aptos Blockchain**: Fast, secure, and low-cost transactions
- **Native APT Payments**: Purchase prediction tokens using APT cryptocurrency
- **Smart Contract Security**: Audited Move smart contracts for token minting and trading
- **Wallet Integration**: Seamless connection with Aptos-compatible wallets

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Beautiful dark mode with customizable color schemes
- **Interactive Charts**: Real-time market probability visualization
- **Smooth Animations**: Polished user experience with fluid transitions

### 🔧 **Advanced Features**
- **Wallet Persistence**: Automatic reconnection across browser sessions
- **Search & Filter**: Find markets quickly with real-time search
- **Bookmarking**: Save favorite markets for easy access
- **Market Categories**: Organized navigation across different market types

## 🏗️ Architecture

### **Frontend Stack**
- **Next.js 15** with App Router and Turbopack
- **React 19** with latest features and optimizations
- **TypeScript** for type safety and developer experience
- **Tailwind CSS v4** for modern styling
- **Zustand** for efficient state management
- **Recharts** for interactive data visualization

### **Blockchain Stack**
- **Aptos Blockchain** (Testnet)
- **Move Smart Contracts** for prediction market logic
- **Aptos TypeScript SDK** for blockchain interactions
- **Wallet Adapter** for seamless wallet integration

### **Smart Contract Features**
- **Token Minting**: YES/NO tokens with configurable pricing
- **APT Payments**: Secure APT transfers for token purchases
- **Market Management**: Automated supply tracking and price calculations
- **Metadata Storage**: On-chain token and market information

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Aptos CLI
- Git

### 1. Clone Repository
```bash
git clone https://github.com/aryanbaranwal001/multiverse_finance.git
cd multiverse_finance
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Smart Contract Setup
```bash
cd contracts
aptos move compile
aptos move publish --named-addresses prediction_market=default
```

### 4. Environment Configuration
The app is pre-configured for Aptos testnet with the deployed contract:
- **Contract Address**: `0x8b421ba847e4a8bb1726290fe9928f19290225fb1424f8b18f70116b61138343`
- **Network**: Aptos Testnet
- **Module**: `ai_jobs_market`

## 📱 Usage

### Getting Started
1. **Connect Wallet**: Click "Connect Wallet" and select your Aptos wallet
2. **Browse Markets**: Explore prediction markets across different categories
3. **Analyze Markets**: View charts, sentiment analysis, and market data
4. **Trade Tokens**: Purchase YES/NO tokens using APT
5. **Track Performance**: Monitor your positions and market outcomes

### Trading Flow
1. Select a prediction market
2. Choose YES (event will happen) or NO (event won't happen)
3. Enter the USD amount you want to invest
4. Confirm the transaction in your wallet
5. Receive prediction tokens based on current market prices

### Market Pricing
- **YES Tokens**: $0.62 per token
- **NO Tokens**: $0.38 per token
- **APT Rate**: $4.21 per APT (configurable)
- **Decimals**: 8 decimal places for precision

## 🔧 Smart Contract Details

### Core Functions
```move
// Initialize a new prediction market
public entry fun initialize_market(admin: &signer)

// Purchase YES tokens with APT
public entry fun buy_yes_tokens(buyer: &signer, market_address: address, apt_amount: u64)

// Purchase NO tokens with APT  
public entry fun buy_no_tokens(buyer: &signer, market_address: address, apt_amount: u64)

// View market information
public fun get_market_info(market_address: address): (u64, u64, u64, u64)
```

### Token Economics
- **Payment Method**: APT (Aptos Coin)
- **Price Discovery**: Fixed pricing model with USD pegging
- **Supply Tracking**: Automatic supply updates on token minting
- **Transfer Security**: Secure APT transfers before token minting

## 🎨 Customization

### Theme Configuration
The app supports multiple color schemes:
- **Blue** (Default)
- **Green** 
- **Purple**
- **Orange**
- **Pink**

Themes can be changed in the settings panel.

### Adding New Markets
Markets are currently configured in `/src/data/markets.ts`. To add new markets:

1. Add market data to the markets array
2. Include relevant metadata (title, description, category, etc.)
3. Set initial probability percentages
4. Deploy updated market contracts if needed

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
npm run start
```

### Smart Contract Deployment
```bash
cd contracts
aptos move publish --named-addresses prediction_market=<YOUR_ADDRESS>
```

Update the contract address in `/src/config/contract.ts` after deployment.

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run lint
npm run build
```

### Smart Contract Testing
```bash
cd contracts
aptos move test
```

### Manual Testing
1. Connect wallet on testnet
2. Ensure sufficient APT balance
3. Test token purchases
4. Verify APT deduction and token receipt

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clean, documented Move code
- Test all blockchain interactions
- Maintain responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Contract Explorer**: [View on Aptos Explorer](https://explorer.aptoslabs.com/account/0x8b421ba847e4a8bb1726290fe9928f19290225fb1424f8b18f70116b61138343?network=testnet)
- **Documentation**: [Project Wiki]
- **Support**: [GitHub Issues](https://github.com/aryanbaranwal001/multiverse_finance/issues)

## 🙏 Acknowledgments

- **Aptos Labs** for the blockchain infrastructure
- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **DeepSeek AI** for market sentiment analysis
- **Community Contributors** for feedback and improvements

---

**Built with ❤️ for the future of decentralized prediction markets**
