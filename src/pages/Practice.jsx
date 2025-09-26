// src/pages/Practice.jsx
import React, { useState, useEffect } from "react";
import practiceContent from "../data/practiceContent";
import QuestionCard from "../components/QuestionCard";
import "./Practice.css";

/**
 * Practice page with Questions integrated.
 *
 * - Fetches MCQs for selected chapter from API (uncomment fetch block when backend ready)
 * - Uses a mock fallback while developing
 * - Accumulates session XP and persists total XP to localStorage
 */

// Robust API root resolution (works with CRA and Vite)
const API_ROOT = (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL)
  ? process.env.REACT_APP_API_URL
  : (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000";

export default function Practice() {
  const [view, setView] = useState("classes"); // classes | subjects | chapters | questions
  const [selectedClass, setSelectedClass] = useState(null); // "11" | "12"
  const [selectedSubject, setSelectedSubject] = useState(null); // "physics" ...
  const [selectedChapter, setSelectedChapter] = useState(null); // chapter name

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionsError, setQuestionsError] = useState(null);

  // XP tracking
  const [sessionXP, setSessionXP] = useState(0);
  const [totalXP, setTotalXP] = useState(() => {
    try {
      const val = localStorage.getItem("user_total_xp");
      return val ? parseInt(val, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Convenience getters
  const clsObj = selectedClass ? practiceContent[selectedClass] : null;
  const subjObj = clsObj && selectedSubject ? clsObj.subjects[selectedSubject] : null;

  // Navigation helpers
  const openClass = (clsKey) => {
    setSelectedClass(clsKey);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setQuestions([]);
    setView("subjects");
  };

  const openSubject = (subKey) => {
    setSelectedSubject(subKey);
    setSelectedChapter(null);
    setQuestions([]);
    setView("chapters");
  };

  const openChapter = (chapterName) => {
    setSelectedChapter(chapterName);
    setQuestions([]);
    setView("questions");
  };

  const backToClasses = () => {
    setView("classes");
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setQuestions([]);
  };

  const backToSubjects = () => {
    setView("subjects");
    setSelectedSubject(null);
    setSelectedChapter(null);
    setQuestions([]);
  };

  const backToChapters = () => {
    setView("chapters");
    setSelectedChapter(null);
    setQuestions([]);
  };

  // Fetch MCQs for a chapter (uncomment fetch block when backend is ready)
  const fetchQuestionsForChapter = async (classId, subjectId, chapterName) => {
    setLoadingQuestions(true);
    setQuestionsError(null);
    setQuestions([]);
    try {
      const payload = {
        class: classId,
        subject: subjectId,
        chapter: chapterName,
        // optionally user_id, recent_scores, mastery etc.
      };

      // ---------- Uncomment when backend endpoint exists ----------
      /*
      const resp = await fetch(`${API_ROOT}/get-mcqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error(`Server responded ${resp.status}`);
      }
      const data = await resp.json();
      setQuestions(data.questions || []);
      */

      // ---------- LOCAL MOCK (keeps UI testable now) ----------
      // Simulate latency
      await new Promise((r) => setTimeout(r, 300));
      // Create 5 mock questions using chapter name
      const mock = new Array(5).fill(0).map((_, i) => ({
        id: `mock-${i + 1}`,
        question: `(${chapterName}) Sample question ${i + 1}: Choose the right option.`,
        options: [
          { id: "A", text: "Option A" },
          { id: "B", text: "Option B" },
          { id: "C", text: "Option C" },
          { id: "D", text: "Option D" }
        ],
        correctOptionId: i % 4 === 0 ? "A" : (i % 4 === 1 ? "B" : (i % 4 === 2 ? "C" : "D")),
        explanation: `This is a sample explanation for question ${i + 1} of ${chapterName}.`
      }));
      setQuestions(mock);
    } catch (err) {
      console.error("Failed to load questions:", err);
      setQuestionsError(err.message || "Failed to load questions");
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Auto-fetch when user navigates to questions view
  useEffect(() => {
    if (view === "questions" && selectedClass && selectedSubject && selectedChapter) {
      fetchQuestionsForChapter(selectedClass, selectedSubject, selectedChapter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, selectedClass, selectedSubject, selectedChapter]);

  // Handle answer event from QuestionCard
  const handleAnswered = ({ questionId, correct, xpEarned }) => {
    setSessionXP((s) => s + xpEarned);
  };

  // Persist total XP when sessionXP changes (you may decide to save on chapter complete)
  useEffect(() => {
    // For demo, we keep totalXP = stored + sessionXP
    const newTotal = totalXP + sessionXP;
    try {
      localStorage.setItem("user_total_xp", String(newTotal));
    } catch {}
    // Don't setTotalXP here repeatedly to avoid loops; set on chapter end instead.
    // This effect only syncs storage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionXP]);

  // Call when user completes the chapter (e.g., clicks 'Finish Session')
  const finishSession = () => {
    const newTotal = totalXP + sessionXP;
    setTotalXP(newTotal);
    try {
      localStorage.setItem("user_total_xp", String(newTotal));
    } catch {}
    // reset session XP
    setSessionXP(0);

    // Optionally send session result to backend (uncomment when endpoint available)
    /*
    fetch(`${API_ROOT}/save-session`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: "user123",
        class: selectedClass,
        subject: selectedSubject,
        chapter: selectedChapter,
        xp_gained: newTotal
      })
    });
    */

    // Optionally navigate back to chapters
    setView("chapters");
  };

  return (
    <div className="practice-page-container">
      <div className="practice-header">
        <div className="progress-info">
          <h1 className="practice-title">Practice</h1>
          <p className="practice-subtitle">Pick your Class → Subject → Chapter to start practicing.</p>
        </div>

        <div className="session-stats">
          <div className="stat-item">
            <div className="stat-value">{totalXP + sessionXP}</div>
            <div className="stat-label">Total XP</div>
          </div>

          <div className="stat-item">
            <div className="stat-value">{sessionXP}</div>
            <div className="stat-label">Session XP</div>
          </div>
        </div>
      </div>

      <div className="practice-body">
        {/* CLASSES VIEW */}
        {view === "classes" && (
          <div className="classes-grid">
            {Object.keys(practiceContent).map((clsKey) => {
              const cls = practiceContent[clsKey];
              return (
                <div
                  key={clsKey}
                  className="class-card"
                  onClick={() => openClass(clsKey)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openClass(clsKey)}
                >
                  <div className="class-card-inner">
                    <div className="class-label">{cls.label}</div>
                    <div className="class-meta">{Object.keys(cls.subjects).length} Subjects</div>
                    <div className="class-cta">Start →</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SUBJECTS VIEW */}
        {view === "subjects" && clsObj && (
          <div className="subjects-view">
            <button className="back-btn" onClick={backToClasses}>← Back to Classes</button>
            <h2 className="view-heading">{clsObj.label}</h2>

            <div className="subjects-grid">
              {Object.keys(clsObj.subjects).map((subKey) => {
                const s = clsObj.subjects[subKey];
                return (
                  <div
                    key={subKey}
                    className="subject-card"
                    onClick={() => openSubject(subKey)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openSubject(subKey)}
                  >
                    <div className="subject-label">{s.label}</div>
                    <div className="subject-count">{s.chapters.length} Chapters</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHAPTERS VIEW */}
        {view === "chapters" && subjObj && (
          <div className="chapters-view">
            <button className="back-btn" onClick={backToSubjects}>← Back to Subjects</button>
            <h3 className="view-heading">{clsObj.label} — {subjObj.label}</h3>

            <ul className="chapters-list">
              {subjObj.chapters.map((ch) => (
                <li key={ch} className="chapter-item">
                  <button className="chapter-btn" onClick={() => openChapter(ch)}>
                    {ch}
                    <span className="chapter-meta">Practice</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* QUESTIONS VIEW */}
        {view === "questions" && (
          <div className="questions-view">
            <button className="back-btn" onClick={backToChapters}>← Back to Chapters</button>
            <h3 className="view-heading">{clsObj.label} — {subjObj.label} — {selectedChapter}</h3>

            {loadingQuestions && <div className="loader">Loading questions…</div>}
            {questionsError && <div className="error">Error: {questionsError}</div>}

            {!loadingQuestions && !questionsError && questions.length === 0 && (
              <div className="no-questions">No questions found for this chapter.</div>
            )}

            {!loadingQuestions && questions.length > 0 && (
              <div>
                <div className="questions-list">
                  {questions.map((q, idx) => (
                    <QuestionCard
                      key={q.id || `${idx}`}
                      question={q}
                      index={idx}
                      onAnswered={({ questionId, correct, xpEarned }) =>
                        handleAnswered({ questionId, correct, xpEarned })
                      }
                    />
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
                  <div style={{ color: "#94a3b8", fontWeight: 700 }}>
                    Session XP: <span style={{ color: "#e6e6ff" }}>{sessionXP}</span>
                  </div>

                  <button className="btn" onClick={finishSession}>
                    Finish Session
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}




// // src/pages/Practice.jsx
// import React, { useState, useEffect } from "react";
// import practiceContent from "../data/practiceContent"; // <-- create this file as shown earlier
// import "./Practice.css";

// /**
//  * Practice page
//  *
//  * Flow:
//  *  - view = "classes"   -> shows cards for Class 11 / Class 12
//  *  - view = "subjects"  -> shows subject cards (Physics/Chem/Math) for selected class
//  *  - view = "chapters"  -> shows chapter list for selected subject
//  *  - view = "questions" -> fetch & show MCQs for selected chapter (placeholder + fetch skeleton)
//  *
//  * Replace / extend the MCQ area with your QuestionCard component later.
//  */

// export default function Practice() {
//   const [view, setView] = useState("classes");
//   const [selectedClass, setSelectedClass] = useState(null); // "11" or "12"
//   const [selectedSubject, setSelectedSubject] = useState(null); // "physics" | "chemistry" | "mathematics"
//   const [selectedChapter, setSelectedChapter] = useState(null); // chapter name string

//   // Questions state (populated when user enters "questions" view)
//   const [questions, setQuestions] = useState([]);
//   const [loadingQuestions, setLoadingQuestions] = useState(false);
//   const [questionsError, setQuestionsError] = useState(null);

//   // convenience getters
//   const clsObj = selectedClass ? practiceContent[selectedClass] : null;
//   const subjObj = clsObj && selectedSubject ? clsObj.subjects[selectedSubject] : null;

//   // open handlers
//   const openClass = (clsKey) => {
//     setSelectedClass(clsKey);
//     setSelectedSubject(null);
//     setSelectedChapter(null);
//     setQuestions([]);
//     setView("subjects");
//   };

//   const openSubject = (subjectKey) => {
//     setSelectedSubject(subjectKey);
//     setSelectedChapter(null);
//     setQuestions([]);
//     setView("chapters");
//   };

//   const openChapter = (chapterName) => {
//     setSelectedChapter(chapterName);
//     setView("questions");
//   };

//   // Back navigation helpers
//   const backToClasses = () => {
//     setView("classes");
//     setSelectedClass(null);
//     setSelectedSubject(null);
//     setSelectedChapter(null);
//     setQuestions([]);
//   };

//   const backToSubjects = () => {
//     setView("subjects");
//     setSelectedSubject(null);
//     setSelectedChapter(null);
//     setQuestions([]);
//   };

//   const backToChapters = () => {
//     setView("chapters");
//     setSelectedChapter(null);
//     setQuestions([]);
//   };

//   // Fetch questions from model API for a chapter
//   // Update `API_ROOT` and payload to match your backend
//   // const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8000";

//   // replace previous API_ROOT line with this:
// const API_ROOT = (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL)
//   ? process.env.REACT_APP_API_URL
//   : (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL)
//     ? import.meta.env.VITE_API_URL
//     : "http://localhost:8000";


//   const fetchQuestionsForChapter = async (classId, subjectId, chapterName) => {
//     setLoadingQuestions(true);
//     setQuestionsError(null);
//     setQuestions([]);

//     try {
//       // Example payload — match with model server schema
//       const payload = {
//         class: classId, // "11" or "12"
//         subject: subjectId, // "physics"
//         chapter: chapterName, // chapter string
//         // optionally pass user info: user_id, past_performance, etc.
//       };

//       // Uncomment below when your backend endpoint is ready:
//       /*
//       const resp = await fetch(`${API_ROOT}/get-mcqs`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!resp.ok) {
//         throw new Error(`Server responded ${resp.status}`);
//       }

//       const data = await resp.json();
//       // expected format: { questions: [ { id, question, options: [{id, text}], correctOptionId?, explanation? }, ... ] }
//       setQuestions(data.questions || []);
//       */

//       // QUICK LOCAL MOCK (temporary) — removes when backend is ready
//       // This mock shows how question objects should look.
//       await new Promise((r) => setTimeout(r, 350)); // simulate latency
//       setQuestions([
//         {
//           id: "q1",
//           question: `Sample MCQ for ${chapterName} — Choose the correct option.`,
//           options: [
//             { id: "A", text: "Option A (sample)" },
//             { id: "B", text: "Option B (sample)" },
//             { id: "C", text: "Option C (sample)" },
//             { id: "D", text: "Option D (sample)" }
//           ],
//           explanation: "This is a sample explanation. Replace with model / DB data.",
//           correctOptionId: "A"
//         },
//         {
//           id: "q2",
//           question: `Another sample question for ${chapterName}.`,
//           options: [
//             { id: "A", text: "A" },
//             { id: "B", text: "B" },
//             { id: "C", text: "C" },
//             { id: "D", text: "D" }
//           ],
//           explanation: "Sample explanation.",
//           correctOptionId: "C"
//         }
//       ]);
//     } catch (err) {
//       console.error("Failed to load questions:", err);
//       setQuestionsError(err.message || "Failed to load questions");
//     } finally {
//       setLoadingQuestions(false);
//     }
//   };

//   // When view switches to questions, fetch questions
//   useEffect(() => {
//     if (view === "questions" && selectedClass && selectedSubject && selectedChapter) {
//       fetchQuestionsForChapter(selectedClass, selectedSubject, selectedChapter);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [view, selectedClass, selectedSubject, selectedChapter]);

//   return (
//     <div className="practice-page-container">
//       <div className="practice-header">
//         <h1 className="practice-title">Practice</h1>
//         <p className="practice-subtitle">Choose your class, subject and chapter to start practice.</p>
//       </div>

//       <div className="practice-body">
//         {/* CLASSES VIEW */}
//         {view === "classes" && (
//           <div className="classes-grid">
//             {Object.keys(practiceContent).map((clsKey) => {
//               const cls = practiceContent[clsKey];
//               return (
//                 <div
//                   key={clsKey}
//                   className="class-card"
//                   onClick={() => openClass(clsKey)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(e) => e.key === "Enter" && openClass(clsKey)}
//                 >
//                   <div className="class-card-inner">
//                     <div className="class-label">{cls.label}</div>
//                     <div className="class-meta">{Object.keys(cls.subjects).length} Subjects</div>
//                     <div className="class-cta">Start →</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SUBJECTS VIEW */}
//         {view === "subjects" && clsObj && (
//           <div className="subjects-view">
//             <button className="back-btn" onClick={backToClasses}>← Back to Classes</button>
//             <h2 className="view-heading">{clsObj.label}</h2>

//             <div className="subjects-grid">
//               {Object.keys(clsObj.subjects).map((subKey) => {
//                 const s = clsObj.subjects[subKey];
//                 return (
//                   <div
//                     key={subKey}
//                     className="subject-card"
//                     onClick={() => openSubject(subKey)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) => e.key === "Enter" && openSubject(subKey)}
//                   >
//                     <div className="subject-label">{s.label}</div>
//                     <div className="subject-count">{s.chapters.length} Chapters</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* CHAPTERS VIEW */}
//         {view === "chapters" && subjObj && (
//           <div className="chapters-view">
//             <button className="back-btn" onClick={backToSubjects}>← Back to Subjects</button>
//             <h3 className="view-heading">{clsObj.label} — {subjObj.label}</h3>

//             <ul className="chapters-list">
//               {subjObj.chapters.map((ch) => (
//                 <li key={ch} className="chapter-item">
//                   <button className="chapter-btn" onClick={() => openChapter(ch)}>
//                     {ch}
//                     <span className="chapter-meta">Practice</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* QUESTIONS VIEW */}
//         {view === "questions" && (
//           <div className="questions-view">
//             <button className="back-btn" onClick={backToChapters}>← Back to Chapters</button>
//             <h3 className="view-heading">{clsObj.label} — {subjObj.label} — {selectedChapter}</h3>

//             {/* Loading / error */}
//             {loadingQuestions && <div className="loader">Loading questions…</div>}
//             {questionsError && <div className="error">Error: {questionsError}</div>}

//             {/* Questions list */}
//             {!loadingQuestions && !questionsError && questions.length === 0 && (
//               <div className="no-questions">No questions found for this chapter.</div>
//             )}

//             {!loadingQuestions && questions.length > 0 && (
//               <div className="questions-list">
//                 {questions.map((q, idx) => (
//                   <div className="question-card" key={q.id || `${idx}`}>
//                     <div className="question-header">
//                       <div className="question-index">Q{idx + 1}</div>
//                       <div className="question-text">{q.question}</div>
//                     </div>

//                     <div className="options">
//                       {q.options.map((opt) => (
//                         <div key={opt.id} className="option">
//                           <label>
//                             <input type="radio" name={`q-${q.id}`} value={opt.id} disabled />
//                             <span className="option-id">{opt.id}</span>
//                             <span className="option-text">{opt.text}</span>
//                           </label>
//                         </div>
//                       ))}
//                     </div>

//                     {q.explanation && (
//                       <div className="explanation">
//                         <strong>Explanation:</strong> <span>{q.explanation}</span>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
