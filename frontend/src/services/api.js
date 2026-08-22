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

const api = axios.create({
  baseURL: 'https://resumeiq-br96.onrender.com',
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
  type
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