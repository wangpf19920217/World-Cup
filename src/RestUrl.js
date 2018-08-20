// const REST_URLS = {
//     user: '/json/user.json',
//     dept: '/json/department.json',
//     question: '/json/question.json',
//     savedept: '/json/result.json',
//     answer: '/json/answer.json',
// }

const baseUrl = '/activity';
const REST_URLS = {
    user: baseUrl + '/wxuser/user',
    dept: baseUrl + '/dept',
    question: baseUrl + '/question',
    savedept: baseUrl + '/wxuser/savedept',
    valid: baseUrl + '/wxuser/valid',
    answer: baseUrl + '/question/answer',
    rank: baseUrl + '/question/rank',
    signjsapi: '/wxcron/signjsapi',
}

export default REST_URLS;
