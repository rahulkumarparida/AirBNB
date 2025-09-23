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

export const Navbar = () => {

    const location = useLocation()
    const [toggleHamburger, setToggleHamburger] = useState(false)
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
            <div className=" flex justify-between items-center relative w-full bg-white">
                {/* Logo */}
                <Link to="/">
                    <img src='/logo/Airbnb_Logo_1.png' alt='logo' className='w-25 cursor-pointer hidden md:block' />
                    <img src='/logo/symbol.svg' alt='logo' className='w-10 cursor-pointer md:hidden' />
                </Link>


                <div className='flex justify-center items-center gap-4 lg:pl-25' >
                    <div className='flex justify-center items-center cursor-pointer'>
                        <img src='/assets/host.png' className='w-10  md:w-17 lg:w-20' />
                        <p className='font-semibold' >Homes</p>
                    </div>
                    <div className='flex justify-center items-center cursor-pointer'>
                        <img src='/assets/balloon.png' className='w-10  md:w-17 lg:w-20' />
                        <p className=''>Experiences</p>
                    </div>
                    <div className='flex justify-center items-center cursor-pointer'>
                        <img src='/assets/bell.png' className='w-10  md:w-1 lg:w-20' />
                        <p className='' >Services</p>
                    </div>
                </div>


                <div className='flex justify-between items-center lg:gap-6 gap-2  '>
                    <div className='hidden md:block'>
                        <p className='font-medium text-[14px] cursor-pointer' >Become a host</p>
                    </div>

                    <div className='bg-gray-1 hover:bg-gray-2 size-10 rounded-full flex justify-around items-center cursor-pointer' >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="h-4 w-4 text-gray-600">
                                <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z" />
                            </svg>
                        </div>
                    </div>

                    <div className='bg-gray-1 hover:bg-gray-2 size-10 rounded-full flex justify-around items-center cursor-pointer'
                        onClick={() => setToggleHamburger(!toggleHamburger)}
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="h-4 w-4 stroke-gray-600 stroke-[3] overflow-visible ">
                                <g fill="none">
                                    <path d="M2 16h28M2 24h28M2 8h28" />
                                </g>
                            </svg>

                        </div>
                    </div>

                    <div className={`absolute z-10 bg-white top-15 right-5 p-5 rounded-2xl max-w-[270px] shadow-xl ${toggleHamburger ? "block" : "hidden"}`}
                    >
                        <div className='flex justify-start gap-2 cursor-pointer' >
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            </div>
                            <div>
                                <p>Help center</p>
                            </div>
                        </div>
                        <hr className="border-gray-300 mt-3 mb-2"></hr>
                        <div className='flex items-center justify-evenly cursor-pointer'>

                            <div className='cursor-pointer'>
                                <p className='font-medium text-[14px]'>Become a Host</p>
                                <p className='text-xs text-gray-3' >It's easy to start hosting and earn extra income.</p>
                            </div>
                            <div>
                                <img src="/assets/host.png" alt="logo" className='w-40' />
                            </div>
                        </div>
                        <hr className="border-gray-300 mt-2 mb-3"></hr>
                        <div className='cursor-pointer'>
                            <p>Refer a host</p>
                        </div>
                        <div className=" my-4"></div>
                        <div className='cursor-pointer'>
                            <p>Find a Co-host</p>
                        </div>
                        <hr className="border-gray-300 my-3"></hr>
                        <div className='cursor-pointer'>
                            <p>Log in or sign up</p>
                        </div>
                    </div>
                </div>
            </div>


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
                                <div className="absolute inset-0 bg-white z-50">
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
                                <div className="absolute inset-0 bg-white z-50">
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
                            className="hidden md:flex border border-gray-2 shadow-xl z-20 rounded-full w-fit bg-white"
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
                                <div className={`absolute bg-white max-h-[30rem] md:w-[15rem] lg:w-[25rem] top-40 left-95 rounded-4xl p-6 pt-10 shadow-card overflow-scroll scrollbar-none scrollbar-thin-y ${searchSuggestionBox ? "block" : "hidden pointer-events-none border "}`}>
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
                            </div>

                            <div className={`absolute bg-white h-80 w-[21rem] top-40 right-95 z-50 p-5 rounded-xl ${isDropdownOn ? "block" : "hidden pointer-events-none"} shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]`} ref={wrapperRef}>
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
                        </motion.div>
                    </>
                )
            }

        </div>

    )
}
