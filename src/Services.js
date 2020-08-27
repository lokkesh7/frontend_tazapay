import axios from 'axios'


const API = axios.create({
    baseURL: "http://localhost:9000/courseData"
})


const Services = {
    fetchCourseTopics: () => API({
        method: 'GET',
        params: {parent: true}
    }),
    fetchLessonData: ({sectionName,lessonName}) => {
        const params = {name: lessonName}
        if(sectionName) {
            params.parentName = sectionName
        }
        return API({
            method: 'GET',
            params
        })
    }
}

export default Services