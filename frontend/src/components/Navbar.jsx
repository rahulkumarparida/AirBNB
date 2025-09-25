import { useContext, useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { SearchCards } from './utils/SearchCards';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { StoreContext } from '../context/StoreContext';
import TopNavbar from './TopNavbar';

export const Navbar = () => {

    const location = useLocation()
    const [hide, setHide] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [searchSuggestionBox, setSearchSuggestionBox] = useState(false)
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [query, setQuery] = useState("");
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    const [isDropdownOn, setIsDropdownOn] = useState(false)
    const [adult, setAdult] = useState(0)
    const [children, setChindren] = useState(0)
    const [infant, setInfant] = useState(0)
    const [guestData, setGuestData] = useState()

    const wrapperRef = useRef(null);
    const navigate = useNavigate()
    const { updateUserData } = useContext(StoreContext)


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setHide(true);
            } else {
                setHide(false);
            }
            setLastScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)

    }, [lastScrollY])

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSearchSuggestionBox(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsDropdownOn(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    useEffect(() => {
        if (adult + children + infant == 0) {
            setGuestData("Add guests")
        } else {
            setGuestData(`Guest ${adult + children + infant}`)
        }
    }, [adult, children, infant])

    const searchItems = [
        {
            id: 11,
            destination: "Bhubaneshwar",
            text: "Capital city with ancient temples and modern luxury",
            image: "/assets/citysearch.png"
        },
        {
            id: 12,
            destination: "Mumbai",
            text: "City of dreams with beaches and Bollywood glamour",
            image: "/assets/citysearch.png"
        },
        {
            id: 13,
            destination: "Bengaluru",
            text: "Garden city and India's Silicon Valley",
            image: "/assets/citysearch.png"
        },
        {
            id: 14,
            destination: "Goa",
            text: "Coastal paradise of sun-kissed beaches, bohemian nightlife, and Portuguese charm",
            image: "/assets/beachsearch.png"
        },
        {
            id: 15,
            destination: "Kolkata",
            text: "India’s Cultural Capital – poetry, history, food, and the ‘City of Joy’ spirit",
            image: "/assets/citysearch.png"
        },
        {
            id: 16,
            destination: "Manali",
            text: "Himalayan haven of snow-clad valleys, adventure, and serene mountain vibes",
            image: "/assets/mountainsearch.png"
        }

    ];

    const filteredItems = searchItems.filter((item) =>
        item.destination.toLowerCase().includes(query.toLowerCase())
    );

    const handleSearch = () => {
        if (query.trim() !== "") {
            const citySlug = query.toLowerCase().replace(/\s+/g, "-");

            updateUserData({
                destination: query,
                checkIn: format(checkIn, "yyyy-MM-dd"),
                checkOut: format(checkOut, "yyyy-MM-dd"),
                adult: adult,
                children: children,
                infant: infant
            });

            navigate(citySlug);
        }
    };



    return (

        <div className='flex flex-col items-center gap-2 sticky top-0 z-50 '
        >
            {/* Top navbar */}
            <TopNavbar />

            {/* Bottom navbar */}
            {
                location.pathname === "/" && (
                    <>
                        {/* Mobile Search Trigger (shown only on small screens) */}
                        <motion.div className={`${isMobileExpanded ? "hidden" : "block"} md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-11/12`}
                            animate={{ y: hide ? "-300%" : "0%" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}>

                            <div
                                className="flex items-center justify-between bg-white border border-gray-300 rounded-full shadow-lg p-3 cursor-pointer"
                                onClick={() => { setIsMobileExpanded(true) }}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-gray-600 mr-2">
                                        <path d="m21 21-4.34-4.34" />
                                        <circle cx="11" cy="11" r="8" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Start your search</span>
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center bg-airbnb rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter">
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile Expanded Search (shown when clicked on mobile) */}
                        <div className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ${isMobileExpanded ? 'translate-y-0' : 'translate-y-full'}`}>
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <button
                                    onClick={() => setIsMobileExpanded(false)}
                                    className="p-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </button>
                                <span className="font-semibold">Search</span>
                                <button
                                    onClick={handleSearch}
                                    className="text-airbnb font-semibold"
                                >
                                    Search
                                </button>
                            </div>

                            {/* Search Form */}
                            <div className="p-4 space-y-4">
                                {/* Where */}
                                <div
                                    className="border-b pb-4 cursor-pointer"
                                    onClick={() => setSearchSuggestionBox(true)}
                                >
                                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Where</div>
                                    <div className="text-lg">{query || "Search destinations"}</div>
                                </div>

                                {/* Check In */}
                                <div className="border-b pb-4">
                                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Check in</div>
                                    <DatePicker
                                        selected={checkIn}
                                        onChange={(date) => setCheckIn(date)}
                                        placeholderText="Add dates"
                                        className="text-lg outline-none w-full"
                                        dateFormat="MMM dd, yyyy"
                                    />
                                </div>

                                {/* Check Out */}
                                <div className="border-b pb-4">
                                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Check out</div>
                                    <DatePicker
                                        selected={checkOut}
                                        onChange={(date) => setCheckOut(date)}
                                        placeholderText="Add dates"
                                        className="text-lg outline-none w-full"
                                        dateFormat="MMM dd, yyyy"
                                    />
                                </div>

                                {/* Who */}
                                <div
                                    className="border-b pb-4 cursor-pointer"
                                    onClick={() => setIsDropdownOn(true)}
                                >
                                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Who</div>
                                    <div className="text-lg">{guestData}</div>
                                </div>
                            </div>

                            {/* Search Suggestions Dropdown (Mobile) */}
                            {searchSuggestionBox && (
                                <div className="absolute inset-0 bg-white z-50" ref={wrapperRef}>
                                    <div className="p-4 border-b flex items-center">
                                        <button
                                            onClick={() => setSearchSuggestionBox(false)}
                                            className="mr-3"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
                                                <path d="m12 19-7-7 7-7" />
                                                <path d="M19 12H5" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Search destinations"
                                            className="flex-1 outline-none text-lg"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="p-4 border-b cursor-pointer"
                                                    onClick={() => {
                                                        setQuery(item.destination);
                                                        setSearchSuggestionBox(false);
                                                    }}
                                                >
                                                    <div className="font-medium">{item.destination}</div>
                                                    <div className="text-sm text-gray-500">{item.text}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-gray-500">No matches found</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Guests Dropdown (Mobile) */}
                            {isDropdownOn && (
                                <div className="absolute inset-0 bg-white z-50" ref={wrapperRef}>
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <button
                                            onClick={() => setIsDropdownOn(false)}
                                            className="p-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                                <path d="M18 6 6 18" />
                                                <path d="m6 6 12 12" />
                                            </svg>
                                        </button>
                                        <span className="font-semibold">Guests</span>
                                        <button
                                            onClick={() => setIsDropdownOn(false)}
                                            className="text-airbnb font-semibold"
                                        >
                                            Done
                                        </button>
                                    </div>
                                    <div className="p-4 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-lg">Adults</div>
                                                <div className="text-gray-500">Age 13+</div>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <button
                                                    className="w-10 h-10 flex justify-center items-center border border-gray-400 rounded-full disabled:opacity-50"
                                                    disabled={children > 0 || infant > 0 ? adult <= 1 : adult <= 0}
                                                    onClick={() => setAdult(prev => prev - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{adult}</span>
                                                <button
                                                    className="w-10 h-10 flex justify-center items-center border border-gray-400 rounded-full"
                                                    onClick={() => setAdult(prev => prev + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-lg">Children</div>
                                                <div className="text-gray-500">Age 2-12</div>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <button
                                                    className="w-10 h-10 flex justify-center items-center border border-gray-400 rounded-full disabled:opacity-50"
                                                    disabled={children <= 0}
                                                    onClick={() => setChindren(prev => prev - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{children}</span>
                                                <button
                                                    className="w-10 h-10 flex justify-center items-center border border-gray-400 rounded-full disabled:opacity-50"
                                                    disabled={adult === 0}
                                                    onClick={() => setChindren(prev => prev + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-lg">Infants</div>
                                                <div className="text-gray-500">Under 2</div>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <button
                                                    className="w-10 h-10 flex justify-center items-center border border-gray-400 rounded-full disabled:opacity-50"
                                                    disabled={infant <= 0}
                                                    onClick={() => setInfant(prev => prev - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{infant}</span>
                                                <button
                                                    className="w-10 h-10 flex justify-center items-center border border-gray-400 rounded-full disabled:opacity-50"
                                                    disabled={adult === 0}
                                                    onClick={() => setInfant(prev => prev + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm">Pets are not allowed in this stay</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Search Bar (unchanged) */}
                        <motion.div
                            className="hidden md:flex border border-gray-2  shadow-xl z-20 rounded-full w-fit bg-white"
                            animate={{ y: hide ? "-300%" : "0%" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div>
                                <div className='flex flex-col rounded-full py-3 pl-10 p-2 hover:bg-gray-1' ref={wrapperRef}>
                                    <label htmlFor="destinations">Where</label>
                                    <input
                                        id='destinations'
                                        type="text"
                                        placeholder='Search Destinations'
                                        className='outline-0'
                                        onFocus={() => setSearchSuggestionBox(true)}
                                        onChange={(e) => setQuery(e.target.value)}
                                        value={query}
                                    />
                                </div>
                                <div className={`absolute bg-white max-h-[30rem] min-w-[25rem] md:w-[15rem] lg:w-[25rem] top-40 left-1/3.5 rounded-4xl p-6 pt-10 shadow-card overflow-scroll scrollbar-none scrollbar-thin-y ${searchSuggestionBox ? "block" : "hidden pointer-events-none border "}`}>
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => (
                                            <div
                                                className='cursor-pointer'
                                                key={item.id}
                                                onMouseDown={() => {
                                                    setQuery(item.destination)
                                                    setSearchSuggestionBox(false)
                                                }}
                                            >
                                                <SearchCards
                                                    destination={item.destination}
                                                    text={item.text}
                                                    img={item.image}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No matches found</p>
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col rounded-full py-3 pl-5 p-2 hover:bg-gray-1'>
                                <label htmlFor='checkin'>Check in</label>
                                <DatePicker
                                    id='checkin'
                                    placeholderText='Add dates'
                                    className='outline-0 w-25'
                                    selected={checkIn}
                                    onChange={(date) => setCheckIn(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>

                            <div className='flex flex-col rounded-full py-3 pl-5 p-2 hover:bg-gray-1'>
                                <label htmlFor='checkout'>Check Out</label>
                                <DatePicker
                                    id='checkout'
                                    placeholderText='Add dates'
                                    className='outline-0 w-25'
                                    selected={checkOut}
                                    onChange={(date) => setCheckOut(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>

                            <div className='flex py-3 pl-5 p-2 hover:bg-gray-1 rounded-full'>
                                <div className='flex flex-col'>
                                    <label htmlFor="who">Who</label>
                                    <div onClick={() => setIsDropdownOn(true)} className='w-30 text-[#787878]'>{guestData}</div>
                                </div>
                                <button
                                    className='bg-airbnb rounded-full w-11 h-11 flex justify-center items-center cursor-pointer'
                                    onClick={handleSearch}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search text-white">
                                        <path d="m21 21-4.34-4.34" />
                                        <circle cx="11" cy="11" r="8" />
                                    </svg>
                                </button>
                                <div className={`absolute bg-white h-80 w-[21rem] top-40 left-1/2 z-50 p-5 rounded-xl ${isDropdownOn ? "block" : "hidden pointer-events-none"} shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]`} ref={wrapperRef}>
                                    <div className='flex justify-between pt-3'>
                                        <div>
                                            <div className='font-semibold text-lg'>Adults</div>
                                            <div>Age 13+</div>
                                        </div>
                                        <div className='flex gap-2.5 items-center'>
                                            <button className='p-2 flex justify-center items-center size-8 border border-gray-600 rounded-full' disabled={children > 0 || infant > 0 ? adult <= 1 : adult <= 0} onClick={() => setAdult((prev => prev - 1))}>-</button>
                                            <div>{adult}</div>
                                            <button className='p-2 flex justify-center items-center size-8 border border-gray-600 rounded-full' onClick={() => setAdult((prev => prev + 1))}>+</button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between pt-3'>
                                        <div>
                                            <div className='font-semibold text-lg'>Children</div>
                                            <div>Age 2-12</div>
                                        </div>
                                        <div className='flex gap-2.5 items-center'>
                                            <button className='p-2 flex justify-center items-center size-8 border border-gray-600 rounded-full' disabled={children <= 0} onClick={() => setChindren((prev => prev - 1))}>-</button>
                                            <div>{children}</div>
                                            <button className='p-2 flex justify-center items-center size-8 border border-gray-600 rounded-full' disabled={adult == 0} onClick={() => setChindren((prev => prev + 1))}>+</button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between pt-3'>
                                        <div>
                                            <div className='font-semibold text-lg'>Infants</div>
                                            <div>Under 2</div>
                                        </div>
                                        <div className='flex gap-2.5 items-center'>
                                            <button className={`p-2 flex justify-center items-center size-8 border border-gray-600 rounded-full`} disabled={infant <= 0} onClick={() => setInfant((prev => prev - 1))}>-</button>
                                            <div>{infant}</div>
                                            <button className='p-2 flex justify-center items-center size-8 border border-gray-600 rounded-full' disabled={adult == 0} onClick={() => { console.log("Hello"); setInfant((prev => prev + 1)) }}>+</button>
                                        </div>
                                    </div>
                                    <p className='py-3 text-gray-600'>Pets are not allowed in this stay</p>
                                    <div className='flex justify-end pt-3'>
                                        <div className='underline font-bold cursor-pointer' onClick={() => setIsDropdownOn(false)}>
                                            Close
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )
            }

        </div>

    )
}
