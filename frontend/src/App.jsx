import React, { useState } from 'react';
import axios from 'axios';
import ResumeUpload from './components/ResumeUpload';

function App() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleUploadSuccess = (data) => {
    setProfile(data.profile);
    setJobs([]); // Reset jobs when new profile uploaded
  };

  const handleJobSearch = async () => {
    setSearching(true);
    try {
      const response = await axios.post('http://localhost:8000/api/jobs/search', profile);
      setJobs(response.data.jobs);
    } catch (err) {
      alert('Failed to search jobs.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            A
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AutoApply</h1>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors text-white border-b-2 border-blue-500 pb-1">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors">Profile</a>
          <a href="#" className="hover:text-white transition-colors">History</a>
          <a href="#" className="hover:text-white transition-colors">Settings</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto w-full flex flex-col items-center">
        {!profile ? (
          <div className="mt-20 w-full">
            <div className="text-center mb-12 flex flex-col items-center">
              <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-tight">
                Land your dream job. <br />
                <span className="text-blue-400">On autopilot.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl text-center">
                Upload your resume and let our AI handle the rest. We'll find, score, and apply to relevant jobs for you.
              </p>
            </div>
            <ResumeUpload onUploadSuccess={handleUploadSuccess} />
            <div className="mt-8 flex justify-center">
              <button
                onClick={async () => {
                  try {
                    const response = await axios.post('http://localhost:8000/api/resume/sample');
                    handleUploadSuccess(response.data);
                  } catch (err) {
                    alert('Sample run failed. Make sure backend is running.');
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-slate-300 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Try with Chiranjeev's Sample Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-1">{profile.full_name}</h2>
                <p className="text-blue-400 font-medium">{profile.current_title}</p>
              </div>
              <button 
                onClick={() => setProfile(null)}
                className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Reset Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2 space-y-6">
                <section className="glass-morphism p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Professional Summary
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {profile.summary}
                  </p>
                </section>

                <section className="glass-morphism p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="glass-morphism p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-slate-400 text-sm">Experience</span>
                      <span className="font-semibold">{profile.experience_years} Years</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-slate-400 text-sm">Seniority</span>
                      <span className="font-semibold capitalize">{profile.seniority}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Location</span>
                      <span className="font-semibold">{profile.location}</span>
                    </div>
                  </div>
                </section>

                <button 
                  onClick={handleJobSearch}
                  disabled={searching}
                  className="w-full premium-gradient p-4 rounded-xl font-bold shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {searching ? 'Finding Jobs...' : 'Find Matches'}
                </button>
              </div>
            </div>

            {/* Jobs Section */}
            {jobs.length > 0 && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Recommended Roles</h2>
                    <p className="text-slate-400 text-sm">Found {jobs.length} highly relevant jobs across 4 platforms</p>
                  </div>
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-lg shadow-green-600/20 transition-colors">
                    Auto-Apply to All
                  </button>
                </div>
                
                <div className="glass-morphism overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-300">
                      <tr>
                        <th className="p-4 font-semibold">Match Score</th>
                        <th className="p-4 font-semibold">Job Title</th>
                        <th className="p-4 font-semibold">Company</th>
                        <th className="p-4 font-semibold">Platform</th>
                        <th className="p-4 font-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {job.score}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-white">{job.title}</td>
                          <td className="p-4 text-slate-300">{job.company}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-slate-800 rounded-md text-xs font-medium text-slate-300 border border-slate-700">
                              {job.platform}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 rounded-md transition-colors shadow shadow-blue-600/20">
                              Apply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="mt-20 py-8 border-t border-white/5 text-center text-slate-600 text-sm">
        &copy; 2026 AutoApply AI. Built with premium precision.
      </footer>
    </div>
  );
}

export default App;
