const { User, Post, Favorite } = require("./../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    console.log("Полученные данные:", req.body);

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }

      const { nickname, username, password, email } = req.body;

      const candidateByUsername = await User.findOne({ where: { nickname } });
      if (candidateByUsername) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const candidateByEmail = await User.findOne({ where: { email } });
      if (candidateByEmail) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const user = await User.create({
        nickname,
        username,
        password: hashPassword,
        email,
      });

      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req, res) {
    console.log("Полученные данные для входа:", req.body);
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }

      const token = generateAccessToken(user.id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка при входе" });
    }
  }

  async auth(req, res) {
    try {
      console.log("Проверка authMiddleware:", req.user);

      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const token = generateAccessToken(user.id);

      return res.json({
        token,
        user: {
          id: user.id,
          nickname: user.nickname,
          username: user.username,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }

  async updateProfile(req, res) {
    try {
      console.log("Полученные данные:", req.body, "id");
      const { username, nickname, bio } = req.body;
      const userId = req.params.id; 

  
      if (!username && !nickname && !bio) {
        return res
          .status(400)
          .json({
            message: "Нужно передать хотя бы одно поле для обновления.",
          });
      }

      if (nickname) {
        const existingNickname = await User.findOne({ where: { nickname } });
        if (existingNickname) {
          return res.status(400).json({ message: "Этот никнейм уже занят." });
        }
      }

     
      if (username) {
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
          return res.status(400).json({ message: "Это имя уже занято." });
        }
      }

  
      const updatedUser = await User.update(
        { username, nickname, bio }, 
        { where: { id: userId } }
      );

      if (updatedUser[0] === 0) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      return res.json({ message: "Данные пользователя успешно обновлены" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка при обновлении данных" });
    }
  }
}

module.exports = new authController();
