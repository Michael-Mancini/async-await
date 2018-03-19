const users = [{
    id: 1,
    name: 'Martin Shkrelli',
    schoolId: 101
},
{
    id: 2,
    name: 'Tim Ferriss',
    schoolId: 789
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
},
{
    id: 2,
    schoolId: 789,
    grade: 69
},
{
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        // .find() gets called one time for each item in the array
        // can also be written:
        // const user = users.find((user) => user.id === id)
        const user = users.find((user) => {
            return user.id === id;
        });

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => {
                return a + b;
            }) / grades.length;
        }
        return `${user.name} has a ${average}% in the class.`;
        console.log(average);
    });
};

// getUser(6).then((user) => {
//     console.log(user);
// }).catch((e) => console.log(e));

// getGrades(101).then((user) => {
//     console.log(user);
// }).catch((e) => console.log(e));

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => console.log(e));

/* ------------------------------------------- */

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let average = 0;

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => {
            return a + b;
        }) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(2).then((name) => {
    console.log(name);
}).catch(e => {
    console.log(e);  
});