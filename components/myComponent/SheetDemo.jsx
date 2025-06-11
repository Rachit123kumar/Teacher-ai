import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios"

export default function SheetDemo({ openTheme, setOpenTheme, replaceQuestions }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [loading,setLoading]=useState(false)
  const [numQuestion,setNumQuestion]=useState(0)

    async function handleGenerate() {
    setLoading(true)
    try {
      const prompt = `Generate ${numQuestion} multiple choice questions for class ${classLevel} ${subject} on the topic "${topic}" in ${language} language. 

Each question should be an object in a JSON array, with the following format:
{
  "question": "What is 2+2?",
  "options": ["2", "3", "4", "5"],
  "correct_answer": "4"
}
`;

      const response = await axios.post('/api/generateQuestion', {
        request: prompt
      })
      console.log(typeof (response.data))

      const cleaned = response.data
        .replace(/^```json\s*/, '')
        .replace(/^```\s*/, '')
        .replace(/```$/, '');

      console.log(cleaned);

      // ✅ Parse the JSON string to actual JS objects
      const parsed = JSON.parse(cleaned);

      // ✅ Replace the questions
      replaceQuestions(parsed.map(q => ({
        title: q.question,
        description:'',
        options: q.options,
        correct_answer: q.correct_answer
      })));

      setLoading(false);

    } catch (err) {
      console.log(err)
      // toast.error('Not good response')
      alert("Not a good response refresh the page ")
      setLoading(false)
    }


  }

  return (
    <Sheet open={openTheme} onOpenChange={setOpenTheme}>
      <SheetContent className="bg-blue-950/50 backdrop-blur-lg text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-xl mb-2">Generate Questions with AI</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-4 px-2">
          <div>
            <Label htmlFor="subject" className="mb-2">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Mathematics"
              className="bg-blue-900/40 text-white placeholder:text-gray-300"
            />
          </div>

          <div>
            <Label htmlFor="topic" className="mb-2">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Algebra"
              className="bg-blue-900/40 text-white placeholder:text-gray-300"
            />
          </div>

          <div>
            <Label htmlFor="classLevel" className="mb-2">Class</Label>
            <Input
              id="classLevel"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              placeholder="e.g. 8"
              className="bg-blue-900/40 text-white placeholder:text-gray-300"
            />
          </div>

          <div>
            <Label htmlFor="language" className="mb-2">Language</Label>
            <Input
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g. English"
              className="bg-blue-900/40 text-white placeholder:text-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="numQuestion" className="mb-2">Number of Question</Label>
            <Input
              id="numQuestion"
              value={numQuestion}
              onChange={(e) => setNumQuestion(e.target.value)}
              placeholder="e.g. 10"
              className="bg-blue-900/40 text-white placeholder:text-gray-300"
            />
          </div>
        </div>

        <SheetFooter className="mt-6" >
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110"
          >
           {loading ? "loading":" Generate"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
