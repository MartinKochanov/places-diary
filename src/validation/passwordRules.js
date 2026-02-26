export const passwordRules = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
    },
    maxLength: {
        value: 20,
        message: "Password must be at most 20 characters",
    },
    validate: {
        lowercase: (v) =>
            /[a-z]/.test(v) || "Must contain a lowercase letter",
        uppercase: (v) =>
            /[A-Z]/.test(v) || "Must contain an uppercase letter",
        digit: (v) =>
            /[0-9]/.test(v) || "Must contain a digit",
        special: (v) =>
            /[^A-Za-z0-9]/.test(v) || "Must contain a special character",
        whitespace: (v) =>
            !/\s/.test(v) || "Must not contain spaces",
    },
};