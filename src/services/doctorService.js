import db from '../models/index.js'

let handleGetTopDoctorHomepage = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.User.findAll({
                where: { roleId: 'R2' },
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errorCode: 0,
                message: 'ok',
                data: res
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let handleFetchDoctorSelect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errorCode: 0,
                message: 'ok',
                data: res
            })
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleCreateDoctorMarkdown = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter'
                })
            }
            else {
                let res = db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    doctorId: inputData.doctorId
                })
                resolve({
                    errorCode: 0,
                    message: 'ok',
                    data: res
                })
            }
        }
        catch (e) {
            console.log(e)
        }

    })
}
let handleGetDetailDoctor = (id) => {
    return new Promise(async (resovle, reject) => {
        try {
            if (id) {
                let user = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown }
                    ],
                    raw: true,
                    nest: true
                })
                resovle({
                    errorCode: 0,
                    message: 'ok',
                    user: user
                })
            }
            else {
                resovle({
                    errorCode: 1,
                    message: 'Missing params id',
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleGetTopDoctorHomepage, handleFetchDoctorSelect, handleCreateDoctorMarkdown, handleGetDetailDoctor
}