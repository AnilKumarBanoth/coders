import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const SERVER_API = axios.create({
  baseURL: "http://localhost:5000",
});

export const executeCode = async (sourceCode, language) => {
  const res = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return res.data;
};

// New: Analyze code for errors and suggestions
export const analyzeCode = async (sourceCode, language) => {
  try {
    const res = await SERVER_API.post("/api/analyze-code", {
      code: sourceCode,
      language: language,
    });
    return res.data;
  } catch (error) {
    console.error("Error analyzing code:", error);
    return { errors: [], suggestions: [], hasErrors: false };
  }
};
