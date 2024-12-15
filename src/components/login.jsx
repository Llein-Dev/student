"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function Login({
  onLogin
}) {
  const [role, setRole] = useState('teacher')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (role === 'teacher' && password !== 'teacherpass') {
      alert('Mật khẩu giáo viên không đúng')
      return
    }
    onLogin(role, password)
  }

  return (
    (<div className="space-y-6">
      <RadioGroup defaultValue="teacher" onValueChange={(value) => setRole(value)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="teacher" id="teacher" />
          <Label htmlFor="teacher">Giáo viên</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="studentA" id="studentA" />
          <Label htmlFor="studentA">Học Excel</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="studentB" id="studentB" />
          <Label htmlFor="studentB">Nhập môn lập trình</Label>
        </div>
      </RadioGroup>
      {role === 'teacher' && (
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      <Button onClick={handleLogin}>Đăng nhập</Button>
    </div>)
  );
}

