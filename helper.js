const generateQuestionsHtml = (questions) => {
    return questions.map((q, index) => `
        <div class="content section section-question avoid-page-break">
            <div class="common-section avoid-page-break">
                <div style="width: 80%;">
                    <p class="question-title"> <span class="question-number">${index+1}.</span> ${q.question} </p>
                    <div class="flex-row">
                        <div class="difficulty-${q.difficulty.toLowerCase()}">
                            Difficulty: ${q.difficulty}</div>
                        <div class="time-taken">
                            Time taken: ${q.duration}</div>
                    </div>
                </div>
                <div style="width: 20%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="score-container">
                    <h2 class="score score-${getScoreClass(q.score)}"> ${Math.round(q.score.split('/')[0]) != '10' ? 0:''}${Math.round(q.score.split('/')[0])}/10</h2>
                    <span class="score-caption">Score</span>
                </div>
                <a href="${q.assessmentLink}" style="text-decoration: none;">
                    <div style="padding: 10px; border: 1px solid #ccc; color: #014361;  border-radius: 4px; font-size: 12px; margin-top: 8px; font-weight: bold;">  ▶  Review Answer</div>
                </a>

                </div>

            </div>
            <div class="answer-container">

                <p class="answer-transcript-title"><span class="title">Score Summary (AI):</p>
                <p class="answer-transcript-body" style=" background-color: #E5F6FD;
        color: #014361;
        border-radius: 6px;
        padding: 20px;">${q.aiScoreSummary}</p>

                <p class="answer-transcript-title" style="margin-top:16px"><span class="title">Answer (Transcript):</p>
                <p class="answer-transcript-body">${q.answer}</p>

            </div>
        </div>
    `).join('');
};

// Function to determine the score class
const getScoreClass = (score) => {
    const numericScore = parseInt(score.split('/')[0], 10); // Extract number from "08/10"
    if (numericScore >= 8) return 'high';
    if (numericScore >= 5) return 'moderate';
    return 'low';
};

module.exports = { generateQuestionsHtml, getScoreClass };