import { getAllCourses } from "../lib/api"
import { CoursesList } from "../lib/components/courses-list"

export default function Page() {
    const list = getAllCourses()
    console.log(list)
    return <>
        <h1 className="is-size-2">Courses</h1>
        <p>Choose the best courses in the world!!</p>
        <CoursesList courses={list}/>
    </>
}