// import axios from 'axios';

// const api = axios.create({
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getHome = () => api.get('/');

// export const analyzeResume = (file) => {
//   const formData = new FormData();
//   formData.append('resume', file);

//   return api.post('/analyze', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// export const rewriteResume = (file) => {
//   const formData = new FormData();
//   formData.append('resume', file);

//   return api.post('/rewrite', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// export const generateCoverLetter = (
//   file,
//   jobDescription,
//   type
// ) => {  const formData = new FormData();

//   formData.append('resume', file);
//   formData.append('job_description', jobDescription);

//   // 🔥 YEH LINE ADD KARNI HAI
//   formData.append('type', selectedType);

//   return api.post('/cover-letter', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// export const chatWithAI = (message, resume, analysis) => {
//   return api.post('/chat', {
//     message,
//     resume,
//     analysis
//   });
// };


// export default api;


import axios from 'axios';

export const getApiBaseUrl = () => {
  // 1. Explicit environment variable (from .env / VITE_API_BASE_URL)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');
  }

  // 2. Browser runtime autodetection
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;

    // In local development on Vite (default port 5173), route to Flask on port 5000 on the same host (localhost or LAN IP)
    if (port === '5173') {
      return `${protocol}//${hostname}:5000`;
    }

    // In production or when served directly from Flask
    return window.location.origin;
  }

  return 'http://127.0.0.1:5000';
};

export const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ===============================
// HOME
// ===============================
export const getHome = () => {
  return api.get('/');
};

// ===============================
// ANALYZE RESUME
// ===============================
export const analyzeResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/analyze', formData);
};

// ===============================
// REWRITE RESUME
// ===============================
export const rewriteResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/rewrite', formData);
};

// ===============================
// COVER LETTER / EMAIL / DM / REFERRAL
// ===============================
export const generateCoverLetter = (
  file,
  jobDescription,
  type = 'cover'
) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('job_description', jobDescription);
  formData.append('type', type);
  return api.post('/cover-letter', formData);
};

// ===============================
// AI CHAT
// ===============================
export const chatWithAI = (
  message,
  resume,
  analysis
) => {
  return api.post('/chat', {
    message,
    resume,
    analysis,
  });
};

export default api;