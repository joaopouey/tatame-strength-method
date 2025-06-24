
import { useState } from "react";

export const useRegistrationData = () => {
  // User registration data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Anamnesis data
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [jiujitsuExperience, setJiujitsuExperience] = useState("");
  const [trainingGoals, setTrainingGoals] = useState<string[]>([]);
  const [availableTime, setAvailableTime] = useState([45]);
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [injuries, setInjuries] = useState("");
  const [limitations, setLimitations] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [supplements, setSupplements] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setTrainingGoals([...trainingGoals, goal]);
    } else {
      setTrainingGoals(trainingGoals.filter(g => g !== goal));
    }
  };

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setPreferredDays([...preferredDays, day]);
    } else {
      setPreferredDays(preferredDays.filter(d => d !== day));
    }
  };

  return {
    // User data
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    fullName, setFullName,
    
    // Anamnesis data
    age, setAge,
    weight, setWeight,
    height, setHeight,
    sex, setSex,
    activityLevel, setActivityLevel,
    jiujitsuExperience, setJiujitsuExperience,
    trainingGoals, handleGoalChange,
    availableTime, setAvailableTime,
    preferredDays, handleDayChange,
    injuries, setInjuries,
    limitations, setLimitations,
    medicalConditions, setMedicalConditions,
    supplements, setSupplements,
    additionalInfo, setAdditionalInfo,
  };
};
