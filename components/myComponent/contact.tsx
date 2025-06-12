"use client"
import { register } from 'module'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { toast } from 'sonner'
import { FiLoader } from "react-icons/fi";

type Input = {
  name: String,
  email: String,
  message: String



}

export default function Contact() {

  const { register, handleSubmit, watch, formState,reset } = useForm<Input>()
  const [loading,setLoading]=useState<boolean>(false)

  async function onSubmit(data: Input) {
    try{
      setLoading(true)
      const res = await axios.post('/api/sendMessage', data)
      console.log(res)
      toast("you have successfully send us message ",{
        description:"thankyou we will reply you soon"
      })
      reset()
      setLoading(false)
    }catch(err){
      toast("error occured while submitting the data")
      reset()
      setLoading(false)
    }


  }


  return (
    <section id="contact" className="relative bg-blue-900 text-white pt-24 pb-20 px-6 md:px-12 lg:px-24">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-full h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#1e3a8a" fillOpacity="1" d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,192C672,160,768,128,864,144C960,160,1056,224,1152,218.7C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Contact Form */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-200 mb-12">
          We'd love to hear your feedback, suggestions, or questions.
        </p>

        <form

          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 text-left text-gray-800 bg-white p-8 rounded-xl shadow-lg"
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold text-blue-900">Name</label>
            <input
              type="text"

              required
              {...register("name")}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-blue-900">Email</label>
            <input
              type="email"

              required
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold text-blue-900">Message</label>
            <textarea

              rows={5}
              required
              {...register("message", { required: true, minLength: 1 })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
          { loading ? <span className='flex justify-center items-center gap-2'>< FiLoader className='animate-spin '/>submitting</span>: "Send Message"}
          
          </button>
        </form>
      </div>
    </section>

  )
}
