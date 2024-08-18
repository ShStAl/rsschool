import { useState, useEffect } from "react";

function PasswordStrength({ password }: { password: string }) {
  const [passwordStrength, setPasswordStrength] = useState({
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecial: false,
  });

  useEffect(() => {
    const validatePassword = (password: string) => {
      setPasswordStrength({
        hasNumber: /[0-9]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    };

    // Validate password when it changes
    validatePassword(password);
  }, [password]);

  return (
    <div className="mt-2 flex gap-2">
      <p
        className={`text-sm ${passwordStrength.hasNumber ? "text-green-500" : "text-red-500"}`}
      >
        Number
      </p>
      <p
        className={`text-sm ${passwordStrength.hasUppercase ? "text-green-500" : "text-red-500"}`}
      >
        Uppercase
      </p>
      <p
        className={`text-sm ${passwordStrength.hasLowercase ? "text-green-500" : "text-red-500"}`}
      >
        Lowercase
      </p>
      <p
        className={`text-sm ${passwordStrength.hasSpecial ? "text-green-500" : "text-red-500"}`}
      >
        Special char
      </p>
    </div>
  );
}

export default PasswordStrength;
