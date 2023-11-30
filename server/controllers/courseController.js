const accountQueries = require("../database/queries/accountQueries");
const courseQueries = require("../database/queries/courseQueries");

async function favoriteCourse(req, res) {
    console.log("favoriteCourse");

    const { user_id, course_name } = req.body;
    if (!user_id || !course_name) {
        return res.status(400).json({ message: "Missing user_id or course_id" });
    }

    const course_id = await courseQueries.getCourseID(course_name);

    let db_res = await accountQueries.favoriteCourseQuery(user_id, course_id);
    if (db_res) {
        console.log("Course favorited succesfully");
        return res.status(200).json({ message: "Course favorited succesfully" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
}

async function unfavoriteCourse(req, res) {
    console.log("unfavoriteCourse");

    const { user_id, course_name } = req.body;
    if (!user_id || !course_name) {
        return res.status(400).json({ message: "Missing user_id or course_id" });
    }

    const course_id = await courseQueries.getCourseID(course_name);

    let db_res = await accountQueries.unfavoriteCourseQuery(user_id, course_id);
    if (db_res) {
        console.log("Course favorited succesfully");
        return res.status(200).json({ message: "Course favorited succesfully" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
}

async function getFavoriteCourses(req, res) {
    console.log("getFavoriteCourses");

    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ message: "Missing user_id" });
    }

    let db_res = await accountQueries.getFavoriteCoursesQuery(user_id);
    if (db_res != null) {
        console.log("Courses retrieved succesfully");
        return res.status(200).json({ courses: db_res });
    }

    return res.status(500).json({ error: "Internal Server Error" });
}

async function isFavoriteCourse(req, res) {
    console.log("isFavoriteCourse");

    const { user_id, course_name } = req.body;
    if (!user_id || !course_name) {
        return res.status(400).json({ message: "Missing user_id or course_id" });
    }

    const course_id = await courseQueries.getCourseID(course_name);

    let db_res = await accountQueries.isFavoriteCourseQuery(user_id, course_id);
    if (db_res == null) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

    if (db_res) {
        console.log("Is a favorited course!");
        return res.status(200).json({ isFav: true });
    } else {
        console.log("Is not a favorited course!");
        return res.status(200).json({ isFav: false });
    }
}

module.exports = {
    favoriteCourse,
    unfavoriteCourse,
    getFavoriteCourses,
    isFavoriteCourse,
};