const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs');
const path = require('path');

const { generateQuestionsHtml, getScoreClass } = require('./helper'); // Import the helper functions

const app = express();

app.use(express.json())

const htmlPath = path.join(__dirname, 'template.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port 3000')
})


app.get('/', (req, res) => {
    res.send('Hello from Node!');
});


app.post('/generateReport', async (req, res) => {
    console.log("Generate Report Called")
    try {
      // const browser = await puppeteer.launch();
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }); 
      const page = await browser.newPage();

      const {
        candidate,
        job,
        test,
        misc,
        questions
    } = req.body;

    console.log("req.body", req.body);
  
      // let questions = [
      //     {
      //         id:1,
      //         question: "Tell me about yourself in brief?",
      //         difficulty: "Easy",
      //         duration:"1 min 20 secs",
      //         score:"10/10",
      //         answer:"My name is Aaleen Mirza. I have 6 years of experience in software development.",
      //         aiScoreSummary:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              
      //     },
      //     {
      //         id:2,
      //         question: "Explain different lifecycle methods of React?",
      //         difficulty: "Moderate",
      //         duration:"20 secs",
      //         score:"6/10",
      //         answer:"component did mount, component will unmount etc",
      //         aiScoreSummary:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              

      //     },
      //     {
      //       id:1,
      //       question: "Tell me about yourself in brief?",
      //       difficulty: "Easy",
      //       duration:"1 min 20 secs",
      //       score:"10/10",
      //       answer:"My name is Aaleen Mirza. I have 6 years of experience in software development.",
      //       aiScoreSummary:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            
      //   },
      //   {
      //       id:2,
      //       question: "Explain different lifecycle methods of React?",
      //       difficulty: "Moderate",
      //       duration:"20 secs",
      //       score:"6/10",
      //       answer:"component did mount, component will unmount etc",
      //       aiScoreSummary:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            

      //   },
      //   {
      //     id:1,
      //     question: "Tell me about yourself in brief?",
      //     difficulty: "Easy",
      //     duration:"1 min 20 secs",
      //     score:"10/10",
      //     answer:"My name is Aaleen Mirza. I have 6 years of experience in software development.",
      //     aiScoreSummary:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          
      // },
      // {
      //     id:2,
      //     question: "Explain different lifecycle methods of React?",
      //     difficulty: "Moderate",
      //     duration:"20 secs",
      //     score:"6/10",
      //     answer:"component did mount, component will unmount etc",
      //     aiScoreSummary:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          

      // }
      // ];

      // let candidate = {
      //   name: "Aaleen Mirza",
      //   email: "vL9oA@example.com",
      //   contact: "9876543210"
      // }

      // let job = {
      //   id:545,
      //   role: "Software Developer",
      //   experience: "6",
      //   companyLogo:'https://pub-d3ff552702f14bc4a61b371e528a10b8.r2.dev/profiles/1726206286554-logoc5aea918-55ca-40ea-a291-1cf8f609ec01.logoc5aea918-55ca-40ea-a291-1cf8f609ec01'
      // }

      // let test = {
      //   interviewId: "12345",
      //   testCompletionDate: "1 September 2024",
      //   totalQuestions: "10",
      //   score: "80",
      //   percentage: "80",
      //   overallSummary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //   overallScore: "10/10",
      //   communicationScore: "10/10",
      //   assessmentLink:"https://329947fd.hireomaticclient.pages.dev/jobs/216/assessment/report/34",

      //   interviewStartTime: "9:30 AM",
      //   interviewEndTime: "10:00 AM",
      // }

      // let misc = {
      //   generatedDate: "1 September 2024",
      // }
  
      
     questions = questions.map((q, index) => {
      //  q['assessmentLink'] = `https://329947fd.hireomaticclient.pages.dev/jobs/${job.id}/assessment/report/${q.id}`;
      q['assessmentLink'] = `https://329947fd.hireomaticclient.pages.dev/jobs/216/assessment/report/34`;

       return q;
     })
      const questionsHtml = generateQuestionsHtml(questions);

      let firstSlicePercentage = test.score;
      let secondSlicePercentage = 100 - Number(test.score);

      const donutChartHtml = `
        <div class="donut-chart" style="background: conic-gradient(#ff622d 0% ${firstSlicePercentage}%, #ccc ${firstSlicePercentage}% ${secondSlicePercentage}%);">
        </div>
        `;
  
      const modifiedHtml = html.replace('{{candidateName}}', candidate.name)
                              .replace('{{candidateName}}', candidate.name)
                              .replace('{{candidateEmail}}', candidate.email)
                              .replace('{{candidateContact}}', candidate.contact)
  
                              .replace('{{jobId}}', job.id)
                              .replace('{{role}}', job.role)
                              .replace('{{experience}}', job.experience)
                              .replace('{{companyLogo}}', job.companyLogo)

  
                              .replace('{{generatedDate}}', misc.generatedDate)
                              .replace('{{questionsSection}}', questionsHtml)
                              
                              
                              .replace('{{interviewId}}', test.interviewId)
                              .replace('{{overallScore}}', test.overallScore)
                              .replace('{{overallSummary}}', test.overallSummary)

                              .replace('{{testCompletionDate}}', test.testCompletionDate)
                              .replace('{{totalQuestions}}', test.totalQuestions)
                              .replace('{{score}}', test.score)
                              .replace('{{percentage}}', test.percentage)

                              .replace('{{interviewStartTime}}', test.interviewStartTime)
                              .replace('{{interviewEndTime}}', test.interviewEndTime)
                              .replace('{{communicationScore}}', test.communicationScore)
                              .replace('{{aiScoreSummary}}', test.aiScoreSummary)
                              .replace('{{assessmentLink}}', test.assessmentLink)

                              .replace('{{donutChartHtml}}', donutChartHtml);

      await page.setContent(modifiedHtml);
  
      const pdfBuffer = await page.pdf({ 
        format: 'A4', 
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `
      <div style="font-size:10px; width: 100%; height: 50px; display: flex; align-items: center; justify-content: center;">
        
      </div>
    `,
    footerTemplate: `
      <div style="font-size:10px; width:100%; text-align:center; margin-bottom:10px;">
        <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
    margin: {
      top: '60px',   // Adjust top margin to account for header
      bottom: '60px' // Adjust bottom margin to account for footer
    }
       });
      await browser.close();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
      res.setHeader('Content-Length', pdfBuffer.length);
  
      res.end(pdfBuffer);
  
  } catch (error) {
      console.log(error);
      res.status(500).send("Error generating PDF: "+error);
    }
  });
  