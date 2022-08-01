import { ref } from "vue";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";

const error = ref(null)

const register = async (email, password, displayName) => {
    error.value = null

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // userCredential.user.updateProfile({ displayName })
            // ...
        })
        .catch((err) => {
            const errorCode = err.code;
            error.value = err.message;
            // ..
        })

    await updateProfile(auth.currentUser, { displayName })
        .then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
}

const useRegister = () => {
    return { error, register }
}

export default useRegister
