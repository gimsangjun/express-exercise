import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user";
import session from "express-session";

// 회원가입
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "해당 username은 이미 사용 중입니다." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해시화

    const newUser: IUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    res.status(500).json({ message: "회원가입 중 오류 발생" });
  }
};

// 로그인
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body as { username: string; password: string };

    // req.session이 존재하는지 확인
    if (!req.session) {
      res.status(500).json({ message: "세션이 없습니다." });
      return;
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    // 로그인 성공 처리 (세션 등)
    // res.cookie("userToken", user._id, { httpOnly: true });
    req.session.user = "heelo";
    console.log(req.session.user);
    // console.log(req.session.cookie);
    // console.log(req.session.user);
    // let example = myDts.test("hi");
    // console.log(example);
    res.status(200).json({ message: "로그인 성공" });
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res.status(500).json({ message: "로그인 중 오류 발생" });
  }
};

// 로그아웃
export const logout = async (req: Request, res: Response): Promise<void> => {
  // 로그아웃 처리 (세션 등)
  res.status(200).json({ message: "로그아웃 성공" });
};

// 로그인한 사용자 정보 확인
export const profile = async (req: Request, res: Response) => {
  try {
    // 쿠키에서 사용자 ID 추출
    const userId = req.cookies.userToken;
    console.log(userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 사용자 검색
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 사용자 정보 반환
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
