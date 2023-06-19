const Ucer = require("../model/Role")

exports.index = async (req, res) => {
    let data = {
        index: {
            enter: '/',
            get: "Get information all data for this project"
        },
        autification: {
            enter: '/auth',
            get: "Enter your accaunt",
            post: "Create your account"
        },
        RouteTeacher: {
            enter: '/routeTeacher',
            get: "All teachers",
            get: "By id one teacher",
            put: "Edit teacher data",
            get: "Get one group",
            put: "Edit one group"
        },
        Groups: {
            enter: '/groups',
            get: "Get all groups for one teacher",
            get: "Get one group data for one teacher",
            post: "Create new group for one teacher",
            put: "Edit one group for one teacher",
            delete: "Delete one group"
        },
        Teacher: {
            enter: '/teachers',
            get: "All teachers",
            get: "By id one teacher",
            post: "Cretae new teacher",
            put: "Edit teacher data",
            delete: "Delete teacher"
        },
        Student: {
            enter: '/students',
            get: "All students",
            get: "By id one student",
            post: "Cretae new student",
            put: "Edit student data",
            delete: "Delete student"
        },
        message: "Not exist"
    }
    res.json({ title: "Success", data })
}