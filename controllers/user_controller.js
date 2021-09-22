module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: "user/profile"
    });
}
module.exports.friend = function(req, res) {
    res.end('<h1>Friends Section</h1>')
}