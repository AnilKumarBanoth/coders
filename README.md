# Coders - Realtime Collaborative Code Editor

> A powerful web-based collaborative code editor that enables real-time pair programming, remote coding interviews, and team development. Write code together, see changes instantly, and execute code as a team—all in your browser.

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
|

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
coders/
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





## 🚀 Getting Started

### Prerequisites

- **Node.js** 14.0 or higher
- **npm** 6.0 or higher
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Internet connection**
- **2 GB RAM** minimum


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
