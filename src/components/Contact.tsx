import data from '@/constants/details.json'
import { Title } from './common/Title'

export const Contact = () => {
  return (
    <section id='contact'>
        <Title title='Get in Touch' />

        <div className='text-center tracking-tighter'>
            <p className='my-4'>For any inquiries, please contact me at:</p>
            <a href={`mailto:${data.email}`} className='border-b'>{data.email}</a> 
        </div>
    </section>
  )
}
