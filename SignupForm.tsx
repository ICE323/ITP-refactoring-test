import { useState, ChangeEvent, FormEvent, HTMLProps } from "react";

// Input component
function Input({ ...props }: HTMLProps<HTMLInputElement>) {
  return <input {...props} />;
}

type UserType = "admin" | "customer";

// SignupForm component interface
interface SignupFormProps {
  onSubmit: (values: FormValues) => void;
  userType: UserType;
}

// Form values interface
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  employeeId?: string;
  dob?: string;
}

// SignupForm component
export default function SignupForm({ onSubmit, userType }: SignupFormProps) {
  // State for form values
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    employeeId: "",  
    dob: "",
  });

  // Function to handle input change
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormValues
  ) => {
    const newValue = event?.target?.value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: newValue,
    }));
  };

  // Function to validate form fields
  const validateFormFields = () => {
    const { firstName, lastName, email, password, employeeId } = formValues;

    if (!firstName.trim()) {
      alert("Please input your first name");
      return false;
    }

    if (!lastName.trim()) {
      alert("Please input your last name");
      return false;
    }

    if (!email.trim()) {
      alert("Please input your email");
      return false;
    }

    if (!password.trim()) {
      alert("Please input your password");
      return false;
    }

    if (userType === "admin" && !employeeId) {
      alert("Admin users must input their employeeId");
      return false;
    }

    // Return true if all fields are valid
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields
    if (!validateFormFields()) {
      return;
    }

    // Submit form values
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{userType === "admin" ? "Admin Login" : "User Login"}</h1>

      {/* First Name field */}
      <label htmlFor="firstName">First Name</label>
      <Input
        id="firstName"
        value={formValues.firstName}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, "firstName")}
      />

      {/* Last Name field */}
      <label htmlFor="lastName">Last Name</label>
      <Input
        id="lastName"
        value={formValues.lastName}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, "lastName")}
      />

      {/* Employee ID field (only for admin users) */}
      {userType === "admin" && (
        <>
          <label htmlFor="employeeId">Employee ID</label>
          <Input
            id="employeeId"
            value={formValues.employeeId || ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, "employeeId")}
          />
        </>
      )}

      {/* DOB field */}
      <label htmlFor="dob">DOB</label>
      <Input
        id="dob"
        value={formValues.dob || ""}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, "dob")}
      />

      {/* Email field */}
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        type="email"
        value={formValues.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, "email")}
      />

      {/* Password field */}
      <label htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        value={formValues.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, "password")}
      />

      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
}
