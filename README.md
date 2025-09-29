# Aarogya-AI - AI-Driven Public Health Chatbot

A comprehensive multilingual AI chatbot system for disease awareness and preventive healthcare education targeting rural and semi-urban populations in India.

## 🚀 Features

- **Multilingual Support**: English, Hindi, and Odia
- **AI-Powered Chatbot**: Intelligent health information and symptom checking
- **WhatsApp Integration**: Seamless Twilio WhatsApp API integration
- **Voice Interaction**: Speech-to-text and text-to-speech capabilities
- **Disease Library**: Comprehensive database of diseases with symptoms and prevention
- **Vaccination Schedule**: Personalized vaccine recommendations
- **Health Alerts**: Real-time outbreak notifications
- **Analytics Dashboard**: User engagement and health query tracking

## 🛠️ Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Supabase
- **WhatsApp API**: Twilio
- **Deployment**: Vercel/Netlify
- **Voice**: Web Speech API

## 📱 WhatsApp Integration

### Setup Instructions

1. **Twilio Account Setup**:
   - Create a Twilio account at [twilio.com](https://www.twilio.com)
   - Get your Account SID and Auth Token from the Console
   - Enable WhatsApp Sandbox or verify your WhatsApp Business number

2. **Environment Variables**:
   Create a `.env` file in the root directory and add the following variables. Do not commit real secrets.
   ```env
   # Frontend (Vite) env vars
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
   VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
   VITE_TWILIO_WHATSAPP_NUMBER=your_whatsapp_number_here

   # Serverless (Vercel) env vars for webhook verification
   TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

3. **WhatsApp Sandbox Configuration**:
   - Go to Twilio Console > Messaging > Try it out > Send a WhatsApp message
   - Follow the sandbox setup instructions
   - Add your phone number to the sandbox for testing

### WhatsApp Features

- **Smart Redirection**: Automatically detects mobile/desktop and opens appropriate WhatsApp interface
- **Localized Messages**: Initial messages in user's preferred language
- **Floating Button**: Always-accessible WhatsApp button in chat interface
- **Secure Integration**: Environment variables for sensitive credentials

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd aarogya-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📱 Usage

### Web Interface
1. Visit the application URL
2. Choose your preferred language (English/Hindi/Odia)
3. Click "Start Chat" to begin chatbot interaction
4. Or click "Chat on WhatsApp" to continue on WhatsApp

### WhatsApp Integration
- The WhatsApp button automatically:
  - Opens WhatsApp app on mobile devices
  - Opens WhatsApp Web on desktop browsers
  - Sends a localized greeting message
  - Connects to your Twilio WhatsApp number

## 🔧 Configuration

### Twilio WhatsApp Setup

1. **Sandbox Mode** (for testing):
   - Use Twilio's WhatsApp Sandbox
   - No business verification required
   - Limited to pre-approved phone numbers

2. **Production Mode**:
   - Verify your WhatsApp Business Account
   - Complete Twilio's business verification process
   - Submit WhatsApp Business API application

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndHlob2tvdmlxZnhseW5udGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzA1MzksImV4cCI6MjA3NDcwNjUzOX0.P7rrCMqe_2N1k-4Nc_q2AA2YarBIu-TwGe87Y5LJ8H8` |
| `VITE_TWILIO_ACCOUNT_SID` | Twilio Account SID | `ACdd8aa2d1e21a02b1a3e8858fdf00e223` |
| `VITE_TWILIO_AUTH_TOKEN` | Twilio Auth Token | `9173269b214fcdc86c6ae1bf0caa5ebc` |
| `VITE_TWILIO_WHATSAPP_NUMBER` | WhatsApp Business Number | `9917250558` |
## 🔒 Security

- Environment variables for sensitive credentials
- HTTPS enforcement for production
- Input sanitization for user messages
- Rate limiting for API calls

## 📊 Analytics

The application includes built-in analytics for:
- User engagement metrics
- Popular health queries
- Language preferences
- Geographic usage patterns
- WhatsApp vs web usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact via WhatsApp: +91 9917250558
- Email: support@aarogya-ai.com

## 🙏 Acknowledgments

- Twilio for WhatsApp API
- Supabase for backend services
- React and Tailwind CSS communities
- Healthcare professionals for content validation