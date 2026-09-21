import { ArrowRight, Box } from 'lucide-react';
import Head from './head';
import Header from "@/app/header";

export default function App() {
        return (


            <>
                <Head/>

                <Header /> {/* Header w/ navbar */}
                <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
                    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-16">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-6">
                            Fortis <span className="text-blue-600">Libertas</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-light">
                            A minimalist, lightning-fast foundation for your Next.js applications.
                            Clean code, simple architecture, absolute freedom.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                                Start Building
                                <ArrowRight className="w-4 h-4"/>
                            </button>

                            <button
                                className="px-8 py-3.5 bg-white text-slate-700 rounded-full font-medium border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }