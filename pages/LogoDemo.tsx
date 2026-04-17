import React from 'react';
import { Logo1, Logo2, Logo3, Logo4, Logo5 } from '../components/Logos';
import SEO from '../components/SEO';

const LogoDemo: React.FC = () => {
    return (
        <>
            <SEO
                title="Sikander Arts Logo Demo | Brand Animation Showcase Karachi"
                description="Explore the Sikander Arts logo animation showcase featuring premium branding motion concepts and visual identity presentation for our Karachi painting and finishing brand."
                keywords="Sikander Arts logo demo, logo animation showcase Karachi, brand identity design Karachi, visual branding demo, Sikander Arts brand presentation"
                url="https://sikanderart.com/logo-demo"
            />

        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* Hero section styling applied for testing light text */}
            <div className="bg-[#fbfbfb] py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl text-white font-serif font-bold mb-12 text-center">3D Logo Animations (Solid Nav Background)</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Variant 1 */}
                        <div className="bg-primary-light p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-300 mb-8 w-full text-center border-b border-gray-700 pb-4">1. Layered 3D Extrusion</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo1 isSolidNav={true} />
                            </div>
                            <p className="text-gray-400 mt-6 text-sm text-center">Hover to see pop-out 3D effect</p>
                        </div>

                        {/* Variant 2 */}
                        <div className="bg-primary-light p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-300 mb-8 w-full text-center border-b border-gray-700 pb-4">2. Rotating Flip</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo2 isSolidNav={true} />
                            </div>
                            <p className="text-gray-400 mt-6 text-sm text-center">Hover to see 3D rotation</p>
                        </div>

                        {/* Variant 3 */}
                        <div className="bg-primary-light p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-300 mb-8 w-full text-center border-b border-gray-700 pb-4">3. Float & Shift</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo3 isSolidNav={true} />
                            </div>
                            <p className="text-gray-400 mt-6 text-sm text-center">Hover to see float effect with shadow</p>
                        </div>

                        {/* Variant 4 */}
                        <div className="bg-primary-light p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-300 mb-8 w-full text-center border-b border-gray-700 pb-4">4. Wavy 3D Bounce</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo4 isSolidNav={true} />
                            </div>
                            <p className="text-gray-400 mt-6 text-sm text-center">Hover to see springy 3D wave</p>
                        </div>

                        {/* Variant 5 (Combined) */}
                        <div className="bg-primary-light p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center md:col-span-2">
                            <h2 className="text-2xl text-secondary mb-8 w-full text-center border-b border-gray-700 pb-4 font-bold">5. The Masterpiece (Combined)</h2>
                            <div className="h-40 flex items-center justify-center w-full">
                                <Logo5 isSolidNav={true} />
                            </div>
                            <p className="text-gray-400 mt-6 text-sm text-center">Combines: Pop-out layers, 3D rotation, vibrant aura, and individual letter coloring!</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* White section styling applied for testing dark text */}
            <div className="bg-white py-20 px-4 shadow-inner">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl text-gray-900 font-serif font-bold mb-12 text-center">3D Logo Animations (Transparent Nav Background)</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Variant 1 */}
                        <div className="bg-gray-100 p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-700 mb-8 w-full text-center border-b border-gray-300 pb-4">1. Layered 3D Extrusion</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo1 isSolidNav={false} />
                            </div>
                        </div>

                        {/* Variant 2 */}
                        <div className="bg-gray-100 p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-700 mb-8 w-full text-center border-b border-gray-300 pb-4">2. Rotating Flip</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo2 isSolidNav={false} />
                            </div>
                        </div>

                        {/* Variant 3 */}
                        <div className="bg-gray-100 p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-700 mb-8 w-full text-center border-b border-gray-300 pb-4">3. Float & Shift</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo3 isSolidNav={false} />
                            </div>
                        </div>

                        {/* Variant 4 */}
                        <div className="bg-gray-100 p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center">
                            <h2 className="text-xl text-gray-700 mb-8 w-full text-center border-b border-gray-300 pb-4">4. Wavy 3D Bounce</h2>
                            <div className="h-32 flex items-center justify-center w-full">
                                <Logo4 isSolidNav={false} />
                            </div>
                        </div>

                        {/* Variant 5 (Combined) */}
                        <div className="bg-gray-100 p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center md:col-span-2">
                            <h2 className="text-2xl text-secondary mb-8 w-full text-center border-b border-gray-300 pb-4 font-bold">5. The Masterpiece (Combined)</h2>
                            <div className="h-40 flex items-center justify-center w-full">
                                <Logo5 isSolidNav={false} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default LogoDemo;
