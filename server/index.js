const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.send("Server is running");
});

// AI Error Detection Endpoint
app.post("/api/analyze-code", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  // Analyze code for common errors
  const errors = analyzeCode(code, language);
  const suggestions = generateSuggestions(code, language, errors);

  res.json({
    errors,
    suggestions,
    hasErrors: errors.length > 0,
  });
});

// Function to analyze code for errors
function analyzeCode(code, language) {
  const errors = [];
  const lines = code.split("\n");

  // Treat TypeScript like JavaScript
  if (language === "typescript" || language === "ts") {
    language = "javascript";
  }

  if (language === "javascript") {
    analyzeJavaScript(lines, errors, code);
  } else if (language === "python") {
    analyzePython(lines, errors);
  } else if (language === "java") {
    analyzeJava(lines, errors);
  } else if (language === "cpp") {
    analyzeCpp(lines, errors, code);
  } else {
    // Default analysis for unknown languages
    analyzeGeneric(lines, errors);
  }

  return errors;
}

// JavaScript specific analysis
function analyzeJavaScript(lines, errors, code) {
  let openBraces = 0;
  let openParens = 0;
  let openBrackets = 0;
  const definedVariables = new Set();
  const definedFunctions = new Set();

  // First pass: collect defined variables and functions
  lines.forEach((line) => {
    const trimmed = line.trim();
    // Variables
    if (/^(var|let|const)\s+(\w+)/.test(trimmed)) {
      const match = trimmed.match(/^(var|let|const)\s+(\w+)/);
      if (match) definedVariables.add(match[2]);
    }
    // Functions
    if (/^function\s+(\w+)/.test(trimmed)) {
      const match = trimmed.match(/^function\s+(\w+)/);
      if (match) definedFunctions.add(match[1]);
    }
    // Arrow functions
    if (/^(const|let|var)\s+(\w+)\s*=\s*\(/.test(trimmed)) {
      const match = trimmed.match(/^(const|let|var)\s+(\w+)/);
      if (match) definedFunctions.add(match[2]);
    }
  });

  lines.forEach((line, lineNum) => {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("//")) return;

    // Count braces, parentheses, and brackets
    openBraces += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
    openParens += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
    openBrackets += (line.match(/\[/g) || []).length - (line.match(/\]/g) || []).length;

    // Check for missing semicolons (not in comments or strings)
    if (
      /^(var|let|const|return|throw|break|continue)\s/.test(trimmed) &&
      !trimmed.endsWith(";") &&
      !trimmed.endsWith("{") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(")")
    ) {
      errors.push({
        line: lineNum + 1,
        message: "Missing semicolon",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for missing braces after control statements
    if (/^(if|else if|for|while|switch|catch)\s*\(/.test(trimmed) && !trimmed.includes("{")) {
      errors.push({
        line: lineNum + 1,
        message: "Missing opening brace after control statement",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for missing parentheses in function calls
    if (/^function\s+\w+\s*\(/.test(trimmed) && !trimmed.includes("{")) {
      errors.push({
        line: lineNum + 1,
        message: "Missing opening brace after function declaration",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for 'var' usage
    if (/^var\s+/.test(trimmed)) {
      errors.push({
        line: lineNum + 1,
        message: "Use 'const' or 'let' instead of 'var'",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for loose equality
    if (/\s==\s/.test(trimmed) && !trimmed.includes("===")) {
      errors.push({
        line: lineNum + 1,
        message: "Use strict equality (===) instead of loose equality (==)",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for dangerous functions
    if (/\beval\s*\(/.test(trimmed)) {
      errors.push({
        line: lineNum + 1,
        message: "⚠️ Security Risk: eval() is dangerous, use alternative approaches",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }

    if (/\.innerHTML\s*=/.test(trimmed)) {
      errors.push({
        line: lineNum + 1,
        message: "⚠️ Security Risk: innerHTML can cause XSS attacks, use textContent instead",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }

    // Detect gibberish/undefined standalone identifiers (words that are not valid code)
    // Check for lines that are just random words (potential variable references)
    if (/^[a-zA-Z_]\w*$/.test(trimmed) && trimmed.length > 2) {
      // It's a single word without any operators or syntax
      if (
        !definedVariables.has(trimmed) &&
        !definedFunctions.has(trimmed) &&
        !["console", "window", "document", "JSON", "Math", "Array", "Object", "String", "Number", "Boolean", "undefined", "null", "true", "false"].includes(trimmed)
      ) {
        errors.push({
          line: lineNum + 1,
          message: `Undefined variable or gibberish text: '${trimmed}' is not recognized`,
          severity: "error",
          code: trimmed,
        });
      }
    }

    // Check for invalid TypeScript type annotations
    if (/:\s*\{/.test(trimmed) && !trimmed.includes("function") && !trimmed.includes("=>")) {
      // TypeScript type annotation detected - this is valid, skip
    }

    // Check for lines with weird character patterns that look like gibberish
    if (/^[a-z]+v[a-z]+$/.test(trimmed) && trimmed.length > 3) {
      // Patterns like "vevew", "efefverv" - gibberish
      errors.push({
        line: lineNum + 1,
        message: `Invalid token: '${trimmed}' appears to be gibberish or typo`,
        severity: "error",
        code: trimmed,
      });
    }
  });

  // Check for unclosed braces/parentheses at end
  if (openBraces > 0) {
    errors.push({
      line: lines.length,
      message: `${openBraces} unclosed brace(s) detected`,
      severity: "error",
      code: "Check brace matching",
    });
  }
  if (openParens > 0) {
    errors.push({
      line: lines.length,
      message: `${openParens} unclosed parenthesis/parentheses detected`,
      severity: "error",
      code: "Check parenthesis matching",
    });
  }
  if (openBrackets > 0) {
    errors.push({
      line: lines.length,
      message: `${openBrackets} unclosed bracket(s) detected`,
      severity: "error",
      code: "Check bracket matching",
    });
  }
}

// Python specific analysis
function analyzePython(lines, errors) {
  lines.forEach((line, lineNum) => {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) return;

    // Check for missing colon after control structures
    if (/^(if|elif|else|for|while|def|class|try|except|finally)\s/.test(trimmed)) {
      if (!trimmed.endsWith(":")) {
        errors.push({
          line: lineNum + 1,
          message: "Missing colon after statement",
          severity: "error",
          code: trimmed.substring(0, 50),
        });
      }
    }

    // Check for indentation issues (simplified)
    const indentation = line.match(/^\s*/)[0].length;
    if (indentation % 2 !== 0 && indentation % 4 !== 0) {
      errors.push({
        line: lineNum + 1,
        message: "Inconsistent indentation detected",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for wildcard imports
    if (/^from\s+\S+\s+import\s+\*/.test(trimmed)) {
      errors.push({
        line: lineNum + 1,
        message: "Avoid wildcard imports, import specific items",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for missing parentheses in print
    if (/^print\s+(?!\()/.test(trimmed)) {
      errors.push({
        line: lineNum + 1,
        message: "print() requires parentheses in Python 3",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }
  });
}

// Java specific analysis
function analyzeJava(lines, errors) {
  let openBraces = 0;

  lines.forEach((line, lineNum) => {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("//")) return;

    // Count braces
    openBraces += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;

    // Check for missing semicolons (not in comments or strings)
    if (
      /^(int|String|boolean|double|float|char|long|short)\s+\w+\s*=/.test(trimmed) &&
      !trimmed.endsWith(";")
    ) {
      errors.push({
        line: lineNum + 1,
        message: "Java statement should end with semicolon",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for missing braces after class declaration
    if (/^public\s+class\s+\w+/.test(trimmed) && !trimmed.includes("{")) {
      errors.push({
        line: lineNum + 1,
        message: "Missing opening brace after class declaration",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for missing braces after method
    if (/^public\s+\w+\s+\w+\s*\(/.test(trimmed) && !trimmed.includes("{")) {
      errors.push({
        line: lineNum + 1,
        message: "Missing opening brace after method declaration",
        severity: "error",
        code: trimmed.substring(0, 50),
      });
    }
  });

  if (openBraces > 0) {
    errors.push({
      line: lines.length,
      message: "Unclosed braces detected",
      severity: "error",
      code: "Check brace matching",
    });
  }
}

// C++ specific analysis
function analyzeCpp(lines, errors, code) {
  let openBraces = 0;

  lines.forEach((line, lineNum) => {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("//")) return;

    // Count braces
    openBraces += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;

    // Check for missing semicolons
    if (
      /^(int|void|string|char|double|float)\s+/.test(trimmed) &&
      !trimmed.endsWith(";") &&
      !trimmed.endsWith("{")
    ) {
      errors.push({
        line: lineNum + 1,
        message: "C++ statement should likely end with semicolon",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }

    // Check for missing includes
    if (/cout\s*<<|cin\s*>>/.test(line) && !code.includes("#include <iostream>")) {
      errors.push({
        line: lineNum + 1,
        message: "Missing #include <iostream> for cout/cin",
        severity: "warning",
        code: trimmed.substring(0, 50),
      });
    }
  });

  if (openBraces > 0) {
    errors.push({
      line: lines.length,
      message: "Unclosed braces detected",
      severity: "error",
      code: "Check brace matching",
    });
  }
}

// Generic analysis for unsupported languages
function analyzeGeneric(lines, errors) {
  let openBraces = 0;
  let openParens = 0;

  lines.forEach((line, lineNum) => {
    openBraces += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
    openParens += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
  });

  if (openBraces !== 0) {
    errors.push({
      line: lines.length,
      message: `Brace mismatch detected (${openBraces > 0 ? "unclosed" : "extra closing"})`,
      severity: "error",
      code: "Check brace matching",
    });
  }
  if (openParens !== 0) {
    errors.push({
      line: lines.length,
      message: `Parenthesis mismatch detected (${openParens > 0 ? "unclosed" : "extra closing"})`,
      severity: "error",
      code: "Check parenthesis matching",
    });
  }
}

// Function to generate AI-like suggestions
function generateSuggestions(code, language, errors) {
  const suggestions = [];

  // Performance suggestions
  if (code.includes("var ") && language === "javascript") {
    suggestions.push({
      title: "Use const/let instead of var",
      description: "var is function-scoped and can lead to bugs. Use const (default) or let (if reassignment needed).",
      priority: "high",
      example: "const count = 5;",
    });
  }

  // Code quality suggestions - Long lines
  const longLines = code.split("\n").filter((line) => line.length > 100);
  if (longLines.length > 0) {
    suggestions.push({
      title: "Break long lines into multiple lines",
      description: `You have ${longLines.length} line(s) longer than 100 characters. Long lines are harder to read and maintain. Consider breaking them up.`,
      priority: "medium",
      example: "// Split long statements across multiple lines",
    });
  }

  // Security suggestions
  if (code.includes("eval(")) {
    suggestions.push({
      title: "🔒 SECURITY: Avoid eval()",
      description: "Using eval() is a major security risk. It can execute arbitrary code. Use safer alternatives like JSON.parse() or Function constructor.",
      priority: "high",
      example: "const obj = JSON.parse(jsonString); // Instead of eval()",
    });
  }

  if (code.includes("innerHTML")) {
    suggestions.push({
      title: "🔒 SECURITY: Use textContent instead of innerHTML",
      description: "innerHTML can be vulnerable to XSS attacks if used with untrusted data. Use textContent for plain text or a sanitization library.",
      priority: "high",
      example: "element.textContent = userInput;",
    });
  }

  // Type-related suggestions for JavaScript
  if (language === "javascript") {
    if (!code.includes("===") && code.includes("==")) {
      suggestions.push({
        title: "Use strict equality (===)",
        description: "Avoid loose equality (==) which can lead to unexpected type coercion. Always use strict equality (===).",
        priority: "high",
        example: "if (x === 5) { ... }",
      });
    }

    // Check for missing return statements
    if (code.includes("function") && !code.includes("return")) {
      suggestions.push({
        title: "Consider adding return statements",
        description: "Functions should typically return a value. Make sure your functions have appropriate return statements.",
        priority: "medium",
        example: "return result;",
      });
    }

    // Check for console.log in production
    if (code.includes("console.log")) {
      suggestions.push({
        title: "Remove console.log() from production code",
        description: "console.log() statements should be removed before deploying to production. Consider using proper logging frameworks.",
        priority: "medium",
        example: "logger.info('message'); // Instead of console.log()",
      });
    }
  }

  // Python specific suggestions
  if (language === "python") {
    if (code.includes("== True") || code.includes("== False")) {
      suggestions.push({
        title: "Use implicit boolean comparison",
        description: "Instead of comparing to True/False explicitly, use implicit boolean evaluation.",
        priority: "medium",
        example: "if is_valid: # Instead of if is_valid == True:",
      });
    }

    if (code.includes("import *")) {
      suggestions.push({
        title: "Avoid wildcard imports",
        description: "Wildcard imports make code harder to understand and can cause naming conflicts.",
        priority: "high",
        example: "from module import function1, function2",
      });
    }
  }

  // Add error-based suggestions
  const errorCount = errors.length;
  if (errorCount > 5) {
    suggestions.unshift({
      title: `⚠️ Multiple issues found (${errorCount})`,
      description: "Your code has several issues. Start by fixing the most critical errors (in red) first, then address warnings (in yellow).",
      priority: "high",
      example: "Review the Errors tab for detailed information",
    });
  }

  if (errorCount > 0) {
    suggestions.push({
      title: "Fix errors before testing",
      description: "Your code has syntax or logical errors. These should be fixed before running or testing the code.",
      priority: "high",
      example: "Check the Errors tab above for specific issues",
    });
  }

  return suggestions;
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://coders.vercel.app"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
const roomData = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    const clientsBefore = getAllConnectedClients(roomId);
    socket.join(roomId);
    const clientsAfter = getAllConnectedClients(roomId);

    if (roomData[roomId]) {
      socket.emit("sync-code", roomData[roomId]);
    }

    //Notify the joining user with all current clients-
    socket.emit("joined", {
      clients: clientsAfter,
      username,
      socketId: socket.id,
    });

    //Notify other users about the new user-
    socket.in(roomId).emit("joined", {
      clients: clientsAfter,
      username,
      socketId: socket.id,
    });
  });
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });

  socket.on("code-change", ({ roomId, code }) => {
    // console.log(`Code received from ${socket.id} for room ${roomId}`);
    roomData[roomId] = {
      ...(roomData[roomId] || {}),
      code,
    };
    socket.in(roomId).emit("code-change", { code });
  });

  socket.on("language-change", ({ roomId, language }) => {
    roomData[roomId] = {
      ...(roomData[roomId] || {}),
      language,
    };
    socket.in(roomId).emit("language-change", { language });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at PORT :${HOST}/${PORT}`);
});
