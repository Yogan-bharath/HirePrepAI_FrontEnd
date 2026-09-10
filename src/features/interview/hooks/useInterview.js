import {generateInterviewReport,getInterviewReportById,getAllInterviewReports,generateResumePdf} from "../services/interview.api"
import {useContext,useEffect} from 'react'
import {InterviewContext} from "../state/interview.context"
import {AuthContext} from "../../auth/state/auth.context"
import {useParams} from "react-router"

export const useInterview = ()=>{
    const {interViewId} = useParams()
    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    
    const {loading , setLoading , interviewReport , setInterviewReport , interviewReports , setInterviewReports} = context;
    const { user } = useContext(AuthContext); // Access the user from AuthContext


    const generateReport = async ({jobDescription, resume, selfDescription})=>{
        setLoading(true)
        try{
            const response = await generateInterviewReport({jobDescription, resume, selfDescription})
            setInterviewReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchReportById = async ({interViewId})=>{
        setLoading(true)
        try{
            const response = await getInterviewReportById({interViewId})
            setInterviewReport(response.interviewReport)
            return response.interviewReport
            } catch (error){
                throw new Error(error.message);
            } finally {
                setLoading(false)
            }
        }
    const fetchAllReports = async ()=>{
        setLoading(true)
        try{
            const response = await getAllInterviewReports()
            setInterviewReports(response.interviewReports)
            return response.interviewReports
        } catch (error){
            throw new Error(error.message); 
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async({interViewId})=>{
        setLoading(true)

        try{
            const response = await generateResumePdf({interViewId})
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${user?.username || interViewId}_resume.pdf`);
            document.body.appendChild(link);
            link.click();
            // link.parentNode.removeChild(link);
            // window.URL.revokeObjectURL(url);
            return response
        } catch (error){
            throw new Error(error.message);
        } finally {
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(interViewId){
            fetchReportById({interViewId})
        }else{
            fetchAllReports()
        }
    },[interViewId])

    return {loading , interviewReport , interviewReports , generateReport , fetchReportById , fetchAllReports , getResumePdf}

}   