import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";

const register = async (email, password, name, selectedFile) => {
    try {
      const userResponse = await createUserWithEmailAndPassword(auth, email, password);
  
      if (userResponse.user) {
        // Fotoğrafı depolamadan önce kullanıcının veritabanına eklemesini beklemek en iyisidir.
        const userRef = collection(db, "users");
        const userDoc = await addDoc(userRef, {
            displayName: name,
            email: email,
            time: serverTimestamp(),
            uid:userResponse.user.uid,
            photoURL: "", // Başlangıçta boş bir photoURL ekleyin
          });
    
  
        // Fotoğrafı yükle
        const storageRef = ref(storage, `user-profiles/${userResponse.user.uid}/${selectedFile.name}`);
        await uploadBytesResumable(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(userDoc, {
            photoURL: downloadURL,
          });
        // Kullanıcının profilini güncelle
        await updateProfile(userResponse.user, {
          displayName: name,
          photoURL: downloadURL,
        });
  
        // Kullanıcının bilgilerini localStorage'a kaydet
        localStorage.setItem('user', JSON.stringify(userResponse.user));
      }
  
      return userResponse.user;
    } catch (error) {
      // Hata yakalama işlemi burada
      console.error(error);
      throw error; // Hatanın daha üst seviyede ele alınabilmesi için tekrar fırlatılır.
    }
  };
  
const logout=async()=>{
    await signOut(auth)
    localStorage.removeItem("user")
}
const login = async (email,password)=>{
    const userresponse =await signInWithEmailAndPassword(auth,email,password);

    if(userresponse.user){
        localStorage.setItem("user",JSON.stringify(userresponse.user))
    }

    return userresponse.user
}
const authService={
    register,
    logout,
    login
}

export default authService