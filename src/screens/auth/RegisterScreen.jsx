import { useForm } from "react-hook-form";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useRegisterMutation } from "../../hooks/auth/useRegisterMutation";
import { passwordRules } from "../../validation/passwordRules";
import PasswordInput from "../../components/PasswordInput";

export default function RegisterScreen({ navigation }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const { mutateAsync, isPending } = useRegisterMutation();

    const onSubmit = async (data) => {
        try {
            await mutateAsync(data);
            navigation.navigate("Login");
        } catch (e) {
            console.log("Register failed", e);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>Create account ✨</Text>
                        <Text style={styles.subtitle}>
                            Sign up to start saving your places
                        </Text>

                        <TextInput
                            placeholder="First name"
                            placeholderTextColor={"#999"}
                            style={[styles.input, errors.firstName && styles.inputError]}
                            onChangeText={(v) =>
                                setValue("firstName", v, { shouldValidate: true })
                            }
                            {...register("firstName", {
                                required: "First name is required",
                            })}
                        />
                        {errors.firstName && (
                            <Text style={styles.error}>{errors.firstName.message}</Text>
                        )}

                        <TextInput
                            placeholder="Last name"
                            placeholderTextColor={"#999"}
                            style={[styles.input, errors.lastName && styles.inputError]}
                            onChangeText={(v) =>
                                setValue("lastName", v, { shouldValidate: true })
                            }
                            {...register("lastName", {
                                required: "Last name is required",
                            })}
                        />
                        {errors.lastName && (
                            <Text style={styles.error}>{errors.lastName.message}</Text>
                        )}

                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={"#999"}
                            style={[styles.input, errors.email && styles.inputError]}
                            onChangeText={(v) =>
                                setValue("email", v, { shouldValidate: true })
                            }
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <Text style={styles.error}>{errors.email.message}</Text>
                        )}

                        <PasswordInput
                            error={errors.password?.message}
                            onChangeText={(v) => setValue("password", v, { shouldValidate: true })}
                            {...register("password", passwordRules)}
                        />

                        {errors.password?.types && Object.values(errors.password.types).map((msg, i) => (
                            <Text key={i} style={styles.error}>{msg}</Text>
                        ))}

                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            disabled={isPending}
                            style={[
                                styles.registerButton,
                                isPending && styles.disabledButton,
                            ]}
                        >
                            {isPending ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.registerButtonText}>
                                    Create account
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 32,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "red",
    },
    error: {
        color: "red",
        marginBottom: 8,
        fontSize: 13,
    },
    registerButton: {
        backgroundColor: "teal",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 16,
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    disabledButton: {
        opacity: 0.6,
    }
});