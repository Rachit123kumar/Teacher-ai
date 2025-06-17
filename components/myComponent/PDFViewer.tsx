import React from 'react'

export default function PDFViewer({pdfUrl}:{pdfUrl:string}) {
  return (
    <div>
        
      <iframe src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`} className='h-[100vh] w-full max-w-full'>

      </iframe>
        
        
        </div>
  )
}
