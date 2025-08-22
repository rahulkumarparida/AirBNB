import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-white border-t text-sm text-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Support */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Support</h3>
                    <ul className="space-y-2">
                        <li>Help Centre</li>
                        <li>AirCover</li>
                        <li>Anti-discrimination</li>
                        <li>Disability support</li>
                        <li>Cancellation options</li>
                        <li>Report neighbourhood concern</li>
                    </ul>
                </div>

                {/* Hosting */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Hosting</h3>
                    <ul className="space-y-2">
                        <li>Airbnb your home</li>
                        <li>Airbnb your experience</li>
                        <li>Airbnb your service</li>
                        <li>AirCover for Hosts</li>
                        <li>Hosting resources</li>
                        <li>Community forum</li>
                        <li>Hosting responsibly</li>
                        <li>Join a free Hosting class</li>
                        <li>Find a co-host</li>
                    </ul>
                </div>

                {/* Airbnb */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Airbnb</h3>
                    <ul className="space-y-2">
                        <li>2025 Summer Release</li>
                        <li>Newsroom</li>
                        <li>Careers</li>
                        <li>Investors</li>
                        <li>Airbnb.org emergency stays</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t px-6 py-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-gray-600 text-xs space-x-2">
                        <span>© 2025 Airbnb, Inc.</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Sitemap</span>
                        <span>Company details</span>
                    </div>

                    <div className="flex items-center gap-6 text-gray-600">
                        {/* Language */}
                        <div className="flex items-center gap-1 cursor-pointer">
                            <div className='size-10 rounded-full flex justify-around items-center cursor-pointer' >
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
                            <span>English (IN)</span>
                        </div>

                        {/* Currency */}
                        <div className="flex items-center gap-1 cursor-pointer">
                            ₹
                            <span>INR</span>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 text-gray-700">
                            <FaFacebookF className="cursor-pointer" />
                            <FaXTwitter className="cursor-pointer" />
                            <FaInstagram className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
