"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Login({ onLogin }) {
  const [role, setRole] = useState("teacher");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (role === "teacher" && password !== "teacherpass") {
      alert("Mật khẩu giáo viên không đúng");
      return;
    }
    onLogin(role, password);
  };

  return (
    <div className="w-full uppercase md:w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center">Đăng nhập</h2>
      <RadioGroup
        defaultValue="teacher"
        onValueChange={(value) => setRole(value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="teacher" id="teacher" />
          <Label htmlFor="teacher" className="cursor-pointer">
            Giáo viên
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="studentA" id="studentA" />
          <Label htmlFor="studentA" className="cursor-pointer">
            Học Excel
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="studentB" id="studentB" />
          <Label htmlFor="studentB" className="cursor-pointer">
            Nhập môn lập trình
          </Label>
        </div>
      </RadioGroup>

      {role === "teacher" && (
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
          />
        </div>
      )}

      <Button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Đăng nhập
      </Button>
    </div>
  );
}
