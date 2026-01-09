import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, User, Phone, Mail, School } from "lucide-react";
import type { UserInfo } from "@/lib/matchingAlgorithm";

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

export default function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [formData, setFormData] = useState<UserInfo>({
    fullName: "",
    contactNumber: "",
    email: "",
    highSchool: ""
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.highSchool.trim()) {
      newErrors.highSchool = "High school is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof UserInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-xl mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[hsl(220,70%,25%)] rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[hsl(220,30%,15%)] mb-2">
          Before We Begin
        </h2>
        <p className="text-gray-600">
          Please provide your information so we can send you your results
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4" />
            Contact Number
          </Label>
          <Input
            id="contactNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.contactNumber}
            onChange={handleChange("contactNumber")}
            className={errors.contactNumber ? "border-red-500" : ""}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm">{errors.contactNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="highSchool" className="flex items-center gap-2 text-gray-700">
            <School className="w-4 h-4" />
            High School
          </Label>
          <Input
            id="highSchool"
            type="text"
            placeholder="Enter your high school name"
            value={formData.highSchool}
            onChange={handleChange("highSchool")}
            className={errors.highSchool ? "border-red-500" : ""}
          />
          {errors.highSchool && (
            <p className="text-red-500 text-sm">{errors.highSchool}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)] py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            Continue to Quiz
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
