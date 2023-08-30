import { randomUUID } from "crypto";
import { prisma } from "../interface/PrismaInstance";
import fs from 'fs';
import path from "path";
import { pipeline } from "stream";
import util from 'util';
const pump = util.promisify(pipeline)

export const labService = {
    reportExam: async (examId: any, data: any) => {
        const jsonData = JSON.stringify(data)
        await prisma.reportForExams.create({
            data: {textReport: jsonData, examsForPet: {connect: {id: parseInt(examId)}}},
        })
    },

    saveExamPdfs: async (data: any) => {
        const filePath = path.join(__dirname, '..', './pdfs_images')
        try {
            const files = data
            let paths = []

            for await (const parts of files) {
                let id = randomUUID()
                let extension = path.extname(parts.filename)
                await pump(parts.file, fs.createWriteStream(`${filePath}/${id}${extension}`))
                paths.push(`${id}${extension}`)
            }

            if(paths.length < 0) return

            return paths

        } catch (error) {
            console.log(error)
        }
    },

    returnExamFile: async (fileId: string) => {
        const filePath = path.join(__dirname, '..', 'pdfs_images', `${fileId}`)
        if (!fs.existsSync(filePath)) {
          return;
        }

        const stream = fs.readFileSync(filePath);

        return stream
    }
}


