const { db } = require('../../Connect_Server/db')
async function GetScore(id) {
    const score = await db.oneOrNone('SELECT points FROM user_points WHERE id = $1', [id]);
    return score;
}
module.exports={GetScore}
