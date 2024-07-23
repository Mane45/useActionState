import Image from "next/image"
import { ICourse } from "../api"
import Link from "next/link"

interface IProps {
    courses: ICourse[]
}
export const CoursesList = ({ courses }: IProps) => {
    return <>
        <div className="column">
            {
                courses.map(course => <div className="column" key={course.id}>
                    <Image
                        src={"/" + course.cover}
                        alt="photo"
                        width={150}
                        height={150}
                    />
                    <p>{course.name}</p>
                    <p>for{course.duration}</p>
                    <p>{course.price} AMD</p>
                    {
                        course.modules?.length && <div className="box">
                            <strong>moduls:</strong>
                            <ul>
                                {
                                    course.modules.map(module =>
                                        <li key={module.id}>{module.title} for {module.duration} months</li>
                                    )
                                }
                            </ul>
                        </div>
                    }
                    <Link href={"/courses/edit/"+ course.id}>edit</Link>
                </div>)
            }
        </div>
    </>
}