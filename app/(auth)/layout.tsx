import Image from 'next/image'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <main className='auth-containder'>
            <section className='auth-form'>
                <div className='auth-box'>
                    <div className='flex flex-row gap-3'>
                        <Image
                            src='/icons/logo.svg'
                            alt='logo'
                            width={37}
                            height={37}
                        />
                        <h1 className='text-2xl font-semibold text-white'>
                            BookWise
                        </h1>
                    </div>

                    <div>
                        {children}
                    </div>
                </div>
            </section>

            <section className='auth-illustration'>
                <Image
                    src='/images/auth-illustration.png'
                    alt='illustration'
                    width={1000}
                    height={1000}
                    className='size-full object-cover'
                />
            </section>
        </main>
    )
}