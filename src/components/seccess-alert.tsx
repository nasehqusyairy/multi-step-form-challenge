import successIcon from '@/assets/images/icon-thank-you.svg'
export default function SuccessAlert() {
    return (
        <div className="flex flex-col flex-auto justify-center items-center gap-4 py-12 text-center">
            <img src={successIcon} alt="success-icon" className='size-16' />
            <h1 className='font-medium text-blue-950 text-2xl'>Thank you</h1>
            <p className='lg:w-8/12 text-gray-500'>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    )
}