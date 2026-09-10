import { useState , useEffect } from 'react'
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Code2,
  Lightbulb,
  Map,
  Menu,
  Sparkles,
  Target,
  X,
  PencilSparkles
} from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useParams } from 'react-router'
import InterviewSkeleton from '../../../components/interviewskeleton'


const sections = [
  { id: "technical", label: "Technical questions", icon: Code2 },
  { id: "behavioral", label: "Behavioral questions", icon: CircleHelp },
  { id: "roadmap", label: "Road Map", icon: Map },
]



const Interview = () => {
  const { interViewId } = useParams()
  
  const { interviewReport , fetchReportById , loading , getResumePdf } = useInterview()
  const interviewData = interviewReport
  
  
  // useEffect(() => {
    //   if (interViewId) {
      //     fetchReportById({interViewId})
      //   }
  // }, [interViewId])
  


  const [activeSection, setActiveSection] = useState("technical")
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedDay, setExpandedDay] = useState(1)

  
  if(loading || !interviewData){
    return <InterviewSkeleton/>
  }

  const questions = activeSection === "behavioral" ? interviewData.behavioralQuestions : interviewData.technicalQuestions
  const selectedQuestion = questions[activeQuestion] ?? questions[0]
  const sectionTitle = activeSection === "technical" ? "Technical Questions" : "Behavioral Questions"

  const pageContent = (() => {
    if (activeSection === "roadmap") {
      return (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7181b4]">7 day plan</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.04em] text-[#1d2434]">Your preparation roadmap</h2>
            <p className="mt-2 text-sm leading-6 text-[#737b8c]">Follow the plan in order to turn your skill gaps into interview-ready strengths.</p>
          </div>
          <div className="space-y-3">
            {interviewData.preparationPlan.map((item) => (
              <div key={item.day} className="overflow-hidden rounded-2xl border border-[#e3e6eb] bg-[#fbfbfa]">
                <button type="button" onClick={() => setExpandedDay(expandedDay === item.day ? 0 : item.day)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf0ff] text-xs font-extrabold text-[#5871c4]">{item.day}</span>
                  <span className="flex-1 text-sm font-bold text-[#293248]">Day {item.day}: {item.focus}</span>
                  <ChevronDown size={17} className={`text-[#8b95aa] transition ${expandedDay === item.day ? "rotate-180" : ""}`} />
                </button>
                {expandedDay === item.day && (
                  <ul className="space-y-2 border-t border-[#eceef2] px-4 py-3 pl-16 text-sm leading-6 text-[#6c7588]">
                    {item.tasks.map((task) => <li key={task} className="list-disc">{task}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7181b4]">{sectionTitle}</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.04em] text-[#1d2434]">Question {activeQuestion + 1}</h2>
          </div>
          <span className="rounded-full bg-[#edf3ff] px-3 py-1.5 text-xs font-bold text-[#5d73bd]">{activeQuestion + 1} / {questions.length}</span>
        </div>
        <div className="rounded-2xl border border-[#e1e5eb] bg-[#fbfbfa] p-5 sm:p-6">
          <h3 className="text-lg font-bold leading-7 text-[#252e42]">{selectedQuestion.question}</h3>
          <div className="mt-6 border-t border-[#e7e9ed] pt-5">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#7181b4]"><Target size={15} /> What this assesses</div>
            <p className="mt-2 text-sm leading-6 text-[#737b8c]">{selectedQuestion.intention}</p>
          </div>
          <div className="mt-5 rounded-xl bg-[#f0f4ff] p-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#5d73bd]"><Lightbulb size={15} /> Answer guidance</div>
            <p className="mt-2 text-sm leading-6 text-[#59667f]">{selectedQuestion.answer}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button type="button" disabled={activeQuestion === 0} onClick={() => setActiveQuestion((current) => current - 1)} className="rounded-xl border border-[#dfe3ea] px-4 py-2.5 text-sm font-bold text-[#68738a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
          <button type="button" disabled={activeQuestion === questions.length - 1} onClick={() => setActiveQuestion((current) => current + 1)} className="inline-flex items-center gap-2 rounded-xl bg-[#273451] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1e2941] disabled:cursor-not-allowed disabled:opacity-40">Next question <ChevronRight size={16} /></button>
        </div>
      </div>
    )
  })()

  const selectSection = (section) => {
    setActiveSection(section)
    setActiveQuestion(0)
    setIsMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-[#f3f3f2] px-2 py-2 text-[#1f2937] sm:px-3 sm:py-3">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-355 overflow-hidden rounded-[22px] border border-[#d9dce0] bg-white shadow-[0_8px_30px_rgba(31,41,55,0.04)]">
        <aside className={`absolute inset-y-3 left-3 z-20 w-61.25 border-r border-[#e0e2e6] bg-white p-5 transition-transform sm:static sm:inset-auto sm:block sm:translate-x-0 ${isMenuOpen ? "translate-x-0" : "translate-x-[-110%]"}`}>
          {/* <div className="mb-14 flex items-center justify-between sm:block">
            <a href="/home" className="text-sm font-extrabold tracking-[-0.03em] text-[#273451]">HirePrep <span className="text-[#7185d0]">AI</span></a>
            <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-lg p-1 text-[#69758b] sm:hidden" aria-label="Close menu"><X size={18} /></button>
          </div> */}
          <div className="mt-auto hidden border-t border-[#eceef1] pt-5 sm:block">
            <a href="/home" className="flex items-center gap-2 text-xs font-bold text-[#8590a1] hover:text-[#4e67b5]"><ArrowLeft size={14} /> Create another plan</a>
          </div>

          <nav className="space-y-2 mt-8">
            {sections.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => selectSection(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeSection === id ? "bg-[#edf3ff] text-[#4e67b5]" : "text-[#5f697c] hover:bg-[#f7f8fa]"}`}>
                <Icon size={17} className={activeSection === id ? "text-[#607bd0]" : "text-[#8a94a7"} /> {label}
              </button>
            ))}
          </nav>
            
          <button className="mt-4 flex items-center gap-2 rounded-lg bg-[#4e67b5] px-4 py-2 text-sm font-bold text-white hover:bg-[#3a5290]" onClick={() => getResumePdf({interViewId})}>
            <PencilSparkles size={17} /> Download Resume
          </button>

        </aside>

        <section className="min-w-0 flex-1 bg-white">

          <header className="flex items-center justify-between border-b border-[#e6e8eb] px-5 py-4 sm:px-8">
            <button type="button" onClick={() => setIsMenuOpen(true)} className="rounded-lg p-1 text-[#69758b] sm:hidden" aria-label="Open menu"><Menu size={20} /></button>
            <div className="hidden items-center gap-2 text-sm font-bold text-[#273451] sm:flex"><ClipboardList size={17} className="text-[#6980ce]" /> Interview workspace</div>
            <div className="ml-auto flex items-center gap-2 text-xs font-bold text-[#778196]"><span className="hidden sm:inline">Profile match</span><span className="rounded-full bg-[#eaf6ed] px-2.5 py-1 text-[#4d9862]">{interviewData.matchScore}%</span></div>
          </header>

          <div className="mx-auto max-w-190 px-5 py-8 sm:px-10 sm:py-12">
            <div className="mb-8 lg:hidden">
              <ProfileMatchCard compact interviewData={interviewData} />
            </div>
            {pageContent}
          </div>
        </section>

        <aside className="hidden w-61.25 shrink-0 border-l border-[#e0e2e6] bg-[#fdfdfc] p-5 lg:block">
          <ProfileMatchCard interviewData={interviewData} />
          <div className="mb-6 mt-8 flex items-center gap-2 text-sm font-bold text-[#273451]"><BookOpen size={17} className="text-[#6980ce]" /> Skill Gaps</div>
          <div className="space-y-3">
            {interviewData.skillGaps.map((gap) => (
              <div key={gap.skill} className="rounded-xl border border-[#e3e6eb] bg-white p-3">
                <div className="flex items-start justify-between gap-2"><p className="text-sm font-bold leading-5 text-[#394258]">{gap.skill}</p><span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${gap.severity === "low" ? "bg-[#8fc49d]" : "bg-[#e2a56b]"}`} /></div>
                <p className="mt-1 text-xs leading-5 text-[#8991a1]">{gap.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-[#f0f4ff] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#657abd]">Focus tip</p>
            <p className="mt-2 text-xs leading-5 text-[#697694]">Spend extra time on the medium-priority gaps before your mock interview.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}

const ProfileMatchCard = ({ compact = false , interviewData }) => {
  const score = Math.max(0, Math.min(100, Number(interviewData.matchScore) || 0))
  const scoreState = score >= 80
    ? {
        label: "Strong match",
        heading: "You're on the right track",
        description: "Your profile aligns strongly with this role. Focus on sharpening the remaining details.",
        border: "border-[#cce5d3]",
        background: "from-[#f2fbf4] via-[#eaf7ed] to-[#e2f2e6]",
        icon: "text-[#4d9862]",
        eyebrow: "text-[#4d9862]",
        ring: "#5cae72",
        ringTrack: "#d9efdf",
        inner: "bg-[#f0faf2]",
        score: "text-[#316d43]",
        subtext: "text-[#699276]",
        progress: "bg-[#5cae72]",
        meta: "text-[#688b70]",
      }
    : score >= 60
      ? {
          label: "Potential match",
          heading: "A solid foundation",
          description: "Your profile shows promise for this role. Close the highlighted gaps to improve your fit.",
          border: "border-[#ead9b9]",
          background: "from-[#fffaf0] via-[#fff5df] to-[#f9edcf]",
          icon: "text-[#c48632]",
          eyebrow: "text-[#b2782e]",
          ring: "#d29a45",
          ringTrack: "#f3e3c5",
          inner: "bg-[#fffaf0]",
          score: "text-[#8b5d21]",
          subtext: "text-[#a17d4e]",
          progress: "bg-[#d29a45]",
          meta: "text-[#997847]",
        }
      : {
          label: "Needs improvement",
          heading: "Room to grow",
          description: "Use the skill gaps and preparation roadmap to strengthen your profile for this role.",
          border: "border-[#edcdd0]",
          background: "from-[#fff5f5] via-[#fceded] to-[#f8e4e6]",
          icon: "text-[#c45b63]",
          eyebrow: "text-[#b34e58]",
          ring: "#d16b73",
          ringTrack: "#f2d9dc",
          inner: "bg-[#fff5f5]",
          score: "text-[#8d3f47]",
          subtext: "text-[#a56d73]",
          progress: "bg-[#d16b73]",
          meta: "text-[#a05f66]",
        }

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-linear-to-br ${scoreState.border} ${scoreState.background} ${compact ? "p-4" : "p-5"}`}>
      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/50 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm ${scoreState.icon}`}>
              <Sparkles size={15} />
            </span>
            <div>
              <p className={`text-xs font-extrabold uppercase tracking-[0.14em] ${scoreState.eyebrow}`}>Profile match</p>
              <p className={`mt-0.5 text-[11px] font-medium ${scoreState.subtext}`}>Based on your role fit</p>
            </div>
          </div>
          <span className={`rounded-full border border-white/70 bg-white/70 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${scoreState.eyebrow}`}>
            {scoreState.label}
          </span>
        </div>

        <div className={`mt-5 flex items-center ${compact ? "gap-4" : "flex-col gap-4 text-center"}`}>
          <div
            className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(${scoreState.ring} ${score * 3.6}deg, ${scoreState.ringTrack} ${score * 3.6}deg 360deg)` }}
            role="img"
            aria-label={`Profile match score: ${score}%`}
          >
            <div className={`flex h-[5.55rem] w-[5.55rem] flex-col items-center justify-center rounded-full ${scoreState.inner}`}>
              <span className={`text-3xl font-black tracking-[-0.08em] ${scoreState.score}`}>{score}%</span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${scoreState.subtext}`}>match</span>
            </div>
          </div>
          <div className={compact ? "min-w-0" : "max-w-47.5"}>
            <p className={`text-sm font-extrabold ${scoreState.score}`}>{scoreState.heading}</p>
            <p className={`mt-1 text-xs leading-5 ${scoreState.subtext}`}>{scoreState.description}</p>
          </div>
        </div>

        <div className="mt-5">
          <div className={`mb-1.5 flex justify-between text-[10px] font-bold uppercase tracking-widest ${scoreState.meta}`}>
            <span>Current fit</span>
            <span>{score} / 100</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/80">
            <div className={`h-full rounded-full ${scoreState.progress}`} style={{ width: `${score}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview
