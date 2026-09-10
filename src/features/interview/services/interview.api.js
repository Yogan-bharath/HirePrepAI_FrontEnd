import axios  from "axios";

const api = axios.create({
    baseURL:"https://hire-prep-ai-back-end.vercel.app",
    withCredentials:true
})


export const generateInterviewReport = async({jobDescription, resume, selfDescription})=>{
    try{
        const formData = new FormData();
        formData.append("jobDescription",jobDescription)
        formData.append("selfDescription",selfDescription)
        formData.append("resume",resume)
        const response = await api.post("/api/interview",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
}
export const getInterviewReportById = async({interViewId})=>{
    try{
        const response = await api.get(`/api/interview/report/${interViewId}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report:", error);
        throw error;
    }
}

export const getAllInterviewReports = async()=>{
    try{
        const response = await api.get("/api/interview")
        return response.data;
    } catch (error) {
        console.error("Error fetching all interview reports:", error);
        throw error;
    }
}

export const generateResumePdf = async({interViewId})=>{
    
    try{

        const response = await api.post(`/api/interview/resume/pdf/${interViewId}`,null,{
            responseType: 'blob' // Important: Set the response type to 'blob' to handle binary data,
        });

        return response.data;

    }   catch (error) {
        console.error("Error generating resume PDF:", error);
        throw error;
    }
}