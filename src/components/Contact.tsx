import data from '@/constants/details.json'

export const Contact = () => {
  return (
    <section id='contact'>
      <h2 className="my-20 text-center text-4xl">Contact</h2>

        <div className='text-center tracking-tighter'>
            <p className='my-4'>For any inquiries, please contact me at:</p>
            <a href={`mailto:${data.email}`} className='border-b'>{data.email}</a> 
        </div>
    </section>
  )
}
