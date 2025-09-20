import { useSearchParams } from "react-router-dom"
import { ArrowUp } from 'lucide-react';


export const Reservation = () => {
    const [params] = useSearchParams()
    const destination = params.get("destination")
    const checkIn = params.get("checkin")
    const checkOut = params.get("checkout")
    const adult = params.get("adult")
    const children = params.get("children")
    const infant = params.get("infant")
    const hotelID = params.get("hotelId")


    const paymentMethod = [
        {
            payment: "UPI QR code",
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-label="upi"
                role="img"
                focusable="false"
                className="h-8 w-8" // Tailwind for height and width
            >
                <path
                    fill="#70706e"
                    d="M23.87 18.96h-1.53L24.47 11H26zm-.8-7.71a.55.55 0 0 0-.48-.23h-8.41l-.42 1.56h7.65l-.45 1.67h-7.65L12.04 19h1.54l.85-3.19h6.88c.22 0 .43-.08.6-.23.18-.14.32-.34.38-.56l.85-3.19c.07-.2.05-.4-.06-.58zm-9.92-.23h-1.53L9.9 17.44H3.77l1.72-6.42H3.96l-1.92 7.19c-.07.19-.05.4.06.56.12.16.3.24.48.23h7.9c.31 0 .59-.22.67-.54z"
                ></path>
                <path fill="#098041" d="m28.1 11 1.9 4-4 4z"></path>
                <path fill="#e97626" d="m27.1 11 1.9 4-4 4z"></path>
            </svg>
        },
        {
            payment: "UPI ID",
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-label="upi"
                role="img"
                focusable="false"
                className="h-8 w-8" 
            >
                <path
                    fill="#70706e"
                    d="M23.87 18.96h-1.53L24.47 11H26zm-.8-7.71a.55.55 0 0 0-.48-.23h-8.41l-.42 1.56h7.65l-.45 1.67h-7.65L12.04 19h1.54l.85-3.19h6.88c.22 0 .43-.08.6-.23.18-.14.32-.34.38-.56l.85-3.19c.07-.2.05-.4-.06-.58zm-9.92-.23h-1.53L9.9 17.44H3.77l1.72-6.42H3.96l-1.92 7.19c-.07.19-.05.4.06.56.12.16.3.24.48.23h7.9c.31 0 .59-.22.67-.54z"
                ></path>
                <path fill="#098041" d="m28.1 11 1.9 4-4 4z"></path>
                <path fill="#e97626" d="m27.1 11 1.9 4-4 4z"></path>
            </svg>
        },
        {
            payment: "Credit card or Debit Card",
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-label="upi"
                role="img"
                focusable="false"
                className="h-8 w-8" 
            >
                <path
                    fill="#70706e"
                    d="M23.87 18.96h-1.53L24.47 11H26zm-.8-7.71a.55.55 0 0 0-.48-.23h-8.41l-.42 1.56h7.65l-.45 1.67h-7.65L12.04 19h1.54l.85-3.19h6.88c.22 0 .43-.08.6-.23.18-.14.32-.34.38-.56l.85-3.19c.07-.2.05-.4-.06-.58zm-9.92-.23h-1.53L9.9 17.44H3.77l1.72-6.42H3.96l-1.92 7.19c-.07.19-.05.4.06.56.12.16.3.24.48.23h7.9c.31 0 .59-.22.67-.54z"
                ></path>
                <path fill="#098041" d="m28.1 11 1.9 4-4 4z"></path>
                <path fill="#e97626" d="m27.1 11 1.9 4-4 4z"></path>
            </svg>
        },
        {
            payment: "Net Banking",
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-label="upi"
                role="img"
                focusable="false"
                className="h-8 w-8" 
            >
                <path
                    fill="#70706e"
                    d="M23.87 18.96h-1.53L24.47 11H26zm-.8-7.71a.55.55 0 0 0-.48-.23h-8.41l-.42 1.56h7.65l-.45 1.67h-7.65L12.04 19h1.54l.85-3.19h6.88c.22 0 .43-.08.6-.23.18-.14.32-.34.38-.56l.85-3.19c.07-.2.05-.4-.06-.58zm-9.92-.23h-1.53L9.9 17.44H3.77l1.72-6.42H3.96l-1.92 7.19c-.07.19-.05.4.06.56.12.16.3.24.48.23h7.9c.31 0 .59-.22.67-.54z"
                ></path>
                <path fill="#098041" d="m28.1 11 1.9 4-4 4z"></path>
                <path fill="#e97626" d="m27.1 11 1.9 4-4 4z"></path>
            </svg>
        },

    ]
    
    return (
        <div className="px-50">
            <div className="text-3xl font-bold text-gray-900 flex items-center gap-6 ">
                <div><ArrowUp className="rotate-270" /></div>
                <div>Confirm and pay</div>
            </div>


            <div className="flex">
                <div>
                    <span>Add a payment method</span>
                    {
                        paymentMethod.map((item,idx)=>(
                            <div key={idx}>

                            </div>
                        ))
                    }
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
