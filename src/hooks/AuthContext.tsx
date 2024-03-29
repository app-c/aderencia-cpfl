/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";


import FireStore from "@react-native-firebase/firestore";
import Auth from '@react-native-firebase/auth'

export interface User {
  id: string;
  nome: string;
  email: string
}

interface SignInCred {
  email: string;
  senha: string;
}

interface AuthContexData {
  user: User | null;
  loading: boolean;
  signIn(credential: SignInCred): Promise<void>;
  signOut(): void;
}

const keyUser = "@aderencia:user";

export const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const storeUser = await AsyncStorage.getItem(keyUser);

    if (storeUser) {
      const userData = JSON.parse(storeUser) as User;
      setUser(userData);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    LoadingUser();
  }, [LoadingUser]);

  const signIn = useCallback(async ({ email, senha }) => {

    Auth().signInWithEmailAndPassword(email, senha)
      .then(au => {
        FireStore()
          .collection('user')
          .doc(au.user.uid)
          .get()
          .then(async profile => {
            const {
              nome,
            } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                email: au.user.email,
                id: au.user.uid,
                nome,
              };
              await AsyncStorage.setItem(
                keyUser,
                JSON.stringify(userData),
              );
              setUser(userData);
            }
          })
          .catch(err => {
            Alert.alert(
              "Login",
              "Não foi possível carregar os dados do usuário",
            );
          });
          
      })
      .catch(err => {
        const { code } = err;
        console.log(err)
        if (code === "auth/user-not-found" ) {
          return Alert.alert("Erro na atutenticação", "usuário não encontrado");
        }

        if (code === "auth/wrong-password") {
          return Alert.alert('Erro na autenticação', 'senha inconrreta')
        }
        return Alert.alert("Erro na atutenticação", "usuário nao encontrado");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(keyUser);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContexData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with ..");
  }

  return context;
}
