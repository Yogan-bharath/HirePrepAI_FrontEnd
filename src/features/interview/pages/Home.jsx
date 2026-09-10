import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, ChevronDown, Eye, FileText, Info, Sparkles, Upload } from 'lucide-react'
import logo from '../../../assets/logo.png'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'
import { useInterview } from '../hooks/useInterview'
import {Logout} from "../../../features/auth/services/auth.api"
import HomeSkeleton from '../../../components/Homeskeleton'

const Home = () => {
  const {loading , generateReport , interviewReports } = useInterview()

  const navigate = useNavigate()
  const [showAllReports, setShowAllReports] = useState(false)
  const visibleReports = showAllReports ? interviewReports : interviewReports.slice(0, 3)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobDescription: '',
      selfDescription: '',
      resume: null,
    },
  })

  const jobDescription = watch('jobDescription') || ''
  const selfDescription = watch('selfDescription') || ''
  const resumeFile = watch('resume')

   
  if(loading){
    return <HomeSkeleton/>
  }

  const onSubmit = async(data) => {
      if (!data.resume && !data.selfDescription) {
        toast.error('Either a Resume or a Self Description is required to generate a personalized plan.')
        return
      }

      if (data.resume && data.resume.size > 5 * 1024 * 1024) {
        toast.error('Resume file size should not exceed 5MB.')
        return
      }

      try {
        
        const { _id } = await generateReport(data)
        navigate(`/interview/${_id}`)
      } catch (error) {
        console.error('Error generating interview report:', error)
        toast.error('Failed to generate interview report. Please try again.')
      }
  }

  const handleLogout = async () => {
    try {
      await Logout()
      location.reload() // Refresh the page to reset the state
      toast.success('Logged out successfully.')
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Logout failed. Please try again.')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-white text-slate-800">
      <header className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-[-0.08em] text-[#1d2434] sm:text-4xl">
            <img src={logo} className="h-20" alt="HirePrep AI" />
          </h1>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-[#2e3749]">
          <button onClick={handleLogout} type="button" className="cursor-pointer rounded-full border border-[#dfe3ee] bg-white/60 px-4 py-2 text-sm font-semibold text-[#1d2434] shadow-sm transition hover:bg-white">
            Logout
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6 lg:px-8">
        <section className="rounded-[28px] bg-[#f3f3f2] px-2 py-6 sm:px-4 lg:px-0">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c7d3fb] bg-[#edf3ff] px-3 py-1.5 text-[12px] font-medium text-[#4d6cc9] shadow-sm">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#4d6cc9]">
                <Sparkles size={10} className="stroke-[2.5]" />
              </span>
              AI-Powered Interview Preparation
            </div>

            <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.06em] text-[#1f2a3d] sm:text-5xl lg:text-[5rem]">
              Create Your Custom
              <span className="mt-1 block">Interview Plan</span>
            </h2>

            <p className="mt-5 max-w-[680px] text-base text-[#5d6478] sm:text-lg">
              Let our AI analyze the job requirements and your unique profile to build a winning interview strategy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] sm:p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6dbe5] bg-[#f1f3f5] text-[#2a344d]">
                    <FileText size={19} className="stroke-[2]" />
                  </div>
                  <h3 className="text-[1.05rem] font-semibold text-[#1d2434] sm:text-[1.55rem]">Target Job Description</h3>
                </div>

                <span className="rounded-md border border-[#efb0b0] bg-[#fbe6e6] px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-[#d14a4a]">
                  REQUIRED
                </span>
              </div>

              <textarea
                {...register('jobDescription', {
                  required: true,
                  maxLength: 5000,
                  validate: (value) => value.trim().length > 0,
                })}
                placeholder="Paste the full job description here. The more detail, the better the AI can tailor your plan."
                aria-label="Job description"
                className="h-[280px] w-full resize-none rounded-[14px] border border-[#e2e7ee] bg-[#f3f4f4] px-3 py-3 text-[0.95rem] leading-7 text-[#586177] outline-none placeholder:text-[#9aa4b5]"
              />

              <div className="mt-3 flex justify-end text-xs font-medium text-[#8d96aa]">
                {jobDescription.length} / 5000
              </div>

              {errors.jobDescription && (
                <p className="mt-2 text-xs text-red-500">Job description is required.</p>
              )}
            </div>

            <div className="rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] sm:p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6dbe5] bg-[#f1f3f5] text-[#2a344d]">
                  <BriefcaseBusiness size={18} className="stroke-[2]" />
                </div>
                <h3 className="text-[1.05rem] font-semibold text-[#1d2434] sm:text-[1.55rem]">Your Profile</h3>
              </div>

              <div className="rounded-[18px] border border-dashed border-[#cfd4dc] bg-[#f3f4f4] px-4 py-6 text-center">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  {...register('resume')}
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null
                    setValue('resume', file, { shouldValidate: true, shouldDirty: true })
                  }}
                />

                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7dce6] bg-white text-[#6d7a8f] shadow-sm">
                    <Upload size={20} className="stroke-[2]" />
                  </div>
                  <p className="text-[1.05rem] font-medium text-[#6b7285]">
                    {resumeFile ? resumeFile.name : 'Drag and drop your resume'}
                  </p>
                  <p className="mt-1 text-xs text-[#8c94a6]">PDF, DOCX or TXT</p>
                  <span className="mt-5 inline-flex rounded-lg border border-[#d1d9e5] bg-[#f7f8fa] px-4 py-2 text-sm font-semibold text-[#2a344d] shadow-sm hover:bg-white">
                    Browse Files
                  </span>
                </label>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[0.95rem] font-medium text-[#5a6378]">
                  Quick Self-Description <span className="text-[#8d96aa]">(Optional)</span>
                </label>
                <textarea
                  {...register('selfDescription', {
                    maxLength: 1000,
                  })}
                  placeholder="Briefly describe your current role, key skills, and years of experience.."
                  aria-label="Self description"
                  className="h-[92px] w-full resize-none rounded-[14px] border border-[#e2e7ee] bg-[#f3f4f4] px-3 py-3 text-[0.95rem] leading-6 text-[#586177] outline-none placeholder:text-[#9aa4b5]"
                />
                <div className="mt-2 flex justify-end text-xs font-medium text-[#8d96aa]">
                  {selfDescription.length} / 1000
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-[#dfe3e8] bg-[#f3f4f4] px-3 py-3 text-[#5e6778]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#b8c2d4] bg-white text-[#4c5d8c]">
                  <Info size={10} className="stroke-[2.4]" />
                </div>
                <p className="text-sm text-[#59657c]">
                  Either a Resume or a Self Description is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6dbe5] bg-[#edf3ff] text-[#5e7ad9]">
                <Sparkles size={18} className="stroke-[2.2]" />
              </div>
              <div>
                <p className="text-[1.05rem] font-bold text-[#1e283e]">AI-Powered Strategy Generation</p>
                <p className="text-sm text-[#6d7687]">Approx. 30s to generate</p>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dbe3f5] bg-[#f3f6fd] px-5 py-3 text-base font-semibold text-[#2a344d] shadow-sm transition hover:bg-white"
            >
              Generate My Interview Strategy
              <ArrowUpRight size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7181b4]">Your workspace</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[#1f2a3d] sm:text-3xl">
                Interview Plans
              </h2>
            </div>
            {interviewReports.length > 0 && (
              <span className="hidden text-sm font-medium text-[#8a93a5] sm:block">
                {interviewReports.length} {interviewReports.length === 1 ? 'plan' : 'plans'}
              </span>
            )}
          </div>

          {interviewReports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleReports.map((report) => (
                <article
                  key={report._id}
                  className="flex min-h-[218px] gap-2 flex-col rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d6dbe5] bg-[#edf3ff] text-[#5e7ad9]">
                      <FileText size={18} />
                    </div>
                    <span className="rounded-full border border-[#c9d5f7] bg-[#edf3ff] px-2.5 py-1 text-xs font-bold text-[#5d72bd]">
                      {typeof report.matchScore === 'number' ? `${report.matchScore}% match` : 'Match pending'}
                    </span>
                  </div>

                  <h3 className="mt-5 line-clamp-2 text-lg font-bold leading-6 text-[#263149]" title={report.title}>
                    {report.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#8790a2]">
                    <CalendarDays size={14} />
                    {new Date(report.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate(`/interview/${report._id}`)}
                    className="mt-auto  inline-flex items-center justify-center gap-2 rounded-xl border border-[#d7dfef] bg-[#f0f4ff] px-4 py-2.5 text-sm font-bold text-[#5269b2] transition hover:bg-white"
                  >
                    <Eye size={16} />
                    View report
                    <ArrowUpRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[22px] border border-dashed border-[#cfd4dc] bg-[#f7f7f5] px-5 py-10 text-center">
              <FileText className="mx-auto text-[#9aa4b5]" size={24} />
              <p className="mt-3 text-sm font-semibold text-[#59657c]">Your interview plans will appear here.</p>
              <p className="mt-1 text-xs text-[#8a93a5]">Generate your first plan to start preparing.</p>
            </div>
          )}

          {interviewReports.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllReports((current) => !current)}
              className="mx-auto mt-5 flex items-center gap-2 rounded-xl border border-[#d7dfef] bg-[#f0f4ff] px-4 py-2.5 text-sm font-bold text-[#5269b2] transition hover:bg-white"
            >
              {showAllReports ? 'Show fewer plans' : `Show all ${interviewReports.length} plans`}
              <ChevronDown size={16} className={`transition-transform ${showAllReports ? 'rotate-180' : ''}`} />
            </button>
          )}
        </section>
      </main>
    </form>
  )
}

export default Home