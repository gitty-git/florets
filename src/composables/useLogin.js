import { ref } from "vue";
import { auth } from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const error = ref()

const login = async (email, password) => {
    error.value = null
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((err) => {
            const errorCode = err.code;
            error.value = err.message;
        });
}

const useLogin = () => {
    return { error, login }
}

export default useLogin
