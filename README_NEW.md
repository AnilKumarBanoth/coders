# Coders - Realtime Collaborative Code Editor

> A powerful web-based collaborative code editor that enables real-time pair programming, remote coding interviews, and team development. Write code together, see changes instantly, and execute code as a team—all in your browser.

[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green?logo=node.js)](https://nodejs.org)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-red?logo=socket.io)](https://socket.io)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com)

---

## 🚀 What is Coders?

**Coders** is a real-time collaborative code editor that allows multiple programmers to write and execute code together in the same virtual room. Perfect for:

- 🎓 **Online Teaching**: Instructors teaching programming to students remotely
- 💼 **Job Interviews**: Conducting real-time coding interviews
- 👥 **Pair Programming**: Two developers working on the same task
- 🐛 **Code Reviews**: Team leads reviewing junior developer code
- 🤝 **Team Development**: Multiple team members building features together
- 📚 **Learning**: Students learning with tutors in real-time

---

## ✨ Core Features

### 1. **Real-Time Code Synchronization** ⚡
- Write code and see changes on all connected clients **instantly**
- No lag, no delays—sub-second synchronization
- Automatic cursor position preservation
- Prevents code conflicts with smart update handling

### 2. **Multi-User Collaboration** 👥
- Create unique room IDs or join existing rooms
- See all connected users with auto-generated avatars
- Username tracking and display in sidebar
- Join/leave notifications for all team members
- Supports unlimited concurrent users per room

### 3. **Multi-Language Code Editor** 💻
- Support for **6+ programming languages**:
  - JavaScript (ES6+)
  - Python (3.10.0)
  - Java (15.0.2)
  - C++ (Latest)
  - C# (6.12.0)
  - PHP (8.2.3)
- Monaco Editor (same as VS Code)
- Syntax highlighting for all supported languages
- Perfect indentation and code formatting
- VS Code keyboard shortcuts

### 4. **Code Execution Engine** ▶️
- Execute code instantly without any setup
- Supports multiple programming languages
- View output in real-time
- Error messages displayed clearly
- Safe, sandboxed execution environment

### 5. **AI-Powered Error Detection & Suggestions** 🤖
- Real-time code analysis as you type
- **Error Detection**:
  - Syntax error identification
  - Missing braces/brackets detection
  - Language-specific pattern matching
  - Exact line number reporting
  
- **Smart Suggestions**:
  - Code quality improvements
  - Security warnings (eval, innerHTML, XSS)
  - Best practice recommendations
  - Performance optimization tips
  - Language-specific suggestions (var vs const/let, === vs ==)

### 6. **Responsive Design** 📱
- Works on desktop, tablet, and mobile devices
- Mobile-optimized sidebar menu
- Adaptive layout based on screen size
- Touch-friendly interface

### 7. **Late Joiner Synchronization** 🔄
- New users automatically receive current code
- Language synchronization on join
- No need to re-share or re-explain code
- Complete state preservation

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1.0 | UI Framework |
| **Vite** | 6.3.5 | Build tool & dev server |
| **Monaco Editor** | 4.7.0 | Code editor component |
| **Socket.IO Client** | 4.8.1 | Real-time communication |
| **TailwindCSS** | 4.1.10 | Styling & responsive design |
| **React Router** | 7.6.2 | Navigation & routing |
| **Axios** | 1.10.0 | HTTP requests |
| **React Toastify** | 11.0.5 | Notifications & alerts |
| **React Icons** | 5.5.0 | SVG icons |
| **UUID** | 11.1.0 | Unique ID generation |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 14+ | JavaScript runtime |
| **Express.js** | 5.1.0 | Web framework |
| **Socket.IO** | 4.8.1 | WebSocket server |
| **CORS** | 2.8.5 | Cross-origin requests |
| **Nodemon** | 3.1.10 | Auto-reload in development |

### **Architecture**
- **Protocol**: WebSockets with fallback to HTTP polling
- **Real-Time Communication**: Event-driven architecture
- **Code Execution**: Piston API (external service)
- **Deployment**: Vercel (frontend), Node.js hosting (backend)

---

## 📋 Project Structure

```
realtime-collaborative-code-editor/
│
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx      # Main editor component
│   │   │   ├── Output.jsx          # Code execution output
│   │   │   ├── Sidebar.jsx         # Connected users sidebar
│   │   │   ├── LanguageSelector.jsx # Language picker
│   │   │   ├── ErrorSuggestions.jsx # AI error analysis panel
│   │   │   └── Client.jsx          # User avatar component
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Room creation/join page
│   │   │   └── EditorPage.jsx      # Main editor workspace
│   │   ├── api.js                  # API communication
│   │   ├── socket.js               # WebSocket initialization
│   │   ├── constants.js            # Language configs
│   │   ├── App.jsx                 # Main app component
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/                          # Backend (Node.js)
│   ├── index.js                    # Main server file
│   ├── package.json
│   └── .gitignore
│
├── README.md
└── LICENSE
```

---

## 🎯 How It Works

### **Architecture Flow**
```
User A Types Code
    ↓
CodeEditor Component Detects Change
    ↓
Socket.IO Emits "code-change" Event
    ↓
Server Receives & Broadcasts to Room
    ↓
User B's CodeEditor Updates
    ↓
All Users See Changes Instantly
```

### **Error Detection Flow**
```
Code Changes in Editor
    ↓
1-Second Debounce Timer
    ↓
Send Code to Backend API
    ↓
Server Analyzes Code (Regex Patterns)
    ↓
Generate Errors & Suggestions
    ↓
Return Results to Frontend
    ↓
Display in Error Panel (Real-Time)
```

---

## 📚 Supported Languages & Versions

| Language | Version | Status |
|----------|---------|--------|
| JavaScript | 18.15.0 | ✅ Full Support |
| TypeScript | 5.0.3 | ✅ Full Support |
| Python | 3.10.0 | ✅ Full Support |
| Java | 15.0.2 | ✅ Full Support |
| C# | 6.12.0 | ✅ Full Support |
| PHP | 8.2.3 | ✅ Full Support |
| C++ | Latest | ⚠️ Partial Support |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 14.0 or higher
- **npm** 6.0 or higher
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Internet connection**
- **2 GB RAM** minimum

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/priyanshu0511/realtime-collaborative-code-editor.git
cd realtime-collaborative-code-editor
```

#### 2. Install Backend Dependencies

```bash
cd server
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

### Running Locally

#### Terminal 1: Start the Backend Server

```bash
cd server
npm run dev
```

Backend will run at: `http://localhost:5000`

#### Terminal 2: Start the Frontend Development Server

```bash
cd client
npm run dev
```

Frontend will run at: `http://localhost:5173`

#### 3. Open in Browser

Navigate to `http://localhost:5173` and start collaborating!

---

## 💡 How to Use

### **Step 1: Enter Username**
- Type your name or username
- This is how other users will see you in the room

### **Step 2: Create or Join Room**
- **Create New Room**: Generate a unique room ID
- **Join Room**: Enter an existing room ID to collaborate

### **Step 3: Start Coding**
- Select programming language from dropdown
- Write or paste code in the editor
- Changes appear on all connected users' screens instantly

### **Step 4: Check Errors**
- Review the "Errors" tab for syntax issues
- Check "Suggestions" tab for improvements
- Fix issues based on AI recommendations

### **Step 5: Execute Code**
- Click "Run Code" button
- See output in the Output panel
- Share results with team

### **Step 6: Collaborate**
- See team members in sidebar with avatars
- View real-time changes as others code
- Leave room anytime with "Leave Room" button

---

## 🔍 Error Detection & Suggestions

### **Detected Error Types**

#### JavaScript/TypeScript
- ✅ Missing semicolons
- ✅ Unmatched braces/brackets
- ✅ Using `var` (suggest `const`/`let`)
- ✅ Loose equality (`==` vs `===`)
- ✅ `eval()` usage (security)
- ✅ `innerHTML` manipulation (XSS)
- ✅ Missing function braces

#### Python
- ✅ Missing colons after control structures
- ✅ Indentation errors
- ✅ Wildcard imports
- ✅ `print()` without parentheses

#### Java
- ✅ Missing semicolons
- ✅ Missing braces in class/method declarations
- ✅ Unmatched brackets

#### C++
- ✅ Missing includes (`#include <iostream>`)
- ✅ Missing semicolons
- ✅ Unmatched brackets

### **Suggestion Types**

| Type | Examples |
|------|----------|
| **Security** | Avoid eval(), innerHTML vulnerabilities, XSS attacks |
| **Best Practices** | Use const/let, strict equality, proper naming |
| **Code Quality** | Break long lines, remove console.log, organize imports |
| **Performance** | Optimize loops, reduce memory usage, caching |
| **Language-Specific** | Python booleans, JavaScript types, Java imports |

---

## 🎨 Use Cases

### **1. Remote Job Interviews** 💼
Conduct real-time coding interviews where both interviewer and candidate:
- See the same code
- Discuss solutions
- Execute code instantly
- Provide feedback in real-time

### **2. Online Education** 🎓
Teachers can:
- Write example code
- Explain concepts live
- Execute demonstrations
- Students see everything in real-time

### **3. Pair Programming** 👥
Developers can:
- Work on same task simultaneously
- Stay in sync automatically
- See changes as they happen
- Remote or co-located

### **4. Code Review Sessions** 🔍
Team leads can:
- Review code from junior developers
- Make suggestions/edits
- Run tests together
- Provide feedback instantly

### **5. Bug Squashing Sessions** 🐛
Teams can:
- Reproduce bugs together
- Discuss solutions
- Implement fixes
- Test collaboratively

### **6. Learning & Mentoring** 📚
Students and tutors can:
- Code together
- Get instant feedback
- Learn best practices
- Ask questions in real-time

---

## 📊 Performance & Reliability

### **Performance Metrics**
- ⚡ **Sub-second synchronization**: Changes appear in <500ms
- 🔄 **Error detection**: Analyzes code within 1 second
- 💾 **Memory efficient**: Handles large code files
- 🚀 **Scalable**: Supports multiple rooms simultaneously

### **Reliability Features**
- ✅ WebSocket with fallback to polling
- ✅ Automatic reconnection on disconnect
- ✅ State preservation
- ✅ No data loss
- ✅ Error recovery

### **Optimization**
- Code change debouncing (1 second)
- Efficient error analysis
- Minimized network traffic
- Browser caching enabled
- Optimized rendering

---

## 📱 Comparison with Other Tools

| Feature | Coders | VS Code Live Share | Repl.it | Google Docs |
|---------|--------|-------------------|---------|-------------|
| Real-time sync | ✅ | ✅ | ✅ | ✅ |
| Multi-language | ✅ | ✅ | ✅ | ⚠️ |
| Code execution | ✅ | ⚠️ | ✅ | ❌ |
| Error detection | ✅ | ⚠️ | ✅ | ❌ |
| No setup needed | ✅ | ❌ | ✅ | ✅ |
| Free | ✅ | ✅ | ⚠️ | ✅ |
| Self-hosted | ✅ | ❌ | ❌ | ❌ |
| Offline | ❌ | ✅ | ❌ | ❌ |

---

## 🔐 Security Features

- ✅ Code analysis only - no storage of personal data
- ✅ WebSocket encryption (WSS in production)
- ✅ CORS protection
- ✅ No external AI API calls (local pattern matching)
- ✅ Safe code execution in sandboxed environment
- ✅ XSS and eval() vulnerability warnings

---

## 🚧 Future Roadmap

### **Phase 2: AI Integration** 🤖
- [ ] OpenAI/Claude API integration
- [ ] Automatic fix generation
- [ ] Natural language error explanations
- [ ] Code completion suggestions

### **Phase 3: Data Persistence** 💾
- [ ] MongoDB integration
- [ ] User authentication
- [ ] Session history
- [ ] Code snippet library
- [ ] Save/load projects

### **Phase 4: Advanced Features** 🚀
- [ ] Debugging tools
- [ ] Performance profiler
- [ ] Collaborative annotations
- [ ] Real-time test runner
- [ ] CI/CD integration

### **Phase 5: Community** 👥
- [ ] Public snippet sharing
- [ ] Community templates
- [ ] Plugin system
- [ ] Custom themes
- [ ] Language packs

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📝 Available Scripts

### **Frontend**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### **Backend**
```bash
npm run dev      # Start with hot reload (nodemon)
```

---

## 🐛 Troubleshooting

### **Issue: Server not connecting**
```
Solution: Ensure backend is running on port 5000
$ cd server && npm run dev
```

### **Issue: Changes not syncing**
```
Solution: Check WebSocket connection
- Open browser DevTools (F12)
- Go to Network tab
- Filter for "ws" (WebSocket)
- Verify connection is established
```

### **Issue: Code execution fails**
```
Solution: Verify language selection and syntax
- Check language dropdown
- Review error panel for syntax issues
- Ensure code is valid for selected language
```

### **Issue: Error detection not working**
```
Solution: Restart both servers
$ cd server && npm run dev
$ cd client && npm run dev
```

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Priyanshu Singh**

Made with ❤️ for the developer community

- **GitHub**: [@priyanshu0511](https://github.com/priyanshu0511)
- **LinkedIn**: [Priyanshu Singh](https://www.linkedin.com/in/priyanshu-singh-770401260/)
- **Email**: Contact via GitHub

---

## 📞 Support & Documentation

- 📖 **Documentation**: See [AI_ERROR_DETECTION_GUIDE.md](AI_ERROR_DETECTION_GUIDE.md)
- 🧪 **Testing Guide**: See [ERROR_DETECTION_TEST_GUIDE.md](ERROR_DETECTION_TEST_GUIDE.md)
- 📊 **Integration Status**: See [INTEGRATION_STATUS.md](INTEGRATION_STATUS.md)
- 📋 **Implementation Details**: See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

## 🌟 Show Your Support

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🔗 Sharing with friends
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code

---

## 🎉 Acknowledgments

- **Monaco Editor** - For the amazing code editor
- **Socket.IO** - For real-time communication
- **React** - For the UI framework
- **Express.js** - For the backend framework
- **TailwindCSS** - For beautiful styling
- **Piston API** - For code execution

---

## 📅 Latest Updates

**January 22, 2026**
- ✅ AI-powered error detection fully integrated
- ✅ Real-time code analysis with debouncing
- ✅ Multi-language support
- ✅ Error suggestions panel
- ✅ Complete documentation
- ✅ Comprehensive README with all features

---

**Happy Coding! 🚀**

*Join hundreds of developers using Coders for real-time collaboration*
