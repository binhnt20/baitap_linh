const User = require("../models/User"),
  jwtHelper = require("../../helpers/jwt");

class SiteControllers {
  // POST: /login
  async loginHandle(req, res) {
    var messages;
    if (!req.body.username || !req.body.password) {
      messages = "Tên đăng nhập hoặc mật khẩu không chính xác!";
    } else {
      var user = await User.findOne({ username: req.body.username });
      if (!user) {
        messages = "Tên đăng nhập hoặc mật khẩu không chính xác!";
      } else {
        if (!user.validPassword(req.body.password)) {
          messages = "Tên đăng nhập hoặc mật khẩu không chính xác!";
        } else {
          if (!user.allow)
            messages =
              "Quyền truy cập hệ thống đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên để được hỗ trợ!";
          else {
            const currentUser = user;
            const accessToken = await jwtHelper.generateToken(
              currentUser,
              global.accessTokenSecret,
              global.accessTokenLife
            );
            const refreshToken = await jwtHelper.generateToken(
              currentUser,
              global.refreshTokenSecret,
              global.refreshTokenLife
            );

            global.tokenList[refreshToken] = currentUser;
            res.status(200).json({
              success: true,
              message: "Đăng nhập thành công!",
              token: accessToken,
            });
          }
        }
      }
    }
    if (messages) {
      res.status(400).json({
        success: false,
        message: messages,
      });
    }
  }

  // GET: /logout
  logout(req, res) {
    if (req.cookies.accessToken) {
      res.clearCookie("accessToken");
      res.redirect("/login");
    }
  }
}

module.exports = new SiteControllers();
