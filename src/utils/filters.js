
export function filterPage(courses, page){
    const result = courses.filter(course=>course.page != page);

    return result;
}

