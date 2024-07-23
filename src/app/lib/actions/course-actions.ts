"use server"

import { createWriteStream } from "fs"
import { InputCourse, InputModule, addCourse, addModule, getAllCourses, updateCourseById } from "../api"
import { redirect } from "next/navigation"
//import { type } from "os"

export const handleAdd = async (prev: unknown, data: FormData) => {
   const list = getAllCourses()
   const hasName = list.filter(el => el.name == data.get('name'))

   if (!data.get('name') || !data.get('price') || !data.get('duration')) {
      return {
         message: "Please fill all the fields.",
         name: data.get('name'),
         price: data.get('price')
      }
   } else if (hasName.length > 0) {
      return {
         message: "Please choose another name for the course.",
         name: data.get('name'),
         price: data.get('price'),
         duration: data.get('duration')
      }
   } else if (isNaN(Number(data.get('price')))) {
      return {
         message: 'Price must be a number.',
         name: data.get('name'),
         price: data.get('price'),
         duration: data.get('duration')
      }
   } else if (isNaN(Number(data.get('duration')))) {
      return {
         message: "Duration must be a number.",
         name: data.get('name'),
         price: data.get('price'),
         duration: data.get('duration')
      }
   }
   const photo = data.get('cover') as File
   if (photo) {
      let extension = photo.type.split("/").at(-1)
      const filename = Date.now() + "." + extension

      const stream = createWriteStream("public/images/" + filename)

      const bufferedImage = await photo.arrayBuffer()

      stream.write(Buffer.from(bufferedImage))


      let course: InputCourse = {
         name: data.get('name') as string,
         price: +(data.get('price') as string),
         duration: +(data.get('duration') as string),
         cover: 'images/' + filename
      }
      console.log(prev)
      addCourse(course)
      redirect("/courses")
      
   }
}

export const handleUpdate = async (id: number, data: FormData) => {
   //console.log("ghjkl", id, data)
   const course: Partial<InputCourse> = {
      name: data.get("name") as string,
      price: +(data.get("price") as string),
      duration: +(data.get("duration") as string)
   }

   const photo = data.get("cover") as File
   if (photo.size > 0) {
      let extension = photo.type.split("/").at(-1)
      const filename = Date.now() + "." + extension
      const stream = createWriteStream("public/images/" + filename)
      const bufferedImage = await photo.arrayBuffer()
      course.cover = "images/" + filename
      stream.write(Buffer.from(bufferedImage))
   }


   updateCourseById(id, course)
   redirect("/courses")

}

export const handleAddModule = (data: FormData) => {
   //console.log(data)
   let module: InputModule = {
      title: data.get('title') as string,
      duration: +(data.get('duration') as string),
      courseId: +(data.get('courseId') as string)
   }
   let result = addModule(module)
   console.log(result)
   redirect("/courses")
}