const userController = require("../controllers/userControllers");
const User = require("../models/userModel");

jest.mock("../models/userModel");

describe("UserController", () => {
  describe("signUp", () => {
    it("should create a new user and return a token in the response", async () => {
      const req = {
        body: {
          name: "John",
          password: "password",
          role: "user",
        },
      };
      const res = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.create.mockResolvedValue({
        _id: "userId",
        name: "John",
        password: "hashedPassword",
      });

      await userController.signUp(req, res);

      expect(User.create).toHaveBeenCalledWith({
        name: "John",
        password: "password",
        role: "user",
      });
      expect(res.cookie).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        token: expect.any(String),
        data: {
          user: {
            _id: "userId",
            name: "John",
          },
        },
      });
    });
  });
});
