import React, {createContext, useContext, useState,useEffect,useMemo} from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signInWithCredential, signOut } from 'firebase/auth';
import {auth, provider} from '../firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext= createContext({});

const config={
  androidClientId: '1007469413288-rtf95lccl00re9fcn9vou9m34972o5q5.apps.googleusercontent.com',  
  iosClientId: '1007469413288-8of6uknnlh01i1slod322ot9shvd1g70.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({children}) => { 
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user);
        
      }else {
        setUser(null);
      }
      setLoadingInitial(false);
    })
  }, [])
  

    const logout=()=>{
      setLoading(true);
      signOut(auth).then(()=>{
        console.log("LoggedOUT...")
      })
      .catch((error)=> setError(error))
      .finally(()=> setLoading(false));
    }

    const signInWithGoogle= async() => {
      setLoading(true);
      console.log("before...inside");
       await signInWithPopup(auth, provider).then(async(logInResult)=>{
         console.log("logInResult....inside");
         console.log(logInResult);
         const isNewUser=logInResult._tokenResponse.isNewUser;
         console.log(`username: ${user.displayName}, email:${user.email},`);

         if (logInResult && isNewUser===true) navigate ('/onboarding')
         else if (logInResult) navigate ('/dashboard');

        }).catch(error=> setError(error))
        .finally(()=> setLoading(false));
    }

    const memoedValue=useMemo(()=>({
      user,
      loading,
      error, 
      signInWithGoogle, 
      logout
    }),[user, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      { !loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
    return useContext(AuthContext);
}





// import { View, Text } from 'react-native'
// import React, {createContext, useContext, useState, useEffect} from 'react'
// // import * as Google from 'expo-google-app-auth';
// // import * as GoogleSignIn from 'expo-google-sign-in';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// // import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'
// // import {auth} from '../firebase';

// WebBrowser.maybeCompleteAuthSession();
// const AuthContext= createContext({});

// const config={
//   androidClientId: '1007469413288-rtf95lccl00re9fcn9vou9m34972o5q5.apps.googleusercontent.com',  
//   iosClientId: '1007469413288-8of6uknnlh01i1slod322ot9shvd1g70.apps.googleusercontent.com',
//     scopes: ["profile", "email"],
//     permissions: ["public_profile", "email", "gender", "location"]
// }
// const [request, response, promptAsync] = Google.useAuthRequest({
//   // expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//   // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//   // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//   // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//   androidClientId: '1007469413288-rtf95lccl00re9fcn9vou9m34972o5q5.apps.googleusercontent.com',  
//   iosClientId: '1007469413288-8of6uknnlh01i1slod322ot9shvd1g70.apps.googleusercontent.com',
//     scopes: ["profile", "email"],
//     permissions: ["public_profile", "email", "gender", "location"]
// });

// export const AuthProvider = ({children}) => { 
//   // const [error, setError] = useState(null);
//   // const [user, setUser] = useState(null);
//   // const [loadingInitial, setLoadingInitial] = useState(true);
//   // const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   onAuthStateChanged(auth, (user)=>{
//   //     if(user){
//   //       setUser(user);
        
//   //     }else {
//   //       setUser(null);
//   //     }

//   //     setLoadingInitial(false);
//   //   })
//   // }, []);

// const [accessToken, setAccessToken] =useState();
// const [userInfo, setUserInfo] =useState();

// const [request, response, promptAsync] = Google.useAuthRequest({
//   androidClientId: '1007469413288-rtf95lccl00re9fcn9vou9m34972o5q5.apps.googleusercontent.com',  
//   iosClientId: '1007469413288-8of6uknnlh01i1slod322ot9shvd1g70.apps.googleusercontent.com',
// })

//   useEffect(() => {
//     if (response?.type === 'success') {
//       setAccessToken(response.authentication.accessToken)
//       // const { authentication } = response;
//       console.log(response);
//       }
//   }, [response]);

//   async function getUserData(){
//     let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me',{
//       headers: {Authorization: `Bearer ${accessToken}`}
//     });

//     userInfoResponse.json().then(data=>{
//       setUserInfo(data);
//     })
//   }
  
//   const signInWithGoogle = async()=>{
//     accessToken ? getUserData : () => {promptAsync({showInRevents: true})}
//   }

//     // const logout=()=>{
//     //   setLoading(true);
//     //   signOut(auth)
//     //   .catch((error)=> setError(error))
//     //   .finally(()=> setLoading(false));
//     // }

//     //   // const signInWithGoogle= async() => {
        
//     //   // // await Google.logInAsync(config).then(async(logInResult)=>{
//     //   // await Google.promptAsync(config).then(async (logInResult)=>{
        
//     //   //   console.log("before successs");
//     //   //     if(logInResult.type === 'success'){
//     //   //       console.log("successs");
//     //   //       console.log("inside -signinwithgoogle-await- ", logInResult);
//     //   //       const {idToken, accessToken} = logInResult;
//     //   //       const credential= GoogleAuthProvider.credential(idToken, accessToken);
//     //   //       await signInWithCredential(auth, credential);
//     //   //     }
        
      
//     //   //   });
      
//     //   // }
//       return (
//         <AuthContext.Provider value={{user:userInfo, signInWithGoogle}}>
//         {/* // <AuthContext.Provider value={{user:userInfo, loading, error, signInWithGoogle, logout}}> */}
//           {/* {  children} */}
//           { !loadingInitial && children}
//         </AuthContext.Provider>
//       )
//   };

// export default function useAuth(){
//     return useContext(AuthContext);
// }