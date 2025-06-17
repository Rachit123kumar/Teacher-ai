// Enhanced AI Page Styling for Better UX & Consistent Design

"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MdOutlineCloudDone, MdOutlineDraw } from 'react-icons/md';
import { RiGeminiFill } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { Button } from '../../components/ui/button';
import SheetDemo from '../../components/myComponent/SheetDemo';
import { pdf } from '@react-pdf/renderer';
import DppDocument from '../../components/myComponent/DppDocument';

export default function Page() {
  const [formName, setFormName] = useState('Untitled');
  const [openTheme, setOpenTheme] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: [
        {
          title: 'title',
          description: 'optional description',
          options: ['option1', 'option2', 'option3', 'option4'],
          correct_answer: 'option1',
        },
      ],
    },
  });

  const { fields, append, replace } = useFieldArray({
    name: 'questions',
    control,
  });

  const onSubmit = async (data) => {

    


    const blob = await pdf(<DppDocument questions={data.questions} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formName || 'questions'}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 border border-blue-900 bg-blue-950/30 p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 px-2">
          <input
            className="bg-transparent px-2 text-sm sm:text-xl border-b border-white focus:outline-none"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <span className="flex items-center gap-1 text-xs text-green-400 md:text-sm">
            <MdOutlineCloudDone /> Saving...
          </span>
        </div>
        <div className=" items-center gap-3 hidden md:flex">
          <Button
            size="sm"
            variant="ghost"
            className="text-white"
            onClick={() => setOpenTheme(true)}
          >
            <MdOutlineDraw className="text-xl" />
          </Button>
        </div>
      </div>

      {/* Add Question + Count */}
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => append({
          title: "New Question",
          description: "",
          options: ["", "", "", ""],
          correct_answer: ""
        })}>+ Add</Button>

        <span className="text-sm text-gray-400">{fields.length} questions</span>
      </div>

      {/* Questions */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 items-center">
          {fields.map((field, i) => (
            <div key={field.id} className="w-full max-w-2xl bg-blue-950/30 p-4 rounded-xl shadow-lg">
              <textarea
                className="w-full p-2 mb-2 rounded bg-blue-900/30 focus:outline-none"
                placeholder="Question Title"
                {...register(`questions.${i}.title`)}
              />
              <input
                className="w-full p-2 mb-3 rounded bg-blue-900/30 focus:outline-none"
                placeholder="Optional Description"
                {...register(`questions.${i}.description`)}
              />
              {[0, 1, 2, 3].map((optIdx) => (
                <div key={optIdx} className="flex items-center gap-2 mb-2">
                  <input
                    className="flex-1 p-2 rounded bg-blue-900/30 focus:outline-none"
                    placeholder={`Option ${optIdx + 1}`}
                    {...register(`questions.${i}.options.${optIdx}`)}
                  />
                  {fields[i].correct_answer === fields[i].options[optIdx] && (
                    <TiTick className='text-green-400 text-lg' />
                  )}
                </div>
              ))}
              <input
                className="w-full p-2 mt-2 rounded bg-blue-900/30 focus:outline-none"
                placeholder="Correct Answer"
                {...register(`questions.${i}.correct_answer`)}
              />
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-10 mx-auto block bg-blue-600 hover:bg-blue-700">Download PDF</Button>
      </form>

      {/* Gemini Floating Button */}
      <Button
        className="fixed bottom-20 right-5 p-4 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        onClick={() => setOpenTheme(true)}
      >
        <RiGeminiFill className='size-6 text-white' />
      </Button>

      {/* Gemini Sheet */}
      <SheetDemo openTheme={openTheme} setOpenTheme={setOpenTheme} replaceQuestions={replace} />
    </div>
  );
}
