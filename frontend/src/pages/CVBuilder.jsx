import React from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import ResumeUpload from '../components/ResumeUpload';

const CVBuilder = () => {
  const handleUploadSuccess = (data) => {
    console.log('Upload success:', data);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CV Builder & Manager</h1>
        <p className="text-slate-400">Upload multiple CVs to A/B test and find what works best.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Upload size={20} className="text-primary-400" />
              Upload New CV
            </h3>
            <ResumeUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-400" />
              AI Recommendations
            </h3>
            <div className="space-y-4">
              {[
                'Add more keywords related to "System Design"',
                'Quantify your impact in the "Google" role',
                'Your "Skills" section is optimized for ATS'
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white/2 rounded-xl text-sm border border-white/5">
                  <div className="w-5 h-5 bg-green-400/10 rounded-full flex items-center justify-center text-green-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-slate-300">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold mb-6">Current Resumes</h3>
            <div className="space-y-4">
              {[
                { name: 'Software_Engineer_2024.pdf', status: 'Primary', date: 'Oct 12, 2024' },
                { name: 'Frontend_Lead_V2.pdf', status: 'Backup', date: 'Oct 08, 2024' },
              ].map((cv, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary-500/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-600/10 rounded-xl flex items-center justify-center text-primary-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-primary-400 transition-colors">{cv.name}</h4>
                      <p className="text-[10px] text-slate-500">{cv.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    cv.status === 'Primary' ? 'bg-primary-600 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {cv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 bg-primary-600/5 border-primary-600/10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-600/20 rounded-xl text-primary-400">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">ATS Score Check</h4>
                <p className="text-sm text-slate-400 mb-4">Your primary resume scored 84/100 for "Senior Frontend" roles. Upgrade to Premium to see detailed improvements.</p>
                <button className="text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors">Improve Score →</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVBuilder;
